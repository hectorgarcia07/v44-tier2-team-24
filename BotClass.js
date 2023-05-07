
import generateRandomNumber from './utils/randomNum.js';
//Basic bot class
class BotClass {
    constructor(position, direction, tile) {
        this.position = position;
        this.direction = direction;
        this.tile = tile
        this.totalTiles = this.tile * this.tile
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
                return (this.position - this.tile) > 0
            case 2:
                return (this.position + this.tile) <= this.totalTiles
            case 3:
                return ((this.position -1) % this.tile) != 0
            case 4:
                return ((this.position +1 )% this.tile) != 1
        }
    }

    setNextDirection(){
        switch(this.direction){
            case 1:
                if((this.position - this.tile) < 1){
                    //find new direction and stop new direction is valid
                    //once new direction s valid update the new bots direction
                    this.getNewDirection()
                }
                break
            case 2:
                if((this.position + this.tile) > this.totalTiles ){
                    this.getNewDirection()
                }
                break
            case 3:
                if(((this.position -1) % this.tile) == 0){
                    this.getNewDirection()
                }
                break
            case 4:
                if(((this.position +1 )% this.tile) == 1){
                    this.getNewDirection()
                } 
                break
        }
    }
    
    calcNextMove() {
        this.setNextDirection()

        switch(this.direction){
        case 1: 
            this.updateBotPosition(this.position - this.tile)
            this.position -= this.tile
            break
            
        case 2:
            this.updateBotPosition(this.position + this.tile)
            this.position += this.tile
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

export default BotClass