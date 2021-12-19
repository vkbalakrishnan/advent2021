const fs = require('fs')

fs.readFile('d16.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const bin = convertToBin(data)//, 16).toString(2)
  const msg = Array(data.length*4-bin.length).fill('0').join('')+bin;
  // puzzle 1
  console.log(data.length*4, bin.length)
  const parsed = parse(msg)
  // console.log(parsed);
  // puzzle 1
  const versions = getVersions(parsed)
  console.log(versions, versions.reduce((a,b) => a+(b||0), 0))
  // puzzle 2
  console.log(findValue(parsed))
})
String.prototype.extract = function(num) {
  return [this.slice(0, num), this.slice(num)];
};
String.prototype.toD = function(num) {
  return this.length ? parseInt(this, 2): null;
};

function parse(msg) {
  let version, type, literal = '', lid, rest ='',
  og_msg = msg,
  og_len = msg.length;

  [version, msg] = msg.extract(3);
  [type, msg] = msg.extract(3);
  let type_d = parseInt(type, 2)

  if(type_d === 4) {
    let chunk;
    do {
      [chunk, msg] = msg.extract(5);
      literal += chunk.slice(1);
    } while(chunk[0] === '1')
    rest = msg;
    return {
      V: version.toD(),
      T: type_d,
      L: literal.toD(),
      msg_len: og_len-rest.length,
      rest
    };
  }


  [lid, msg] = msg.extract(1)
  // console.log('operator --------', msg, lid)

  let num_pkts= '', tot_len= '', subPackets = [];
  if(lid === '1') {
    let [a, b] = msg.extract(11);
    num_pkts = a;
    msg= b;
    let itr = 0;
    while(itr < num_pkts.toD()) {
      let sub_pkt = parse(msg);
      msg = sub_pkt.rest;
      rest = sub_pkt.rest;
      subPackets.push(sub_pkt);
      itr ++;
    }
  } else {
    // console.log('length id 0', msg)

    let [a, b] = msg.extract(15);
    tot_len= a;
    msg =b;
    // console.log('tot_len', a,b)
    let itr = 0;
    while(itr < tot_len.toD()) {
      let sub_pkt = parse(msg);
      msg = sub_pkt.rest;
      rest = sub_pkt.rest;
      subPackets.push(sub_pkt);
      itr+=sub_pkt.msg_len;
    }

  }
  return {
    og_msg,
    V: version.toD(),
    T: type_d,
    num_pkts: num_pkts.toD(),
    tot_len: tot_len.toD(),
    msg_len: og_len - rest.length,
    rest,
    subPackets
  };
}

function getVersions(pkt) {
  return (pkt?.subPackets ? [pkt.V, pkt?.subPackets?.map(s => getVersions(s))] : [pkt.V])
  .flat(2)
}

function findValue(packet) {
  // console.log(packet.T, packet.subPackets?.map(a => findValue(a)), packet.L)
  switch(packet.T) {
    case 0 : 
      return packet.subPackets.map(sub => findValue(sub)).reduce((a,b) => a+b, 0); 
    case 1 : 
      return packet.subPackets.map(sub => findValue(sub)).reduce((a,b) => a*b, 1); 
    case 2 : 
      return Math.min(...packet.subPackets.map(sub => findValue(sub))); 
    case 3 : 
      return Math.max(...packet.subPackets.map(sub => findValue(sub))); 
    case 4 : 
      return packet.L;
    case 5 : 
      return findValue(packet.subPackets[0]) > findValue(packet.subPackets[1]) ? 1 : 0;
    case 6 : 
      return findValue(packet.subPackets[0]) < findValue(packet.subPackets[1]) ? 1 : 0;
    case 7 : 
      return findValue(packet.subPackets[0]) == findValue(packet.subPackets[1]) ? 1 : 0;
    default : 
      console.log('no type match')
      return;
  }
}

const hmap = {
  '0':'0000',
  '1':'0001',
  '2':'0010',
  '3':'0011',
  '4':'0100',
  '5':'0101',
  '6':'0110',
  '7':'0111',
  '8':'1000',
  '9':'1001',
  'A':'1010',
  'B':'1011',
  'C':'1100',
  'D':'1101',
  'E':'1110',
  'F':'1111',
}

function convertToBin(hex) {
  return hex.split('').map(a => hmap[a]).join('');
}
