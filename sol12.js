const fs = require('fs')

fs.readFile('d12.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const connections = data.split('\n').map(a => a.split('-'))
  // puzzle 1 & 2 - comment the filter in findPaths
  console.time('compute')
  const paths = findPaths(['start'], connections)
  console.timeEnd('compute')

  console.log('# of paths:', paths.length) 
})

function findPaths(path, connections) {
  if(path[path.length-1] === 'end') return path;
  const next = connections
    .filter( c => c.includes(path[path.length-1]))
    .filter( c => path[path.length-1]==='start'? true : !c.includes('start'))
    .map(p => p.filter(f => f !==path[path.length-1] ))
  if(next.length === 0) return path;

  return next

    // puzzle 1
    // .filter(n => n[0] === 'end' || (n[0] === n[0].toLowerCase() ? !path.includes(n[0]): true))

    // puzzle 2
    .filter(n => n[0] === 'end' || 
      ( n[0] === n[0].toLowerCase() ? 
        ( !path.includes(n[0]) || maxLowerCase(path) < 2 )
        : true))

    .map(n => path.concat(n))
    .map(p => findPaths(p, connections))
    .filter(p => p.length > 0)
    .reduce( (a,b) => typeof b[0] === 'string' ? a.concat([b]) : a.concat(b), [])
}

function maxLowerCase(path) {
  const counts = path.filter(p => p!=='start' && p!=='end').reduce((c,p) => {
    if(p === p.toLowerCase()) c[p] = (c[p]||0) +1;
    return c;
  }, {})
  return Math.max(...Object.values(counts))
}

function flat(p) {
  if(typeof p === 'object' && typeof p[0] === 'string') {
    return p
  }
  return p.reduce((arr,m) => arr.concat(flat(m)), [])
}