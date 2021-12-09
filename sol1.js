const fs = require('fs')

fs.readFile('d1.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const nums = data.split('\n').map(a => Number(a))
  console.log(nums.map((n, i) => i > 0 && nums[i-1] && nums[i-1] < n  ? true : false ).filter(v => v).length)
  console.log(nums.reduce((ts, n, i) => {
    if(nums[i-1] && nums[i-2]) ts.push([nums[i], nums[i-1] ,nums[i-2]])
    return ts;
  }, [])
  .map(arr => arr[0]+arr[1]+arr[2])
  .map((n, i, red) => i > 0 && red[i-1] && red[i-1] < n  ? true : false ).filter(v => v).length)
})
