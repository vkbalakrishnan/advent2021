const fs = require('fs')

const reverse = function(map) {
  return Object.keys(map).reduce((r, k) => {
    r[map[k]] = k;
    return r;
  }, {})
}
fs.readFile('d8.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const notes = data.split('\n')
    .map(a => a.split(' | ').map(a => a.split(' ')))

  const temp  = notes.map(a => parseNote(a));

  console.log(temp.reduce((s,a)=> a+s), 0);
})

function parseNote(line) {
  let pos = { 5: [], 6: []}
  let newMap = line[0].map(a => {
    switch(a.length) {
      case 2: return 1;
      case 3: return 7;
      case 4: return 4
      case 7: return 8;
      default :
        pos[a.length].push(sort(a));
        return -1
    } 
  })
  let lookup = line[0].reduce((r,v, k) => {
    r[sort(v)] = newMap[k];
    return r;
  }, {})
  let rlook = reverse(lookup);

  const nine = pos[6].filter(a => a.split('').filter(c => !rlook['4'].split('').includes(c)).length ===2)[0]
  const six = pos[6].filter(a => a.split('').filter(c => rlook['7'].split('').includes(c)).length === 2)[0]
  const zero = pos[6].filter( a => ![six, nine].includes(a))[0]

  const three = pos[5].filter(a => a.split('').filter(c => rlook['1'].split('').includes(c)).length > 1)[0]
  const five = pos[5].filter(a => a.split('').filter(c => !six.split('').includes(c)).length === 0)[0]
  const two = pos[5].filter( a => ![three, five].includes(a))[0]

  newMap = newMap.map((com, i) => {
    if(com > -1) return com;
    if(sort(line[0][i]) === zero) return 0;
    if(sort(line[0][i]) === six) return 6;
    if(sort(line[0][i]) === nine) return 9;
    if(sort(line[0][i]) === three) return 3;
    if(sort(line[0][i]) === five) return 5;
    if(sort(line[0][i]) === two) return 2;
    return -1
  })
  lookup = line[0].reduce((r,v, k) => {
    r[sort(v)] = newMap[k];
    return r;
  }, {})

  return Number(line[1].map(l => {
    return lookup[sort(l)]
  }).join(''))
}

function sort(key) {
  return key.split('').sort((a, b) => {
    if(a < b) { return -1; }
    if(a > b) { return 1; }
    return 0;
  }).join('')

}