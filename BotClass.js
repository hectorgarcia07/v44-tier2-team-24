import generateRandomNumber from './utils/randomNum.js';

//Basic bot class
class BotClass {
    constructor(position, direction, tile) {
        this.position = position;
        this.direction = direction;
        this.tile = tile
        this.totalTiles = this.tile * this.tile
        this.value = 1
        this.color = this.getRandomColor()
    }

    getRandomColor() {
        const colorArr= ["red", "blue", "green", "yellow", "orange", "aquamarine", "purple"];
        // Generate a random index between 0 and the length of the array
        const randomIndex = Math.floor(Math.random() * colorArr.length);
        // Return the color at the random index
        return colorArr[randomIndex]
    }

    getNewDirection() {
        let isValid = false
        console.log('getting new direction!!!!!!!!', this)
        while (!isValid) {
            let newDirection = generateRandomNumber(4)
            if (this.isValidMove(newDirection)) {
                this.direction = newDirection
                isValid = true
            }
        }
    }

    updateBotPosition(newPosition) {
        //console.log("Position updated")
        //if valid, we replace the location of the bot with new position
        //do the calculation
        //console.log("old Position", this.position, this.direction)
        const oldBotTile = document.querySelectorAll(`[data-position~="${this.position}"]`)[0]
        oldBotTile.classList.remove(this.color)

        const newBotTile = document.querySelectorAll(`[data-position~="${newPosition}"]`)[0]
        newBotTile.classList.add(this.color)

        this.position = newPosition
        //console.log("new Position", this.position, this.direction)

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
                return ((this.position - 1) % this.tile) != 0
            case 4:
                return ((this.position + 1) % this.tile) != 1
        }
    }

    checkIsNextLocationValid() {
        switch (this.direction) {
            case 1:
                if ((this.position - this.tile) < 1) {
                    //find new direction and stop new direction is valid
                    //once new direction s valid update the new bots direction
                    this.getNewDirection()
                }
                break
            case 2:
                if ((this.position + this.tile) > this.totalTiles) {
                    this.getNewDirection()
                }
                break
            case 3:
                if (((this.position - 1) % this.tile) == 0) {
                    this.getNewDirection()
                }
                break
            case 4:
                if (((this.position + 1) % this.tile) == 1) {
                    this.getNewDirection()
                } 
                break
        }
    }

    calcNextMove() {
        this.checkIsNextLocationValid()

        switch (this.direction) {
            case 1:
                this.updateBotPosition(this.position - this.tile)
                // this.position = this.position - this.tile
                break

            case 2:
                this.updateBotPosition(this.position + this.tile)
                // this.position = this.position + this.tile
                break

            case 3:
                this.updateBotPosition(this.position - 1)
                // this.position = this.position - 1
                break
            case 4:
                this.updateBotPosition(this.position + 1)
                // this.position = this.position + 1
                break
        }

        //check to see if a collision

    }
}

export default BotClass