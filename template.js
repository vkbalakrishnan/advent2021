const fs = require('fs')

fs.readFile('d1.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split('\n')

  // puzzle 1
  console.log(lines)
  // puzzle 2
  // console.log(lines)
})
