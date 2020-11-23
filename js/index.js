let pageId = 1
const URL = `http://localhost:3000/monsters/?_limit=50&_page=${pageId}`
const monsterContainer = document.querySelector('#monster-container')
const monsterCreate = document.querySelector('#create-monster')
const backBtn = document.querySelector('#back')
const forwardBtn = document.querySelector('#forward')

forwardBtn.addEventListener('click', () => {
    pageId++
    nextMonsters()
    // adds next to the page, without starting a new page. infinite scroll.
})

backBtn.addEventListener('click', () => {
    if(pageId > 1){
        pageId--
    }else{
        pageId = 1
    }
    previousMonsters()
    // keeps adding to same page, infinite scroll
})

// fetch
function getMonsters(){
    fetch(URL)
    .then(res => res.json())
    .then(monsters => monsters.forEach(monster => listMonster(monster)))
}
getMonsters()

// add to DOM
function listMonster(monster){
    
    let div = document.createElement('div')
    let h2 = document.createElement('h2')
    let h3 = document.createElement('h3')
    let p = document.createElement('p')
    h2.innerText = monster.name
    h3.innerText = `Age: ${parseInt(monster.age)}` 
    p.innerText = `Description: ${monster.description}`
    div.append(h2, h3, p)
    monsterContainer.appendChild(div)
}

function createMonster(){
    let form = document.createElement('form')

    let nameLabel = document.createElement('label')
    let nameInput = document.createElement('input')
    nameLabel.innerText = 'Name: '

    let ageLabel = document.createElement('label')
    let ageInput = document.createElement('input')
    ageLabel.innerText = 'Age: '

    let descLabel = document.createElement('label')
    let descInput = document.createElement('input')
    descLabel.innerText = 'Description: '

    let button = document.createElement('input')
    button.setAttribute('type', 'submit')

    form.appendChild(nameLabel)
    form.appendChild(nameInput)
    form.appendChild(ageLabel)
    form.appendChild(ageInput)
    form.appendChild(descLabel)
    form.appendChild(descInput)
    form.appendChild(button)

    monsterCreate.appendChild(form)
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        postNewMonster(e) 
    })
}
createMonster()

function postNewMonster(monster){   // (e)
    fetch('http://localhost:3000/monsters', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
        }, 
        body: JSON.stringify({
            name: monster.target[0].value, 
            age: monster.target[1].value, 
            description: monster.target[2].value
        })
    })
    .then(res => res.json())
    .then(console.log)
}

function nextMonsters(){
    fetch(URL)
    .then(res => res.json())
    .then(monsters => monsters.forEach(monster => listMonster(monster)))
}

function previousMonsters(){
    fetch(URL)
    .then(res => res.json())
    .then(monsters => monsters.forEach(monster => listMonster(monster)))
}



