import ancientsData from './data/ancients.js'
import cardsDataGreen from './data/mythicCards/green/index.js'
import cardsDataBlue from './data/mythicCards/blue/index.js'
import cardsDataBrown from './data/mythicCards/brown/index.js'


const acient = document.querySelector('.acient-container')
const acientId = document.querySelectorAll('.acient')
const tossBtn = document.querySelector('.toss-pack')
const diffBtn = document.querySelectorAll('.complexity')
const restNumber = document.querySelector('.rest')
const container = document.querySelector('.container')
const cardFace = document.querySelector('.card-face')
const cardBack = document.querySelector('.pack-back')


let isChosen = false


acient.addEventListener('click', changeAcient)
let chosenCards 
let objectStages = {}
let first
let second
let third

function changeAcient (event) {
  let clickedItem = event.target
  acientId.forEach(el => { 
    el.firstChild.classList.remove('aactive')
    isChosen = false
  })
  let item = document.getElementById(clickedItem.id)
   isChosen = true
   changeClassAcient(item)
   /*setPackRule()
   getFirstStage()
   getSecondStage()
   getThirdStage()

   objectStages.firstStage = getFirstStage()
   objectStages.secondStage = getSecondStage()
   objectStages.thirdStage = getThirdStage()*/
   //  chosenCards = concatArrays(getFirstStage(),  getSecondStage(),  getThirdStage())
  first = getFirstStage()
  second = getSecondStage()
  third = getThirdStage()
  restNumber.innerHTML = addHTML()
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

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min
}


function setPackRule () {
  let combination = []
  let a = document.querySelector('.aactive')
  if (a.id!== null && a.id!== undefined) { 
 // chosenAcient = a.id
  let stagePack = ancientsData.find(el => el.name === a.id)
  combination.push(stagePack['firstStage'], stagePack['secondStage'], stagePack['thirdStage'])
  return combination
  } else {
    return
  }
}
/*
let chosenAcient = setPackRule()
console.log(chosenAcient)*/

//функция сортировки по Фишеру
function sortCards (array) {
  let tmp, rnd
   for (let i = array.length-1; i > 0; i--) {
    tmp = array[i]
    rnd = Math.floor(Math.random()*(i + 1))
    array[i] = array[rnd];
    array[rnd] = tmp;
  }
    return array;
   }

//отбор карт с нужным уровнем
function sortDifficulty (array, complex) {
let sortedArray = array.filter(el=> el.difficulty === complex)
return sortedArray
}

//копирование массивов для изменений
let greenCards = cardsDataGreen
let brownCards = cardsDataBrown
let blueCards = cardsDataBlue

function getFirstStage() {
 let a = setPackRule()
  let arrayFirstStage = []
  let green = sortCards(greenCards).slice(0, a[0]['greenCards'])
  let brown = sortCards(brownCards).slice(0, a[0]['brownCards'])
  let blue = sortCards(blueCards).slice(0, a[0]['blueCards'])
  arrayFirstStage = green.concat(brown, blue)
  return arrayFirstStage
}

function getSecondStage() {
  let a = setPackRule()
   let arraySecondStage = []
   let green = sortCards(greenCards).slice(0, a[1]['greenCards'])
   let brown = sortCards(brownCards).slice(0, a[1]['brownCards'])
   let blue = sortCards(blueCards).slice(0, a[1]['blueCards'])
   arraySecondStage = green.concat(brown, blue)
   return arraySecondStage
 }


 function getThirdStage() {
  let a = setPackRule()
   let arrayThirdStage = []
   let green = sortCards(greenCards).slice(0, a[2]['greenCards'])
   let brown = sortCards(brownCards).slice(0, a[2]['brownCards'])
   let blue = sortCards(blueCards).slice(0, a[2]['blueCards'])
   arrayThirdStage = green.concat(brown, blue)
   return arrayThirdStage
 }

 function concatArrays (one, two, three) {
  return one.concat(two, three)
 }


 function getLength(array, color) {
  let newArray = array.reduce((total, el) => {
  if (el['color'] === color) {
    total += 1
  } else {total}
return total}, 0)
return newArray}

function addHTML () {
  let b = `<div class="rest-first"> 
    <p class="stage">I этап</p> 
    <div class="rest-green">
      <img src="./assets/MythicCards/greenCard.png">
      <p class="number">${getLength(first, 'green')}</p>
    </div>
    <div class="rest-brown">
      <img src="./assets/MythicCards/brownCard.png">
      <p class="number">${getLength(first, 'brown')}</p>
    </div>
    <div class="rest-blue">
      <img src="./assets/MythicCards/blueCard.png">
      <p class="number">${getLength(first, 'blue')}</p>
    </div>
  </div>
  <div class="rest-second">
    <p class="stage">II этап</p> 
    <div class="rest-green">
      <img src="./assets/MythicCards/greenCard.png">
      <p class="number">${getLength(second, 'green')}</p>
    </div>
    <div class="rest-brown">
      <img src="./assets/MythicCards/brownCard.png">
      <p class="number">${getLength(second, 'brown')}</p>
    </div>
    <div class="rest-blue">
      <img src="./assets/MythicCards/blueCard.png">
      <p class="number">${getLength(second, 'blue')}</p>
    </div>
  </div>
  <div class="rest-third">
    <p class="stage">III этап</p> 
    <div class="rest-green">
      <img src="./assets/MythicCards/greenCard.png">
      <p class="number">${getLength(third, 'green')}</p>
    </div>
    <div class="rest-brown">
      <img src="./assets/MythicCards/brownCard.png">
      <p class="number">${getLength(third, 'brown')}</p>
    </div>
    <div class="rest-blue">
      <img src="./assets/MythicCards/blueCard.png">
      <p class="number">${getLength(third, 'blue')}</p>
    </div>
    </div>`
  return b
}

function showCard () {
 let src
 let first = objectStages['firstStage']
 let second = objectStages['secondStage']
 let third = objectStages['thirdStage']
 if (first.length != 0) {
  let i = getRandomNum(0, first.length-1)
  src = first[i]['cardFace']
  first.slice(i, 1)
 
 } else {

 } cardFace.innerHTML = `<img src=${src} alt="pack face">`
}

//cardBack.addEventListener('click', showCard)

//cardBack.addEventListener('click', showCard)
