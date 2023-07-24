const checkCollision = (currBot, botsArr) => {
  const index = botsArr.findIndex(bot => {
    const notCurrentBot = bot.name !== botsArr[currBot].name; 

    return notCurrentBot && (botsArr[currBot].position === bot.position);
  })
  
  if(index !== -1){
    return botsArr[index].position
  }
  return -1
};

const handleCollision = (botsArr, operator, currBotName) => {
  const positionMap = new Map();

  botsArr.forEach((bot) => {
    if (positionMap.has(bot.position)) {
      positionMap.set(bot.position, positionMap.get(bot.position) + 1);
    } else {
      positionMap.set(bot.position, 1);
    }
  });

  //will hold the positions that contain more than 1 bot
  let colidedPosition;

  //will hold an array of bots that have collided
  const colidedBots = ["", ""];

  //only get the positions where there is more than 1 bots
  for (const [key, value] of positionMap.entries()) {
    if (value > 1) {
      colidedPosition = key;
      break;
    }
  }

  //find all bots with matching collision position
  for (let i = 0; i < botsArr.length; i++) {
    if (botsArr[i].position == colidedPosition) {

      if (currBotName === botsArr[i].name) {
        colidedBots[0] = botsArr[i];
      } else {
        colidedBots[1] = botsArr[i];
      }
    }
  }

  switch (operator) {
    case "AND":
      const AND_Result = colidedBots[0].value && colidedBots[1].value;
      return updateScore(AND_Result, colidedBots[0], colidedBots[1]);
      break;
    case "OR":
      const OR_Result = colidedBots[0].value || colidedBots[1].value;
      return updateScore(OR_Result, colidedBots[0], colidedBots[1]);
      break;
    case "XOR":
      // (a && !b) || (!a && b)
      const XOR_Result = colidedBots[0].value === colidedBots[1].value ? true : false

      return updateScore(!XOR_Result, colidedBots[0], colidedBots[1]);
      break;
    case "NOR":
      const NOR_Result = !(colidedBots[0].value || colidedBots[1].value);
      return updateScore(NOR_Result, colidedBots[0], colidedBots[1]);
      break;
  }
};

const updateScore = (result, botOne, botTwo) => {
  if (result) {
    botOne.wins = botOne.wins + 1
    botTwo.loses = botTwo.loses + 1

    return { isATie : false, bots: [botOne, botTwo]}
  } else {
    return { isATie : true, bots: [botOne, botTwo]}
  }
};

export { checkCollision, handleCollision };
