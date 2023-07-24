import generateRandomNumber from "../../utils/randomNum";

export const botObj =  {
    position: 0,
    direction: '',
    name: '',
    value: 0,
    botIcon: '',
    wins: 0,
    loses: 0,
}

export const getNewDirection = (botObj, tileNum) => {
    const validDirections = [];

    for (let i = 1; i <= 8; i++) {
      if (isValidMove(botObj, i, tileNum)) {
        validDirections.push(i);
      }
    }

    let randIndex = generateRandomNumber(validDirections.length);

    botObj.direction = validDirections[randIndex - 1];
}

export const isValidMove = (botObj, direction, tileNum) => {

    switch (direction) {
      case 1:
        return botObj.position - tileNum > 0;
      case 2:
        return botObj.position + tileNum <= tileNum * tileNum;
      case 3:
        return (botObj.position - 1) % tileNum != 0;
      case 4:
        return (botObj.position + 1) % tileNum != 1;
      case 5:
        return botObj.position % tileNum !== 0 && botObj.position - (tileNum - 1) > 0
      case 6:
        return botObj.position % tileNum !== 1 && botObj.position - (tileNum + 1) > 0
      case 7:
        return botObj.position % tileNum !== 0 && botObj.position + (tileNum + 1) < tileNum * tileNum
      case 8:
        return botObj.position % tileNum !== 1 && botObj.position + (tileNum - 1) < tileNum * tileNum
    }
  }

export const setNextDirection = (botObj, tileNum) => {
    switch (botObj.direction) {
      case 1:
        if (botObj.position - tileNum < 1) {
          getNewDirection(botObj, tileNum);
        }
        break;
      case 2:
        if (botObj.position + tileNum > (tileNum * tileNum)) {
          getNewDirection(botObj, tileNum);
        }
        break;
      case 3:
        if ((botObj.position - 1) % tileNum == 0) {
          getNewDirection(botObj, tileNum);
        }
        break;

      case 4:
        if ((botObj.position + 1) % tileNum == 1) {
          getNewDirection(botObj, tileNum);
        }
        break;

      case 5:
        if (botObj.position % tileNum === 0 || botObj.position - (tileNum - 1) <= 0) {
          //find new direction and stop new direction is valid
          //once new direction s valid update the new bots direction
          getNewDirection(botObj, tileNum);
        }
        break;

      case 6:
        if (botObj.position % tileNum === 1 || botObj.position - (tileNum + 1) < 0) {
          getNewDirection(botObj, tileNum);
        }
        break;

      case 7:
        if (botObj.position % tileNum === 0 || botObj.position + (tileNum + 1) > tileNum * tileNum) {
          getNewDirection(botObj, tileNum);
        }
        break;

      case 8:
        if (botObj.position % tileNum === 1 || botObj.position + (tileNum - 1) > tileNum * tileNum) {
          getNewDirection(botObj, tileNum);
        }
        break;
    }
  }

export const updateBotPosition = (botObjCopy, newPosition) => {
  botObjCopy.position = newPosition;
}

export const calcNextMove = (botObj, tileNum) => {
    setNextDirection(botObj, tileNum)

    switch (botObj.direction) {
      case 1:
        return updateBotPosition(botObj, botObj.position - tileNum);

      case 2:
        return updateBotPosition(botObj, botObj.position + tileNum);

      case 3:
        return updateBotPosition(botObj, botObj.position - 1);

      case 4:
        return updateBotPosition(botObj, botObj.position + 1);

      case 5:
        return updateBotPosition(botObj, botObj.position - (tileNum - 1));

      case 6:
        return updateBotPosition(botObj, botObj.position - (tileNum + 1));

      case 7:
        return updateBotPosition(botObj, botObj.position + (tileNum + 1));
      case 8:
        return updateBotPosition(botObj, botObj.position + (tileNum - 1));
    }

  }
