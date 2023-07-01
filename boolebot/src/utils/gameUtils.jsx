import makeCopyBotsArr from "./makeCopyBotsArr";
import { calcNextMove } from "../Components/Gameplay/BotObj";
import { checkCollision } from "./collisionLogic";

export function botMovement(setCollisionLocation, botsArr, currBot, tileNum, ){
    setCollisionLocation(() => null);
    const newBotsArr = makeCopyBotsArr(botsArr);

    newBotsArr[currBot] = calcNextMove(newBotsArr[currBot], tileNum)

    const collisionTileIndex = checkCollision(currBot, newBotsArr);  

    const didCollide = collisionTileIndex !== -1;
    
    if (didCollide) {
      setCollisionLocation(() => collisionTileIndex);

      const collidedBotsArr = handleCollision(
        newBotsArr,
        operator,
        newBotsArr[currBot].name,
      );

      
      if (!collidedBotsArr.isATie) {
        setMessage("💥💥💥");
        callSound(IndianaJonesPunch);
        setBattleLog((prev) => [
          ...prev,
          <div>
            {`${collidedBotsArr.bots[0].name} (👑) vs. ${collidedBotsArr.bots[1].name} (😭)`}
          </div>,
        ]);
        setLeaderboard((prev) => {
          return {
            ...prev,
            [collidedBotsArr.bots[0].name]: {
              wins: collidedBotsArr.bots[0].wins,
              loses: collidedBotsArr.bots[0].loses,
            },
            [collidedBotsArr.bots[1].name]: {
              wins: collidedBotsArr.bots[1].wins,
              loses: collidedBotsArr.bots[1].loses,
            },
          };
        });

        let winnerIndex = newBotsArr.findIndex(
          (bot) => bot.name === collidedBotsArr.bots[0].name
        );

        newBotsArr[winnerIndex].wins = collidedBotsArr.bots[0].wins;

        let loserIndex = newBotsArr.findIndex(
          (bot) => bot.name === collidedBotsArr.bots[1].name
        );
        newBotsArr.splice(loserIndex, 1);
      }
      else {
        setMessage("TIE!")
        setBattleLog((prev) => [
          ...prev,
          <div>
            {`${collidedBotsArr.bots[0].name} (🎀) vs. ${collidedBotsArr.bots[1].name} (🎀)`}
          </div>,
        ]);
      }
    } 

    if (newBotsArr.length < botsArr.length) {
      setCurrBot((prev) => {
        if (prev === 0) {
          return prev + 1;
        }
        return prev - 1;
      });
    } else {
      setCurrBot((prev) =>
        prev >= newBotsArr.length - 1 ? 0 : prev + 1
      );
    }

    updateBotsArr(newBotsArr);
}