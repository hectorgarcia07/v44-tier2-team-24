import generateRandomNumber from './utils/randomNum.js';
import BotClass from './BotClass.js'

const arena = document.getElementById('arena')
const battleBtn = document.getElementById('battle')
const tile = 8 //will be used to create an n x n arena
const totalTiles = tile * tile //will hold the maximum tiles a n x n grid can have
const botsArr = []
let isGameRunning = false
let intervalId = null

//creates the n x n layout
arena.style.gridTemplateColumns = `repeat( ${tile} , 50px )`
arena.style.gridTemplateRows = `repeat( ${tile} , 50px )`


//generates a n x n grid
const generateArena = () => {
    let position = 1

    for (let i = 0; i < tile; i++) {
        for (let j = 0; j < tile; j++) {
            const cell = document.createElement('div')

            //will hold the position of the current tile
            cell.dataset.position = position

            //add a cell style to the new div
            cell.classList.add('cell')

            //will be uesd to label the tile with it's current position
            cell.innerText = position

            arena.appendChild(cell)
            position++
        }
    }
}

//EVENT LISTENER FOR THE BATTLE BUTTON
battleBtn.addEventListener("click", () => {
    //  calcNextMove(botsArr)
    if(!isGameRunning){
        intervalId = setInterval(startBattle,1000)
        isGameRunning = true
        battleBtn.innerText = 'Stop'
     }else{
        clearInterval(intervalId)
        isGameRunning = false
        battleBtn.innerText = 'Battle'

    }
})

const startBattle= () => {
    botsArr.forEach(bot => bot.calcNextMove())
}

const generateBots = (numOfBots = 2) => {
    // intialPositionArr = []
    // loop through the array to check for used positions
        // if there are robots, 
            //look at their current position, generate a number != their position
            
    for(let i = 0; i < numOfBots; i++){
        let isValidPosition = false
        let currPosition = []

        botsArr.forEach(bot => currPosition.push(bot.position))

        while(!isValidPosition){
            let newPosition = generateRandomNumber(totalTiles)

            if(!currPosition.includes(newPosition)){
                //creates a bot with a new position and direction
                botsArr.push(new BotClass (newPosition, generateRandomNumber(4), tile))
                isValidPosition = true
            }
        }
        
    }
    
    console.log(botsArr)
    botsArr.map(bot => {
        //place bot grid
        const botTile = document.querySelectorAll(`[data-position~="${bot.position}"]`)[0]

        //bot will be represented by a red square
        botTile.classList.add('bot')
    })
}

//initialize the areana
generateArena()
generateBots()