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
const complex = document.querySelector('.complexity-container')
const tossblock = document.querySelector('.toss-container')

let isChosen = false

acient.addEventListener('click', changeAcient)
let chosenCards 
let objectStages = {}
let first
let second
let third
let a
 
function changeAcient (event) {
  let clickedItem = event.target
  acientId.forEach(el => { 
    el.firstChild.classList.remove('aactive')
    isChosen = false
  })
  changeClassRest ()
  cardFace.classList.add('hidden')
  let item = document.getElementById(clickedItem.id)
  if (item!== null && item!==undefined) {
    isChosen = true 
    changeClassAcient(item)
    changeClassDiff ()
    getArray ()
    a = first
      a.forEach((el) => {
      el.stage = 'firstStage'}) 

    chosenCards = [...objectStages['firstStage'], ...objectStages['secondStage'],...sortCards(objectStages['thirdStage'])].reverse()
    diffBtn.forEach(el => el.addEventListener('click', ()=> {
      changeClass(el)
      tossblock.classList.remove('transparent')
   }))
   tossBtn.addEventListener('click', tossPack)
  } 
  else {
    isChosen = false
    changeClassDiff ()
    changeClassRest ()
    tossBtn.removeEventListener('click', tossPack)
    cardFace.classList.add('hidden')
    cardBack.removeEventListener('click', showCard3)
  }
  
  }

  function tossPack () {
    changeClassRest()
    restNumber.innerHTML = addHTML()
    cardFace.classList.add('hidden')
    cardBack.addEventListener('click', showCard3)
  }

function getArray () {
  first = getFirstStage()
  second = getSecondStage()
  third = getThirdStage()
  objectStages.firstStage = first
  objectStages.secondStage = second
  objectStages.thirdStage = third
  return objectStages
}


function changeClassAcient (item) {
  if (!isChosen) {
    item.classList.remove('aactive')
  } else {
    item.classList.add('aactive')
  }
}



function changeClassDiff () {
if (!isChosen) {
  complex.classList.add('transparent')
} else {
  complex.classList.remove('transparent')}
}
  function changeClass(item) {
     if (item.classList.contains('aactive')) {
     item.classList.remove('aactive')
  } else {
    item.classList.add('aactive')
  }
}
  

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
/*
function showCard (object) {
cardFace.classList.remove('hidden')
let src

 let first = object['firstStage']
 let second = object['secondStage']
 let third = object['thirdStage']

 if (first.length != 0) {
  let i = getRandomNum(0, first.length-1)
  src = first[i]['cardFace']
  first.slice(i, 1)
  } 
 cardFace.innerHTML = `<img src=${src} alt="pack face">`
}

//cardBack.addEventListener('click', showCard)


//перебор по ключам объекта - стадии
function showCard2 () {
  cardFace.classList.remove('hidden')
  let src
   let first = objectStages['firstStage']
   let second = objectStages['secondStage']
   let third = objectStages['thirdStage']
   
   for (let stages in objectStages) {
     for (let j = 0; j < objectStages[stages].length; j++) {
      let i = getRandomNum(0, objectStages[stages].length-1)
      src = objectStages[stages][i]['cardFace']
      objectStages[stages].splice(i, 1) 
    }
  cardFace.innerHTML = `<img src=${src} alt="pack face">`
   }
 }

  */

 function showCard3 () {
  cardFace.classList.remove('hidden')
  let src
  let id 
  let stage

 if (chosenCards.length > 0) {
    src = chosenCards[chosenCards.length-1]['cardFace']
    id = chosenCards[chosenCards.length-1]['id']
    stage = chosenCards[chosenCards.length-1]['stage']
    chosenCards.pop()
  } else {
    cardFace.classList.add('hidden')
    restNumber.style.display = 'none'
    src = "./assets/mythicCardBackground.png"
    cardBack.removeEventListener('click', showCard3)
    acientId.forEach(el => { 
      el.firstChild.classList.remove('aactive')
      isChosen = false
    })
  }
cardFace.innerHTML = `<img src=${src} alt="pack face">`
}


function getLength2(array, color, stage) {
  let newArray = array.reduce((total, el) => {
  if (el['color'] === color && el['stage'] === stage) {
    total += 1
  } else {total}
return total}, 0)
return newArray}