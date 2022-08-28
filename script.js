import ancientsData from './data/ancients.js'
import cardsDataGreen from './data/mythicCards/green/index.js'
import cardsDataBlue from './data/mythicCards/blue/index.js'
import cardsDataBrown from './data/mythicCards/brown/index.js'


const acient = document.querySelector('.acient-container')
const acientId = document.querySelectorAll('.acient')
const tossBtn = document.querySelector('.toss-pack')
const diffBtn = document.querySelectorAll('.complexity')
const restNumber = document.querySelector('.rest')

const cardFace = document.querySelector('.card-face')
const cardBack = document.querySelector('.pack-back')
const complex = document.querySelector('.complexity-container')
const tossblock = document.querySelector('.toss-container')
let difficultyLevel
let isChosen = false
let diffChosen = false


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

acient.addEventListener('click', changeAcient)

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
 greenCards = cardsDataGreen
 brownCards = cardsDataBrown
 blueCards = cardsDataBlue


  let clickedItem = event.target
  acientId.forEach(el => { 
    el.firstChild.classList.remove('aactive')
    isChosen = false
    changeDiffBtn()
  })
  changeClassDiff ()

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
  }
}

//замешиваем колоду при нажатии на кнопку
  function tossPack () {
    changeClassDiff ()

    cardFace.classList.add('hidden')
    cardBack.addEventListener('click', showCard)
  
    if (difficultyLevel === 'normal') {
      getArrayNormal()
  
      } else if (difficultyLevel === 'easy') {
      getArrayEasy() 
  
      } else if (difficultyLevel === 'hard') {
      getArrayHard()
  
      } else if (difficultyLevel === 'too-hard') {
      getArrayTooEasyHard()
      } else {
      getArrayTooEasyHard()
    }
    chosenCards = [...objectStages['firstStage'], ...objectStages['secondStage'],...sortCards(objectStages['thirdStage'])].reverse()    
    restNumber.innerHTML = addHTML()
  }

