const fs = require('fs')

fs.readFile('d6.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const nums = data.split(',').map(a => Number(a)).reduce((obj, v) => { obj[v]++; return obj}, Array(9).fill(0));
  console.log(nums)
  // const val = tick(nums, 18)
  console.log('80 days');
  tick([...nums], 80);
  console.log('256 days');
  tick([...nums], 256);
})

function tick(counts, left) {
  if(left === 0) {
    console.log('final counts', counts.reduce((a, b)=> a+b, 0))
    return
  }
  const zeros = counts.shift();
  counts[6] += zeros;
  counts[8] = zeros;
  tick(counts, left-1)
}