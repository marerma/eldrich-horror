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
let difficultyLevel
let isChosen = false
let diffChosen = false

acient.addEventListener('click', changeAcient)
let chosenCards 
let objectStages = {}
let first
let second
let third

let greenCards = cardsDataGreen
let brownCards = cardsDataBrown
let blueCards = cardsDataBlue


let greenCardsTwo
let brownCardsTwo
let blueCardsTwo


let greenCardsThree
let brownCardsThree
let blueCardsThree



Array.prototype.diff = function(x) {
  return this.filter(function(i) {return x.indexOf(i) < 0;});
};


function changeClassAcient (item) {
  if (!isChosen) {
    item.classList.remove('aactive')
  } else {
    item.classList.add('aactive')
  }
}


function changeAcient (event) {
  let clickedItem = event.target
  acientId.forEach(el => { 
    el.firstChild.classList.remove('aactive')
    isChosen = false
    diffBtn.forEach(el => {
      el.classList.remove('aactive')
      diffChosen = false})
  })

  changeClassRest ()
  cardFace.classList.add('hidden')
  let item = document.getElementById(clickedItem.id)
  if (item!== null && item!==undefined) {
    isChosen = true 
    changeClassAcient(item)
    changeClassDiff()
    
 complex.addEventListener('click', changeDifficulty)
} 
  else {
    isChosen = false
    changeClassDiff ()
    changeClassRest ()
    tossBtn.removeEventListener('click', tossPack)
    cardFace.classList.add('hidden')
    cardBack.removeEventListener('click', showCard)
  }
}

  function tossPack () {
    changeClassRest()
    cardFace.classList.add('hidden')
    cardBack.addEventListener('click', showCard)
    if (difficultyLevel === 'normal') {
      getArrayNormal()
      chosenCards = [...objectStages['firstStage'], ...objectStages['secondStage'],...sortCards(objectStages['thirdStage'])].reverse()
    } else if (difficultyLevel === 'easy') {
      
      getArrayEasy()
      chosenCards = [...objectStages['firstStage'], ...objectStages['secondStage'],...sortCards(objectStages['thirdStage'])].reverse()
 
  } else if (difficultyLevel === 'hard') {
      
    getArrayHard()
    chosenCards = [...objectStages['firstStage'], ...objectStages['secondStage'],...sortCards(objectStages['thirdStage'])].reverse()
  
} 
    else {
      getArrayNormal()
      chosenCards = [...objectStages['firstStage'], ...objectStages['secondStage'],...sortCards(objectStages['thirdStage'])].reverse()
    }
    restNumber.innerHTML = addHTML()
  }

function getArrayNormal () {
  first = getFirstStage()
  second = getSecondStage()
  third = getThirdStage()

  first.forEach((el) => {
    el.stage = 'firstStage'}) 
  second.forEach((el) => {
    el.stage = 'secondStage'}) 
  third.forEach((el) => {
    el.stage = 'thirdStage'}) 

  objectStages.firstStage = sortCards(first)
  objectStages.secondStage = sortCards(second)
  objectStages.thirdStage = sortCards(third)
  return objectStages
}


function changeClassDiff () {
if (!isChosen) {
  complex.classList.add('transparent')
} else {
  complex.classList.remove('transparent')}
}
  
