import generateRandomNumber from './utils/randomNum.js';
import BotClass from './BotClass.js'

const arena = document.getElementById('arena')
const battleBtn = document.getElementById('battle')
const tile = 3 //will be used to create an n x n arena
const totalTiles = tile * tile //will hold the maximum tiles a n x n grid can have
let botsArr = []
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
    //  calcNextMove(botsArr)
    if(!isGameRunning){
        intervalId = setInterval(startBattle, 1000)
        isGameRunning = true
        battleBtn.innerText = 'Stop'
     }else{
        clearInterval(intervalId)
        isGameRunning = false
        battleBtn.innerText = 'Battle'
    }
})

const checkCollision = () =>{
    // check over the current location of each robot
    //if two robots have the same location number
        //then collision occurred
        //write logic for collision
    const locationArr = botsArr.map(bot => bot.position)
    console.log("Location array", locationArr)
    
    for (let i = 0; i < locationArr.length; i++){
        for (let j = i + 1; j < locationArr.length; j++){
            if(locationArr[i] === locationArr[j]){
                return true // if any two numbers are the same, return 
            }
        }
    }
    return false
}


const handleCollision = () =>{
    console.log('COLLISION!!!!!!!!!!')

    console.log(botsArr[0].printBotData())
    console.log(botsArr[1].printBotData())

    const positionMap = new Map()

    botsArr.forEach( bot => {
        if( positionMap.has(bot.position) ){
            positionMap.set(bot.position, positionMap.get(bot.position) + 1)
        }
        else{
            positionMap.set(bot.position, 1)
        }
    } )
    
    console.log("MAP ", positionMap)
    
    //will hold the positions that contain more than 1 bot
    let colidedPosition 

    //will hold an array of bots that have collided
    const colidedBots = []
    
    //only get the positions where there is more than 1 bots
    for (const [key, value] of positionMap.entries()) {
        if(value > 1){
            colidedPosition = key
            break
        }
    }
    
    console.log("Collision position", colidedPosition)

    //find all bots with matching collision position
    for(let i = 0; i < botsArr.length; i++){
        if(botsArr[i].position == colidedPosition){
            colidedBots.push(botsArr[i])
        }
    }

    console.log("THESE ARE THE BOTS THAT SHOULD BATTLE ", colidedBots)

    // determine winer & loser
    // using AND 
    switch(operator){
        case "AND":
            const AND_Result = colidedBots[0].value && colidedBots[1].value
            if(!AND_Result){
                console.log("It's a tie")
            }else{
                console.log(colidedBots[0].name, "Won!")
                
                colidedBots[1].removeFromDom()
                //remove array
                botsArr = botsArr.filter(bot => bot.name !== colidedBots[1].name)
                console.log("UPDATED BOTS ARRAY ", botsArr)
            }
            break
        case "OR":
            const OR_Result = colidedBots[0].value || colidedBots[1].value
            if(!OR_Result){
                console.log("It's a tie")
            }
            else{
                colidedBots[1].removeFromDom()
                botsArr = botsArr.filter(bot => bot.name !== colidedBots[1].name)
                console.log("UPDATED BOTS ARRAY ", botsArr)
            }
            break
        case "XOR":
            const XOR_Result = colidedBots[0].value ^ colidedBots[1].value
            if(!XOR_Result){
                console.log("It's a tie")
            }
            else{
                colidedBots[1].removeFromDom()
                botsArr = botsArr.filter(bot => bot.name !== colidedBots[1].name)
                console.log("UPDATED BOTS ARRAY ", botsArr)
            }
            break
        case "NOR":
            const NOR_Result = !(colidedBots[0].value || colidedBots[1].value)
            if(NOR_Result){
                colidedBots[1].removeFromDom()
                botsArr = botsArr.filter(bot => bot.name !== colidedBots[1].name)
                console.log("UPDATED BOTS ARRAY ", botsArr)
            }
            else{
                 console.log("It's a tie")
            }
            break
    }
}

const startBattle = () => {
    
    botsArr.forEach((bot, i) => {
    setTimeout(() => {
      bot.calcNextMove()

      const collision = checkCollision()
      
      if (collision && botsArr.length == 1) {
        clearInterval(intervalId)
        handleCollision()
        isGameRunning = false
        battleBtn.innerText = 'Battle'
      }
    }, (i + 1) * 500) // Delay the execution of the second bot's move by i seconds
  })
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
                botsArr.push(new BotClass (newPosition, generateRandomNumber(4), tile, `Bot ${i + 1}`, `bot${i + 1}`, 0 ))
                isValidPosition = true
            }
        }
    }
    
    botsArr.map(bot => {
        //place bot grid
        const botTile = document.querySelectorAll(`[data-position~="${bot.position}"]`)[0]

        //bot will be represented by a red square
        botTile.classList.add(bot.colorClass)
    })
}

//initialize the areana
generateArena()
generateBots()