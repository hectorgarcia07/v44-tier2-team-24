import generateRandomNumber from './utils/randomNum.js';
import BotClass from './BotClass.js'

const arena = document.getElementById('arena')
const generateBot = document.getElementById('generateBot')
const battleBtn = document.getElementById('battle')
const tile = 2 //will be used to create an n x n arena
const totalTiles = tile * tile //will hold the maximum tiles a n x n grid can have
const botsArr = []
let isGameRunning = false
let intervalId = null
const operator = 'AND'

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
    startBattle()
    //  calcNextMove(botsArr)
    // if(!isGameRunning){
    //     intervalId = setInterval(startBattle,1000)
    //     isGameRunning = true
    //     battleBtn.innerText = 'Stop'
    //  }else{
    //     clearInterval(intervalId)
    //     isGameRunning = false
    //     battleBtn.innerText = 'Battle'

    // }
})

const checkCollision = () => {

    // check over the current location of each robot
    //if two robots have the same location number
    //then collision occurred
    //write logic for collision
    
    const locationArr = botsArr.map(bot => bot.position)
    let counts = {}
    for (let i = 0; i < locationArr.length; i++) {
        if (counts[locationArr[i]] === undefined) {
            counts[locationArr[i]] = 1;
        }
        else {
            console.log("bot array", botsArr)
            console.log("COLLISION!")
            return true
        }
    }

    return false
    

    // console.log(locationArr)
    // for (let i = 0; i < locationArr.length; i++){
    //     for (let j = i + 1; j < locationArr.length; j++){
    //         if(locationArr[i] === locationArr[j]){
    //             console.log('COLLISION!!!!!!!!!!')
    //             return true // if any two numbers are the same, return 
    //         }
    //     }
    // }
    // return false
}

const handleCollision = () => {

    //get value from bot 1
    //get value from bot 2
    //opeartion = AND
    //calculate final value for bot 1 & bot 2

    //create Map
    //itterate all bots and we key as position and increase the value of the key
    //each time we get a psotion
    //itterate map, if there the is > 1 then there is a repition
    //once we have the positon, then itterate botsArr and find all keys that
    //contain the position

    const positionMap = new Map()

    botsArr.forEach(bot => {
        if (positionMap.has(bot.position)) {
            positionMap.set(bot.position, positionMap.get(bot.position) + 1)
        }
        else {
            positionMap.set(bot.position, 1)
        }
    })

}

async function startBattle ()  {

    for(let i = 0; i < botsArr.length; i++){
        await botsArr[i].calcNextMove()
    }

    // console.log("BOTS CURRENT position,", botsArr)
    
    if (checkCollision()) {
        // console.log("collision detected")
        handleCollision()
    }

}

const generateBots = (numOfBots = 2) => {
    // intialPositionArr = []
    // loop through the array to check for used positions
    // if there are robots, 
    //look at their current position, generate a number != their position

    
    for (let i = 0; i < numOfBots; i++) {
        let isValidPosition = false
        let currPosition = []

        botsArr.forEach(bot => currPosition.push(bot.position))

        while (!isValidPosition) {
            let newPosition = generateRandomNumber(totalTiles)

            if (!currPosition.includes(newPosition)) {
                //creates a bot with a new position and direction
                botsArr.push(new BotClass(newPosition, generateRandomNumber(4), tile))
                isValidPosition = true
            }
        }
    }
    console.log('Bots Created', botsArr)
    
    //botsArr.push(new BotClass(4, 1, tile))
    //botsArr.push(new BotClass(1, 4, tile))

    botsArr.map(bot => {
        //place bot grid
        const botTile = document.querySelectorAll(`[data-position~="${bot.position}"]`)[0]

        //bot will be represented by a red square
        botTile.classList.add(bot.color)
    })
}

//initialize the areana
generateArena()
generateBots()

//generateBot.addEventListener('click', () => generateBots())