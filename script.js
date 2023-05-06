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
        const fullDirectionArr = [1,2,3,4]
        // remove the existing direction from the direction arr
        const remainingDirections = fullDirectionArr.filter(directions => directions != this.direction)
        // run calcNextMove with directions in the remainingDirections array
        
        //if the first item in the array is a valid direction   
            //reset the fullDirectionArr to be [1,2,3,4]
            //run calcNextMove()
        //else
            //remove the current item from the remainingDirections array
            //try with the next item in the array
        
        
        /*
        const oldDirection = this.direction
        do{
            this.direction = generateRandomNumber(4)
        }
        while(generateRandomNumber(4) === this.direction)

        console.log("NEW DIRECTION", this.direction)
        */

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
        const oldBotTile = document.querySelectorAll(`[data-position~="${this.position}"]`)[0]
        oldBotTile.classList.remove('bot')

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
        1. Get 
    */
    
    calcNextMove() {    
        // current location = bot.position
        // current direction = bot.direction
        // check if next direction is valid 
       
            //if invalid, we need to create a loop to generate new direction
                //we must check again, if the next step is valid or not
        
        switch(this.direction){
        case 1: 
            /*
                if((this.position - tile) > 0){
                this.updateBotPosition(this.position - tile)
                
                this.position -= tile
            }
            else{
                // asssign a new direction
                // execute calcNextMove again using the new direction
                // getNewDirection()
                this.getNewDirection()
                
            }
            */
            console.log("BOTS", this.position, this.direction)
            if((this.position - tile) < 0){
                //find new direction and stop new direction is valid
                //once new direction s valid update the new bots direction
                this.getNewDirection()
                this.calcNextMove()
            }
            else{
                this.updateBotPosition(this.position - tile)
                this.position -= tile
            
            }
            break
            
        case 2:
            if((this.position + tile) <= totalTiles ){
                this.updateBotPosition(this.position + tile)
                this.position += tile
            }
            else{
                this.getNewDirection()
            }
            break

        case 3: 
            if(((this.position -1) % tile) != 0){
                this.updateBotPosition(this.position -1)
                this.position -= 1 
            }
            else{
                this.getNewDirection()
            }
            break
        case 4:
            if(((this.position +1 )% tile) != 1){
                this.updateBotPosition(this.position + 1)
                this.position += 1
            } 
            else{
                this.getNewDirection()
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