const fs = require('fs')

fs.readFile('d17.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split('target area: ')[1].split(', ')
  const [x1, x2] = lines[0].split('x=')[1].split('..')
  const [y1, y2] = lines[1].split('y=')[1].split('..')
  const target = [x1,y1,x2,y2].map(a => Number(a));
  // puzzle 1
  let paths = []
  for (let i = 0; i <= x2; i++) {
    for (let j = y1; j <  -y1; j++) {
      console.log('velocity check: ', i,j);
      paths.push({velocity: [i,j], paths: findPath([i,j], target)})
    }
  }
  paths = paths
    .map(p => {
      p.targets = p.paths.filter(pos => pos.isTarget) 
      return p;
    })
    .filter(p => p.targets.length > 0)
    .map(p => {
      p.Ys = p.paths.map(pos => pos.y)
      p.maxY = Math.max(...p.Ys);
      return p;
    })
  let maxY = Math.max(...paths.map(p => p.maxY));
  console.log(
    '--------------\n\r',
    paths,  
    paths.length,  
    maxY, 
    paths[paths.findIndex(p => p.maxY === maxY) ],
    target
  );
})


function findPath(velocity, target) {
  let pos = {x:0, y:0}, path= [];

  while(!isOob(pos, target) || velocity[0] > 0) {
    path.push({...pos, isTarget: isTarget(pos, target)});
    pos = {
      x: pos.x + Number(velocity[0]),
      y: pos.y + Number(velocity[1]),
    }

    if(velocity[0] < 0) velocity[0] += 1;
    if(velocity[0] > 0) velocity[0] -= 1;
    velocity[1] -= 1;
    console.log(pos, velocity)
  }
  path.push({...pos, isTarget: isTarget(pos, target)});

  return path
}

function isTarget(pos, target) {
  return pos.x >= target[0] && pos.x <=target[2] &&
    pos.y >= target[1] && pos.y <=target[3]
}

function isOob(pos, target) {
  return pos.x > target[2] || pos.y < target[3];
}