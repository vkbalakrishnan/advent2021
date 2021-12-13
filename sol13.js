const fs = require('fs')

fs.readFile('d13.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const raw = data.split('\n\n')
    .map(a => a.split('\n'))
  const dots = raw[0].map(a => a.split(',').map(a => Number(a)))
  let paper = Paper(Math.max(...dots.map( d => d[1]))+1, Math.max(...dots.map( d => d[0]))+1)
  dots.forEach(([x, y]) => {
    paper[y][x] = 1;
  })
  const instructs = raw[1].map(a => a.split('fold along ').pop())
  // puzzle 1
  const step1 = fold(paper, instructs[0])
  // console.log( step1.flat().filter(a => a).length)

  //puzze2
  let temp = paper;
  instructs.forEach(ins => {
    temp = fold(temp, ins);
  });
  console.log(display(temp))

})

function fold(paper, instruction) {
  const ins = instruction.split('=');
  let itr = 1, p =[];
  const fold = Number(ins[1])
  if(ins[0] === 'y') {
    while(fold - itr > -1 || fold + itr < paper.length) {
      p.push( mergeX(paper[fold - itr], paper[fold + itr]) );
      itr++;
    }
    return p.reverse()
  }

  const transposed = transpose(paper);
  while(fold - itr > -1 || fold + itr < transposed.length) {
    p.push( mergeX(transposed[fold - itr], transposed[fold + itr]) );
    itr++;
  }
  return transpose(p);

}

function transpose(array) {
  return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}

function mergeX(a, b) {
  if(!a && a.length ) return b;
  if(!b) return a;
  return a.map((x, xid) => x || b[xid])
}

function display(paper){
  return paper
    .map(r => r
      .map(a => a ===1? '#': '.')
      .map((c,cid) => (cid+1) % 5 === 0 ? c+'   ': c)
      .join(''))
    .join('\n')
}

function Paper(y, x) {
  return new Array(y).fill(0).map( a => new Array(x).fill(0))
}