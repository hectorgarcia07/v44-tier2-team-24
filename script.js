import generateRandomNumber from './utils/randomNum.js';

const arena = document.getElementById('arena')
const battleBtn = document.getElementById('battle')
const tile = 4 //will be used to create an n x n arena
const totalTiles = tile * tile //will hold the maximum tiles a n x n grid can have
const botsArr = []

//creates the n x n layout
arena.style.gridTemplateColumns = `repeat( ${tile} , 50px )`
arena.style.gridTemplateRows = `repeat( ${tile} , 50px )`

//Basic bot class
class BotClass {
    constructor(position, direction) {
        this.position = position;
        this.direction = direction;
    }
    getNewDirection(){
        const randomNum = generateRandomNumber(4)

    }
    calcNextMove() {    
        // current location = bot.position
        // current direction = bot.direction
        // check if next direction is valid 
       
            //if invalid, we need to create a loop to generate new direction
                //we must check again, if the next step is valid or not
        
        switch(this.direction){
        case 1: 
            if((this.position - tile) > 0){
                //if valid, we replace the location of the bot with new position
                //do the calculation
                const oldBotTile = document.querySelectorAll(`[data-position~="${this.position}"]`)[0]
                oldBotTile.classList.remove('bot')

                const newBotTile = document.querySelectorAll(`[data-position~="${this.position - tile}"]`)[0]
                newBotTile.classList.add('bot')
                this.position -= tile
            }
            else{
                // asssign a new direction
                // execute calcNextMove again using the new direction
                // getNewDirection()
            }
            break
            
        case 2:
            if((this.position + tile) <= totalTiles ){
                const oldBotTile = document.querySelectorAll(`[data-position~="${this.position}"]`)[0]
                oldBotTile.classList.remove('bot')

                const newBotTile = document.querySelectorAll(`[data-position~="${this.position + tile}"]`)[0]
                newBotTile.classList.add('bot')
                this.position += tile
            }
            break

        case 3: 
            if(((this.position -1) % tile) != 0){
                const oldBotTile = document.querySelectorAll(`[data-position~="${this.position}"]`)[0]
                oldBotTile.classList.remove('bot')

                const newBotTile = document.querySelectorAll(`[data-position~="${this.position - 1}"]`)[0]
                newBotTile.classList.add('bot')
                this.position -= 1 
                
            }
            break
        case 4:
            if(((this.position +1 )% tile) != 1){
                const oldBotTile = document.querySelectorAll(`[data-position~="${this.position}"]`)[0]
                oldBotTile.classList.remove('bot')
        
                const newBotTile = document.querySelectorAll(`[data-position~="${this.position + 1}"]`)[0]
                newBotTile.classList.add('bot')
                this.position += 1
            } 
            break
        }
    }
}

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


//NOT DONE YET
//will determine if the bots next movement is valid
const isValidMove = (nextPosition) => {
    /*
        1 is up
        2 is down
        3 is left 
        4 is right
    */
    switch (nextPosition) {
        case 1:
            return nextPosition > 0
        case 2:
            return nextPosition <= totalTiles
        case 3:
            return nextPosition % tile != 0
        case 4:
            return nextPosition % tile != 1
    }
}

//IGNORE NOT DONE
/*
const nextPosition = (position, direction) => {
    // 1 is up
    // 2 is down
    // 3 is left 
    // 4 is right

    let temp = position

    switch(direction){
        case 1: 
            temp += tile
            return nextPosition > 0
        case 2:
            return nextPosition <= totalTiles
        case 3: 
            return nextPosition % tile != 0
        case 4: 
            return nextPosition % tile != 1
    }
}
*/

//EVENT LISTENER FOR THE BATTLE BUTTON
battleBtn.addEventListener("click", () => {
    //  calcNextMove(botsArr)
     botsArr.forEach(bot => bot.calcNextMove())
})



const generateBots = () => {
    //creates a bot with a new position and direction
    botsArr.push( new BotClass (generateRandomNumber(totalTiles), generateRandomNumber(4)))
    console.log(botsArr[0].position, botsArr[0].direction)

    botsArr.map( bot => {
        //place bot grid
        const botTile = document.querySelectorAll(`[data-position~="${bot.position}"]`)[0]

        //bot will be represented by a red square
        botTile.classList.add('bot')
    })
}

// const startGame = () => {
//     let isGameOver = false

   

// }


//initialize the areana
generateArena()
generateBots()