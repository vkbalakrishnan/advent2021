const fs = require('fs')

fs.readFile('d11.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const grid = data.split('\n').map(r => r.split('').map(c => Number(c)))
  // puzzle 1 
  let tgrid = grid;
  const steps =Array(100).fill(1).map((i, id) => {
    let f = 0;
    [tgrid, f] = step(tgrid)
    return f;
  })
  console.log(steps.reduce((a,b)=> a+b, 0))
  // puzzle 2
  let iter = 0, tempG = grid;
  while(tempG.flat().filter(a => a > 0).length > 0) {
    [tempG] = step(tempG);
    iter++;
  }
  console.log(iter);
  
});


function step(grid) {
  let flashes = 0;
  let temp = Array(grid.length).fill(Array(grid[0].length).fill(1))
  let newG = grid.map((r) => r.map((c) => {
    return c+1
  }))
  
  while(newG.flat().filter(a => a>9).length > 0) {
    for(let rid=0; rid< newG.length; rid++ ) {
      for(let cid=0; cid< newG[0].length; cid++ ) {
        if(newG[rid][cid] > 9) {
          newG[rid][cid] = 0;
          flashes++;
          newG = updateNeighbours(newG, rid, cid);
        }
      }
    }
  }
  return [newG, flashes];
}

function display(data) {
  return data.map(r => r.join(',')).join('\n');
}

function updateNeighbours(grid, row, col) {
  return grid.map((r, rid) => r.map((c, cid) => {
    return c!== 0 &&(rid >=row-1 && rid <= row+1) && (cid>=col-1 && cid <=col+1) && !(rid===row&&cid==col) ? 
      c+1 : c;
  }))
}
