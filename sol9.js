const fs = require('fs')

fs.readFile('d9.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const nums = data.split('\n').map(a => a.split('').map(b => Number(b)))
  const lowPoints = nums.map((r, rid) => r.map((c, cid) => findLow(c, rid, cid, nums)))
  const riskLevels = lowPoints.map((r, rid) => r.map((c, cid) => c ? nums[rid][cid]+1 : 0 ))

  // prob 1
  console.log(riskLevels.flat().reduce((a,b) => a+b, 0));
  // prob2
  console.log(nums
    .map((row, rid) => row.map((col,cid) => basin(nums, rid, cid))).flat().sort((a,b) => {
      return a - b < 0 ? 1 : -1;
    })
    .slice(0, 3)
    .reduce((tot, val) => tot * val, 1 )
  )
});

function getNeighbours(r, c, nums) {
  return [
    nums[r-1]?.[c] > -1 ? nums[r-1]?.[c] : Infinity,
    nums[r+1]?.[c] > -1 ? nums[r+1]?.[c] : Infinity,
    nums[r][c-1] > -1 ? nums[r][c-1] : Infinity,
    nums[r][c+1] > -1 ? nums[r][c+1] : Infinity,
  ]
}
function findLow(val, r, c, nums) {
  return val < Math.min(...getNeighbours(r,c,nums))
}

function basin(nums, r, c) {
  if(r < 0 || r > nums.length-1 ) return 0;
  if(c < 0 || c > nums[0].length-1) return 0;
  if(nums[r][c] === 9) return 0;
  nums[r][c] = 9;
  return 1 +
  basin(nums, r-1, c) +
  basin(nums, r+1, c) +
  basin(nums, r, c-1) +
  basin(nums, r, c+1)
}