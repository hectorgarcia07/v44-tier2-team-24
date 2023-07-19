import { useSelector, useDispatch } from "react-redux";

export const renderArena = (botsArr, collisionLocation) => {
  const { tileNum } = useSelector((state) => state.arenaData)
  const arenaStyles = {
    gridTemplateColumns: `repeat(${tileNum}, 3.5em)`, /*changed grid size*/
    gridTemplateRows: `repeat(${tileNum}, 3.5em)`,
  };

  console.log("tileNum", tileNum)

  const positions = Array.from(
    { length: tileNum * tileNum },
      (_, i) => i + 1
    );
    return (
        <div className="arena wrapper" style={arenaStyles}>
          {positions.map((tilePosition) => {
            const robotIndex = botsArr.findIndex(
              (bot) => bot.position === tilePosition
            );
            return renderTile(tilePosition, robotIndex, collisionLocation);
          })} 
        </div>
      );
    };

const renderTile = (tilePosition, robotIndex, botsArr, collisionLocation) => {
    const robot = robotIndex >= 0 ? botsArr[robotIndex] : null;
  
    let tileClass = { backgroundColor: "" };
    let text = "";
  
    if (botsArr.length === 1) {
      text = "WINNER!";
    } else if (tilePosition === collisionLocation) {
      text = message;bot
    }
  
    return (
        <div
            style={tileClass}
            key={tilePosition + 1}
            data-position={tilePosition}
            className={`tile  ${
              tilePosition === collisionLocation ? "crashedText" : ""
            }`}
          >
            {robot ? <img src={robot.botIcon} alt="photo of a robot head" style={{width:"50%"}} />: ""}
            {text}
          </div>
    );
}

export function checkIsAlwaysTie(botsArr, operator){
    // if all bots have 0, operation: AND, = TIE
    // if all bots have 0, operation: OR,  = TIE
    // if all bots have 0, operation: XOR, = TIE
    // if all bots have 1, operator: NOR, = TIE

    const containAllZeros = botsArr.every(bot => bot.value === 0)
    const containAllOnes = botsArr.every(bot => bot.value === 1)

    const tieOperators = ((operator === "AND") ||(operator === "OR") || (operator === "XOR") )

    if((tieOperators && containAllZeros )){
        sweetAlertMixin.fire({
          icon: "info",
          title: "The current setup will result in an infinite tie ",
          text: `Reason: 0 ${operator} 0 will always produce a 0`
        });
    }
    else if (containAllOnes && (operator==="NOR")) {
        sweetAlertMixin.fire({
          icon: "info",
          title:
            "The current bot values and boolean operator will result in an infinite tie",
          text: `Reason: 1 NOR 1 will always produce a 0`,
        });
    }
  }