function changeClassBtn(item) {
  if (!diffChosen) {
  item.classList.add('aactive')
} else {
 item.classList.remove('aactive')
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


function getFirstStage() {
 let a = setPackRule()
  let arrayFirstStage = []

  let green = sortCards(greenCards).slice(0, a[0]['greenCards'])
  let brown = sortCards(brownCards).slice(0, a[0]['brownCards'])
  let blue = sortCards(blueCards).slice(0, a[0]['blueCards'])
  arrayFirstStage = green.concat(brown, blue)
  
 greenCardsTwo = greenCards.diff(green)
 brownCardsTwo = brownCards.diff(brown)
 blueCardsTwo = blueCards.diff(blue)

  return arrayFirstStage
}

function getSecondStage() {
  let a = setPackRule()

   let arraySecondStage = []
   let green = sortCards(greenCardsTwo).slice(0, a[1]['greenCards'])
   let brown = sortCards(brownCardsTwo).slice(0, a[1]['brownCards'])
   let blue = sortCards(blueCardsTwo).slice(0, a[1]['blueCards'])
   arraySecondStage = green.concat(brown, blue)

   greenCardsThree = greenCardsTwo.diff(green)
   brownCardsThree = brownCardsTwo.diff(brown)
   blueCardsThree = blueCardsTwo.diff(blue)
   return arraySecondStage
 }


 function getThirdStage() {
  let a = setPackRule()
   let arrayThirdStage = []
   let green = sortCards(greenCardsThree).slice(0, a[2]['greenCards'])
   let brown = sortCards(brownCardsThree).slice(0, a[2]['brownCards'])
   let blue = sortCards(blueCardsThree).slice(0, a[2]['blueCards'])
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
      <p class="number">${getLength2(chosenCards, 'green', 'firstStage')}</p>
    </div>
    <div class="rest-brown">
      <img src="./assets/MythicCards/brownCard.png">
      <p class="number">${getLength2(chosenCards, 'brown', 'firstStage')}</p>
    </div>
    <div class="rest-blue">
      <img src="./assets/MythicCards/blueCard.png">
      <p class="number">${getLength2(chosenCards, 'blue', 'firstStage')}</p>
    </div>
  </div>
  <div class="rest-second">
    <p class="stage">II этап</p> 
    <div class="rest-green">
      <img src="./assets/MythicCards/greenCard.png">
      <p class="number">${getLength2(chosenCards, 'green', 'secondStage')}</p>
    </div>
    <div class="rest-brown">
      <img src="./assets/MythicCards/brownCard.png">
      <p class="number">${getLength2(chosenCards, 'brown', 'secondStage')}</p>
    </div>
    <div class="rest-blue">
      <img src="./assets/MythicCards/blueCard.png">
      <p class="number">${getLength2(chosenCards, 'blue', 'secondStage')}</p>
    </div>
  </div>
  <div class="rest-third">
    <p class="stage">III этап</p> 
    <div class="rest-green">
      <img src="./assets/MythicCards/greenCard.png">
      <p class="number">${getLength2(chosenCards, 'green', 'thirdStage')}</p>
    </div>
    <div class="rest-brown">
      <img src="./assets/MythicCards/brownCard.png">
      <p class="number">${getLength2(chosenCards, 'brown', 'thirdStage')}</p>
    </div>
    <div class="rest-blue">
      <img src="./assets/MythicCards/blueCard.png">
      <p class="number">${getLength2(chosenCards, 'blue', 'thirdStage')}</p>
    </div>
    </div>`
  return b
}

 function showCard () {
  cardFace.classList.remove('hidden')
  let src
  let id 
  let stage

 if (chosenCards.length > 0) {
    src = chosenCards[chosenCards.length-1]['cardFace']
    id = chosenCards[chosenCards.length-1]['id']
    stage = chosenCards[chosenCards.length-1]['stage']
    chosenCards.pop()
    restNumber.innerHTML = addHTML()


  } else {
    cardFace.classList.add('hidden')
    restNumber.style.display = 'none'
    src = "./assets/mythicCardBackground.png"
    cardBack.removeEventListener('click', showCard)
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





function changeDifficulty (event) {
 
  diffBtn.forEach(el => {
    el.classList.remove('aactive')
    diffChosen = false
    restNumber.style.display = 'none'
    tossblock.classList.add('transparent')
    cardFace.classList.add('hidden')
  }) 

let clickedDifficulty = event.target
let clickedBtn = document.getElementById(clickedDifficulty.id)

 if (clickedBtn!== null && clickedBtn!==undefined) {
   changeClassBtn(clickedBtn)
   difficultyLevel = clickedBtn.id
   diffChosen = true 

 /*     if (difficultyLevel === 'normal') {
        getArrayNormal()
        chosenCards = [...objectStages['firstStage'], ...objectStages['secondStage'],...sortCards(objectStages['thirdStage'])].reverse()
      } else {
        getArrayNormal()
        chosenCards = [...objectStages['firstStage'], ...objectStages['secondStage'],...sortCards(objectStages['thirdStage'])].reverse()
      }*/
      tossblock.classList.remove('transparent')
      tossBtn.addEventListener('click', tossPack)
    }
      else {
        diffChosen = false
        tossBtn.removeEventListener('click', tossPack)
      }
}



function getArrayEasy () {

  greenCards = greenCards.filter(el => el['difficulty'] !== 'hard')
  brownCards = brownCards.filter(el => el['difficulty'] !== 'hard')
  blueCards = blueCards.filter(el => el['difficulty'] !== 'hard')
 
  first = getFirstStage()
  second = getSecondStage()
  third = getThirdStage()

  first.forEach((el) => {
    el.stage = 'firstStage'}) 
  second.forEach((el) => {
    el.stage = 'secondStage'}) 
  third.forEach((el) => {
    el.stage = 'thirdStage'}) 

  objectStages.firstStage = sortCards(first)
  objectStages.secondStage = sortCards(second)
  objectStages.thirdStage = sortCards(third)
  return objectStages
}


function getArrayHard () {

  greenCards = greenCards.filter(el => el['difficulty'] !== 'easy')
  brownCards = brownCards.filter(el => el['difficulty'] !== 'easy')
  blueCards = blueCards.filter(el => el['difficulty'] !== 'easy')
 
  first = getFirstStage()
  second = getSecondStage()
  third = getThirdStage()

  first.forEach((el) => {
    el.stage = 'firstStage'}) 
  second.forEach((el) => {
    el.stage = 'secondStage'}) 
  third.forEach((el) => {
    el.stage = 'thirdStage'}) 

  objectStages.firstStage = sortCards(first)
  objectStages.secondStage = sortCards(second)
  objectStages.thirdStage = sortCards(third)
  return objectStages
}