import IndianaJonesPunch from "../assets/sfx/indiana-jones-punch_down.mp3"

///ChatGPT suggestion
export function callSound(sound, isMuted) {
  if (!isMuted) return new Audio(sound).play();
}

export default function botMovement (players, currBot, setCollisionLocation, calcNextMove, 
  tileNum, checkCollision, handleCollision, setMessage, callSound, setBattleLog, setLeaderboard, setCurrBot, dispatch, setPlayers, operator, isMuted ) {

  setCollisionLocation(() => null)
  
  const newPlayer = players.map( bot => {
    return { ...bot }
  })
  //newBotsArr

  calcNextMove(newPlayer[currBot], tileNum)
  console.log("New move", newPlayer[currBot])

  const collisionTileIndex = checkCollision(currBot, newPlayer);

  const didCollide = collisionTileIndex !== -1;

  if (didCollide) {
    setCollisionLocation(() => collisionTileIndex);

    const collidedBotsArr = handleCollision(
      newPlayer,
      operator,
      newPlayer[currBot].name,
    );

    if (!collidedBotsArr.isATie) {
      setMessage("💥💥💥");
      callSound(IndianaJonesPunch, isMuted);
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

      let loserIndex = newPlayer.findIndex(
        (bot) => bot.name === collidedBotsArr.bots[1].name
      );
      newPlayer.splice(loserIndex, 1);
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

  if (newPlayer.length < players.length) {
    setCurrBot((prev) => {
      if (prev === 0) {
        return prev + 1;
      }
      return prev - 1;
    });
  } else {
    setCurrBot((prev) =>
      prev >= newPlayer.length - 1 ? 0 : prev + 1
    );
  }

  dispatch( setPlayers(newPlayer) )
}