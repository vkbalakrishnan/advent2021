const fs = require('fs')
let permMap = {}

fs.readFile('d7.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const positions = data.split(',').map( a=> Number(a))
  const minPos = Math.min(...positions)
  const maxPos = Math.max(...positions)
  let fuels1 = [];
  let fuels2 = [];
  console.log(positions.length, minPos, maxPos, positions)
  // console.log(findcost(3))
  for(let i =minPos; i<=maxPos; i++) {
    fuels1.push(positions.map(p => Math.abs(p-i)).reduce((sum, c) => sum+c, 0))
    fuels2.push(positions.map(p => permMap[Math.abs(p-i)] || findcost(Math.abs(p-i))).reduce((sum, c) => sum+c, 0))
  }
  console.log(Math.min(...fuels1))
  console.log(Math.min(...fuels2))
})

function findcost(val) {
  if(val <= 1) return 1;
  if(permMap[val]) return permMap[val];
  permMap[val] =  val + findcost(val-1)
  return permMap[val];
}