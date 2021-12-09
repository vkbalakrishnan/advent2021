const fs = require('fs')

fs.readFile('d5.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const nums = data.split('\n').map(a => a.split(' -> ').map(b => b.split(','))).map(c => ({
    x1:Number(c[0][0]),
    y1:Number(c[0][1]),
    x2:Number(c[1][0]),
    y2:Number(c[1][1]),
  }))
  const max = Math.max(...nums.map(a => Object.values(a)).flat())
  console.log(nums, 'Max',max)
  let map = [...Array(max+1).keys()].map( r => [...Array(max+1).keys()].map(c => 0));
  nums
    // .filter(line => line.x1 === line.x2 || line.y1 === line.y2)
    .map(a => {
      let m = drawMap(map, a); 
      // console.log(`Map for ${JSON.stringify(a)}`)

      // console.log(m.map(r => r.join('')).join('\n'))
      return m;
    })
  console.log('--------------map')
  console.log(map.map(r => r.join('')).join('\n'))
  const intersections = findIntersection(map);
  console.log(intersections, intersections.length)
})

function drawMap(map, line) {
  if(line.x1 === line.x2) {
    for (let i = Math.min(line.y1, line.y2); i <= Math.max(line.y1, line.y2); i++) {
     map[i][line.x1]++;
    }
  } else if(line.y1 === line.y2) {
    for (let j = Math.min(line.x1, line.x2); j <= Math.max(line.x1, line.x2); j++) {
      map[line.y1][j]++;
    }
  } else {
    // console.log('What!', line)
    let x = line.x1, y = line.y1;
    while(x - line.x2 !== 0 && y -line.y2 !== 0) {
      map[y][x]++;
      x += line.x1 > line.x2 ? -1 : 1
      y += line.y1 > line.y2 ? -1 : 1
      // console.log(x, y, map)
    }
    map[y][x]++;

  }
  return map;
}

function findIntersection(map) {
  let result = [];
  map.forEach((row, rid) => {
    row.forEach((col,cid) => {
      if(col > 1) result.push([rid, cid])
    })
  })
  return result;
}

// 8,0 -> 0,8
// 8,0 -> 8,8
