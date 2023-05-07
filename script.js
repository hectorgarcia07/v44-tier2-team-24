import generateRandomNumber from './utils/randomNum.js';
import BotClass from './BotClass.js'

const arena = document.getElementById('arena')
const battleBtn = document.getElementById('battle')
const tile = 4 //will be used to create an n x n arena
const totalTiles = tile * tile //will hold the maximum tiles a n x n grid can have
const botsArr = []

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
    startBattle()
    
})

const startBattle= () => {
    botsArr.forEach(bot => bot.calcNextMove())
}

const generateBots = () => {
    //creates a bot with a new position and direction
    botsArr.push( new BotClass (generateRandomNumber(totalTiles), 1, tile))
    console.log(botsArr[0].position, botsArr[0].direction)

    botsArr.map( bot => {
        //place bot grid
        const botTile = document.querySelectorAll(`[data-position~="${bot.position}"]`)[0]

        //bot will be represented by a red square
        botTile.classList.add('bot')
    })
}

//initialize the areana
generateArena()
generateBots()