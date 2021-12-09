const fs = require('fs')

fs.readFile('d4.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const bins = data.split('\n')
  const cards = bins.slice(1).reduce((c,d)=>{
    if(d == '') c.push([]);
    else c[c.length-1].push(d.split(' ').filter(f => f!=='').map(m => Number(m)))
    return c;
  },[]);
  const nums = bins[0].split(',').map(n=> Number(n));
  console.log(nums)
  const winsPerCard = cards.map((card, id) => bingoFinder(nums, card))
  console.log(winsPerCard)
  const meNum = Math.min(...winsPerCard);
  const squidNum = Math.max(...winsPerCard);
  console.log('My Card: ',meNum);
  sol(winsPerCard, meNum, cards, nums)
  console.log('---------------------------')
  console.log('Squid\'s Card: ',squidNum);
  sol(winsPerCard, squidNum, cards, nums)
})

function sol(winsPerCard, winNum, cards, nums) {
  const winningCard = cards[winsPerCard.findIndex( o => o === winNum)]
  console.log('WinningCard:\n', winningCard)
  let marker, i =0;
  while(i <winNum+1) {
    marker = mark(marker, nums[i], winningCard);
    const bingo = isBingo(marker);
    i++
  }
  console.log('Marker: \n',marker)
  const restsum = marker.map((r, rid) => r.map((c, cid) => c === 0? winningCard[rid][cid]: 0)).flat().reduce((sum , n)=>  sum+n ,0);
  console.log('Last number:', nums[winNum], '\nSum of rest: ',restsum, '\nSolution :', nums[winNum] * restsum)

}  


function bingoFinder(nums, card) {
  let i =0;
  let marker;
  while (i<nums.length) {
    marker = mark(marker, nums[i], card);
    const bingo = isBingo(marker);
    // console.log(marker, bingo)
    if(bingo) return i;
    else i++;
  }
}

function mark(current, num, card) {
  current = card.map((r, rid) => r.map((c, cid) => c === num ? 1 : (current?.[rid]?.[cid]||0)))
  return current;
}

function isBingo(cardMarker) {
  const transposed = cardMarker[0].map((c, cid) => cardMarker.map((r, rid) => r[cid]))
  const checker = (marks) => marks.map(r => r.filter(c => c === 1).length).filter(c => c===5).length > 0
  if(checker(cardMarker) || checker(transposed)) return true;
  return false;
}