import ancientsData from './data/ancients.js'

const acient = document.querySelector('.acient-container')
const acientId = document.querySelectorAll('.acient')
const tossBtn = document.querySelector('.toss-pack')
const diffBtn = document.querySelectorAll('.complexity')
const restNumber = document.querySelector('.rest')
let isChosen = false
let chosenAcient

acient.addEventListener('click', changeAcient)


function changeAcient (event) {
  let clickedItem = event.target
  acientId.forEach(el => { 
    el.firstChild.classList.remove('aactive')
    isChosen = false
  })
  let item = document.getElementById(clickedItem.id)
   isChosen = true
   changeClassAcient(item)
   findID()
}

function changeClassAcient (item) {
  if (!isChosen) {
     item.classList.remove('aactive')
  } else {
    item.classList.add('aactive')
  }
}
tossBtn.addEventListener('click', changeClassRest)


function changeClassRest () {
  if(!isChosen) {
    restNumber.style.display = 'none'
 } else {
   restNumber.style.display = 'block'
 }
}

function findID () {
  acientId.forEach(el => {
    if (el.firstChild.classList.contains('aactive')) {
      chosenAcient = el.firstChild.id
      return chosenAcient
   } 
  })
}

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min
}

let greenCards
let brownCards
let blueCards

function setPackRule (ancientsObj, idA) {
  let stagePack = ancientsObj.find(el => el.id === idA)
  let combination = []
  combination.push(stagePack['firstStage'], stagePack['secondStage'], stagePack['thirdStage'])
 
  console.log(combination)
}

setPackRule(ancientsData, 'cthulhu')