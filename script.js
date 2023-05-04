const arena = document.getElementById('arena')
const tile = 4 //will be used to create an n x n arena
const randomPosition = generateRandomNumber(tile)
const totalTiles = tile * tile //will hold the maximum tiles a n x n grid can have

//creates the n x n layout
arena.style.gridTemplateColumns = `repeat( ${tile} , 50px )`
arena.style.gridTemplateRows = `repeat( ${tile} , 50px )`

//Basic bot class
class Bot {
    constructor(position, direction) {
      this.position = position;
      this.direction = direction;
    }
}

//generates a n x n grid
const generateArena = () => {
    let position = 1

    for(let i = 0; i < tile; i++){
        for(let j = 0; j < tile; j++){
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

//will generate random number from tile from 0 > x <= tile
function generateRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

//will determine if the bots next movement is valid
const isValidMove = (nextPosition) => {
    /*
        1 is up
        2 is down
        3 is left 
        4 is right
    */
    switch(nextPosition){
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

const startGame = () => {
    //creates a bot with a new position and direction
    const bot = new Bot(generateRandomNumber(totalTiles), generateRandomNumber(4))
    console.log("Bot position:", bot.position, "bot direction:", bot.direction)
    
    //place bot grid
    const botTile = document.querySelectorAll(`[data-position~="${bot.position}"]`)[0]

    //bot will be represented by a red square
    botTile.classList.add('bot')
    
    let isGameOver = false

}



//initialize the areana
generateArena()
startGame()