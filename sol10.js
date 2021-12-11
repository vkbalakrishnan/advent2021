const fs = require('fs')

fs.readFile('d10.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const chunks = data.split('\n')
  const corruptedPoints = {
    ')' : 3,
    ']' : 57,
    '}' : 1197,
    '>' : 25137,
  }

  const autoPoints = {
    ')' : 1,
    ']' : 2,
    '}' : 3,
    '>' : 4,
  }
  // prob 1
  console.log(chunks
    .map(processLine)
    .filter(a => typeof a !== 'object')
    .map(a => corruptedPoints[a])
    .reduce((a, b) => a+b, 0));
  // prob 2
  const scores = chunks
    .map(processLine)
    .filter(a => typeof a === 'object').map(complete)
    .map(line => {
      return line.reduce((a, b) => a*5+autoPoints[b], 0)
    })
    .sort((a, b) => a-b> 0 ? 1 : -1)

    // .reduce((a, b) => a+b, 0)
  console.log(parseInt((scores.length-1)/2), scores, scores[parseInt((scores.length-1)/2)]);
  
});

function complete(open) {
  return open.map( a => {

    switch(a) {
      case '(': return ')';
      case '{': return '}';
      case '[': return ']';
      case '<': return '>';
    }
  }).reverse()
} 

function processLine(...rest) {
  let stack = [];
  const chars = rest[0].split('');
  while(chars.length > 0) {
    const char = chars.shift()[0];
    switch(char) {
      case '}': if(stack[stack.length -1] === '{') {
          stack.pop()
        } else {
          return char;
        }
        break;
      case '>': if(stack[stack.length -1] === '<') {
          stack.pop()
        } else {
          return char;
        }
        break;
      case ']': if(stack[stack.length -1] === '[') {
          stack.pop()
        } else {
          return char;
        }
        break;
      case ')': if(stack[stack.length -1] === '(') {
          stack.pop()
        } else {
          return char;
        }
        break;
      default : 
        stack.push(char)
    }
  }
  return stack;
}
