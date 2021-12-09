const fs = require('fs')

fs.readFile('d3.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const bins = data.split('\n')
  // const counts = transpose(bins).map(countArr);
  // const epsilon= Number('0b'+counts.map(e => e[0] > e[1] ? 0: 1).join(''));
  // const gamma= Number('0b'+counts.map(e => e[0] > e[1] ? 1: 0).join(''));
  // console.log('epsilon: ', epsilon);
  // console.log('gamma  : ', gamma);
  // console.log('value : ', epsilon*gamma)
  const Oxygen = finder(bins, 0, (counts) => {return counts['1'] >= counts['0'] ? '1' : '0'})
  const CO2 = finder(bins, 0, (counts) => {return counts['1'] >= counts['0'] ? '0' : '1'})
  console.log('Oxygen: ', Number('0b'+Oxygen), Oxygen)
  console.log('CO2: ', Number('0b'+CO2), CO2);
  console.log('life support', Number('0b'+Oxygen)* Number('0b'+CO2))
})  

const transpose = (arr) => {
  return [...Array(arr[0].length).keys()].map(idx => arr.map(a => a[idx]))
}

const countArr = (arr) => {
  return arr.reduce((og, c) => {
    og[c] = og[c] ? (og[c]+1) : 1;
    return og
  }, {})
}

const finder = (bins, idx, compare) => {
  const counts = transpose(bins).map(countArr);
  const selD  = compare(counts[idx]);
  const filtered = bins.filter(b => b[idx] === selD)
  return filtered.length > 1 ? finder(filtered, idx+1, compare): filtered[0];
}