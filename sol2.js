const fs = require('fs')

fs.readFile('d2.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const cmds = data.split('\n')
  console.log(cmds.length)
  let init = { pos : 0, depth: 0, aim: 0};
  const final = cmds.reduce((current, cmd) => useCmd(cmd, current), init );
  console.log(final)
  console.log(final.pos * final.depth)
})

function useCmd(cmd, coords) {
  const [type, val] = cmd.split(' ');
  switch(type) {
    case 'forward' : 
      coords.pos+= Number(val); 
      coords.depth+= Number(val)* coords.aim; 
      break;
    case 'up' : 
      coords.aim-= Number(val);
      break;
    case 'down' : 
      coords.aim+= Number(val);
      break;
  }
  return coords;
}