function getArrayNormal () {
  first = getFirstStage()
  second = getSecondStage()
  third = getThirdStage()
//добавляем в объект параметр стадии для счетчика
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

//меняем класс у блоков сложности и колоды при выборе древнего
function changeClassDiff () {
if (!isChosen) {
  complex.classList.add('transparent')
  restNumber.style.display = 'none'
  cardFace.classList.add('hidden')
} else {
  complex.classList.remove('transparent')
  restNumber.style.display = 'block'}
}

//меняем класс у кнопок сложности при переключении
function changeClassBtn(item) {
  if (!diffChosen) {
  item.classList.add('aactive')
  } else {
  item.classList.remove('aactive')
  }
}

//находим комбинацию  и количество карт по цветам при выборе древнего
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

function addHTML () {
  let b = `<div class="rest-first"> 
    <p class="stage">I этап</p> 
    <div class="rest-green">
      <img src="./assets/MythicCards/greenCard.png">
      <p class="number">${getLength(chosenCards, 'green', 'firstStage')}</p>
    </div>
    <div class="rest-brown">
      <img src="./assets/MythicCards/brownCard.png">
      <p class="number">${getLength(chosenCards, 'brown', 'firstStage')}</p>
    </div>
    <div class="rest-blue">
      <img src="./assets/MythicCards/blueCard.png">
      <p class="number">${getLength(chosenCards, 'blue', 'firstStage')}</p>
    </div>
  </div>
  <div class="rest-second">
    <p class="stage">II этап</p> 
    <div class="rest-green">
      <img src="./assets/MythicCards/greenCard.png">
      <p class="number">${getLength(chosenCards, 'green', 'secondStage')}</p>
    </div>
    <div class="rest-brown">
      <img src="./assets/MythicCards/brownCard.png">
      <p class="number">${getLength(chosenCards, 'brown', 'secondStage')}</p>
    </div>
    <div class="rest-blue">
      <img src="./assets/MythicCards/blueCard.png">
      <p class="number">${getLength(chosenCards, 'blue', 'secondStage')}</p>
    </div>
  </div>
  <div class="rest-third">
    <p class="stage">III этап</p> 
    <div class="rest-green">
      <img src="./assets/MythicCards/greenCard.png">
      <p class="number">${getLength(chosenCards, 'green', 'thirdStage')}</p>
    </div>
    <div class="rest-brown">
      <img src="./assets/MythicCards/brownCard.png">
      <p class="number">${getLength(chosenCards, 'brown', 'thirdStage')}</p>
    </div>
    <div class="rest-blue">
      <img src="./assets/MythicCards/blueCard.png">
      <p class="number">${getLength(chosenCards, 'blue', 'thirdStage')}</p>
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
    addTransparentToss()
    src = "./assets/mythicCardBackground.png"
    acientId.forEach(el => { 
      el.firstChild.classList.remove('aactive')
      isChosen = false})
      changeDiffBtn()
    cardBack.removeEventListener('click', showCard)
    complex.removeEventListener('click', changeDifficulty)
  }
  cardFace.innerHTML = `<img src=${src} alt="pack face">`
}

//функция определения количества карт в колоде - счетчик 
function getLength(array, color, stage) {
  let newArray = array.reduce((total, el) => {
    if (el['color'] === color && el['stage'] === stage) {
      total += 1
    } else {
        total
      }
    return total}, 0)
return newArray
}


const changeDiffBtn = () => {
  diffBtn.forEach(el => {
  el.classList.remove('aactive')
  diffChosen = false
  addTransparentToss()
  cardBack.removeEventListener('click', showCard)})
}

const addTransparentToss = () => {
  restNumber.style.display = 'none'
  tossblock.classList.add('transparent')
  cardFace.classList.add('hidden')
}
//смена уровня сложности
function changeDifficulty (event) {
  changeDiffBtn()

  greenCards = cardsDataGreen
  brownCards = cardsDataBrown
  blueCards = cardsDataBlue
 
  let clickedDifficulty = event.target
  let clickedBtn = document.getElementById(clickedDifficulty.id)

 if (clickedBtn!== null && clickedBtn!==undefined) {
   changeClassBtn(clickedBtn)
   difficultyLevel = clickedBtn.id
   diffChosen = true 
   tossblock.classList.remove('transparent')
   tossBtn.addEventListener('click', tossPack)
  }
   else {
    diffChosen = false
    tossBtn.removeEventListener('click', tossPack)
    tossblock.classList.add('transparent')
  }
}

function getArrayEasy () {
  greenCards = greenCards.filter(el => el['difficulty'] !== 'hard')
  brownCards = brownCards.filter(el => el['difficulty'] !== 'hard')
  blueCards = blueCards.filter(el => el['difficulty'] !== 'hard')
  getArrayNormal ()
}

function getArrayHard () {
  greenCards = greenCards.filter(el => el['difficulty'] !== 'easy')
  brownCards = brownCards.filter(el => el['difficulty'] !== 'easy')
  blueCards = blueCards.filter(el => el['difficulty'] !== 'easy')
  getArrayNormal ()
}

function getArrayTooEasyHard () {
  let allCards
  let snowFlakesCards
  let restCards
  if (difficultyLevel === 'too-easy') {
      allCards = [...greenCards, ...brownCards, ...blueCards].filter(el => el['difficulty'] !== 'hard')
      snowFlakesCards = [...greenCards.filter(el => el['difficulty'] === 'easy'), ...brownCards.filter(el => el['difficulty'] === 'easy'), ...blueCards.filter(el => el['difficulty'] === 'easy')] 
      restCards = allCards.diff(snowFlakesCards)
  } 

  if (difficultyLevel === 'too-hard') {
    allCards = [...greenCards, ...brownCards, ...blueCards].filter(el => el['difficulty'] !== 'easy')
    snowFlakesCards = [...greenCards.filter(el => el['difficulty'] === 'hard'), ...brownCards.filter(el => el['difficulty'] === 'hard'), ...blueCards.filter(el => el['difficulty'] === 'hard')] 
    restCards = allCards.diff(snowFlakesCards)
  } 

  let combination = setPackRule()
  let countGreen = combination.reduce((count, obj) => {
  return count + obj['greenCards']
  }, 0) 
  let countBrown = combination.reduce((count, obj) => {
    return count + obj['brownCards']
  }, 0) 
  let countBlue = combination.reduce((count, obj) => {
    return count + obj['blueCards']
  }, 0) 

 let addCard = []
 let sfgreen = snowFlakesCards.filter(el => el['color'] === 'green').length
 let sfbrown = snowFlakesCards.filter(el => el['color'] === 'brown').length
 let sfblue = snowFlakesCards.filter(el => el['color'] === 'blue').length

  if (sfgreen < countGreen) {
    let dif = countGreen - sfgreen
    let greenCardsNormal = restCards.filter(el => el['color'] === 'green')
    for (let i = dif; i !=0; i--) {
      let random = Math.floor(Math.random()*greenCardsNormal.length)
      addCard.push(greenCardsNormal[random])
      greenCardsNormal.splice(random, 1)
    }
  }

  if (sfbrown < countBrown) {
    let dif = countBrown - sfbrown
      let brownCardsNormal = restCards.filter(el => el['color'] === 'brown')
       for (let i = dif; i !=0; i--) {
        let random = Math.floor(Math.random()*brownCardsNormal.length)
        addCard.push(brownCardsNormal[random])
        brownCardsNormal.splice(random, 1)
     }
   }

  if (sfblue < countBlue) {
   let dif = countBlue - sfblue
   let blueCardsNormal = restCards.filter(el => el['color'] === 'blue')
    for (let i = dif; i !=0; i--) {
      let random = Math.floor(Math.random()*blueCardsNormal.length)
      addCard.push(blueCardsNormal[random])
      blueCardsNormal.splice(random, 1)
    }
  }

let chosenEasyCards = snowFlakesCards.concat(addCard)

 greenCards = chosenEasyCards.filter(el => el['color'] === 'green')
 brownCards = chosenEasyCards.filter(el => el['color'] === 'brown')
 blueCards = chosenEasyCards.filter(el => el['color'] === 'blue')

 getArrayNormal ()
}