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
        let isValid = false

        while(!isValid){
            let newDirection = generateRandomNumber(4)
            if(this.isValidMove(newDirection)){
                this.direction = newDirection
                isValid = true
            }
        }
        console.log("new direction ", this.direction)
    }

    updateBotPosition(newPosition){
        //if valid, we replace the location of the bot with new position
        //do the calculation
        console.log("current bot position", this.position, this.direction)
        const oldBotTile = document.querySelectorAll(`[data-position~="${this.position}"]`)[0]
        oldBotTile.classList.remove('bot')

        console.log('position to insert ', newPosition)

        const newBotTile = document.querySelectorAll(`[data-position~="${newPosition}"]`)[0]
        newBotTile.classList.add('bot')
        
    }

    //will determine if the bots next movement is valid
    isValidMove(direction) {
        /*
            1 is up
            2 is down
            3 is left 
            4 is right
        */
        switch (direction) {
            case 1:
                return (this.position - tile) > 0
            case 2:
                return (this.position + tile) <= totalTiles
            case 3:
                return ((this.position -1) % tile) != 0
            case 4:
                return ((this.position +1 )% tile) != 1
        }
    }
    /*
    * when button is pressed:
            *first check to see if the next move is valid giving the direction
                *if it is valid, move the bot based on it's direction
                *else, calculate a new direction
                    *check to see if the new direction is valid
                    *if not, repeat, otherwise, return new direction
                    *update the new direction
    */

    setNextDirection(){
        switch(this.direction){
            case 1:
                if((this.position - tile) < 1){
                    //find new direction and stop new direction is valid
                    //once new direction s valid update the new bots direction
                    this.getNewDirection()
                }
                break
            case 2:
                if((this.position + tile) > totalTiles ){
                    this.getNewDirection()
                }
                break
            case 3:
                if(((this.position -1) % tile) == 0){
                    this.getNewDirection()
                }
                break
            case 4:
                if(((this.position +1 )% tile) == 1){
                    this.getNewDirection()
                } 
                break
        }
    }
    
    calcNextMove() {
        // current location = bot.position
        // current direction = bot.direction
        // check if next direction is valid 
       
            //if invalid, we need to create a loop to generate new direction
                //we must check again, if the next step is valid or not
        
        //will update direction if needed
        this.setNextDirection()

        switch(this.direction){
        case 1: 
            this.updateBotPosition(this.position - tile)
            this.position -= tile
            break
            
        case 2:
            this.updateBotPosition(this.position + tile)
            this.position += tile
            break

        case 3: 
            this.updateBotPosition(this.position -1)
            this.position -= 1 
            break
        case 4:
            this.updateBotPosition(this.position + 1)
            this.position += 1
            break
        }

        console.log("Updated bot position ", this)
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
    botsArr.push( new BotClass (generateRandomNumber(totalTiles), 1))
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