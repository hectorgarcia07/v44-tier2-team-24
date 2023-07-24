import { useState, useEffect } from "react";
import React from "react";
import BotRoaster from "./BotRoaster";
import ArenaSetting from "./ArenaSetting";
import BattleLog from "./BattleLog";
import Leaderboard from "./Leaderboard";
import GameClock from "./GameClock";
import PlayFromScratchBtn from "./PlayFromScratchBtn";
import makeCopyBotsArr from "../../utils/makeCopyBotsArr";
import MuteButton from "../../utils/MuteButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { setSavedState } from "../../Redux/savedState";
import { useSelector, useDispatch } from "react-redux";
import { renderArena, checkIsAlwaysTie } from "../../utils/arenaUtils";
import { setPlayers } from "../../Redux/players";
import { calcNextMove } from "./BotObj";
import { checkCollision, handleCollision } from "../../utils/collisionLogic";
import { callSound }  from "../../utils/gameUtils.jsx"
import IndianaJonesPunch from "../../assets/sfx/indiana-jones-punch_down.mp3"

export default function Arena(props) {
  const dispatch = useDispatch()
  const { players } = useSelector(state => state.players)
  const { savedState } = useSelector(state => state.savedState)
  const { arenaData } = useSelector(state => state.arenaData)
  const { tileNum, speed, operator } = arenaData
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [leaderboard, setLeaderboard] = useState({});
  const [currBot, setCurrBot] = useState(0);
  const [collisionLocation, setCollisionLocation] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [isMuted, setIsMuted] = useState(true)
  const [message, setMessage] = useState(null)
  const [timer, setTimer] = useState({
    min: 0,
    sec: 0,
    running: false,
  });
  
  //make scoreboard
  useEffect(() => {
    const arrayofObj = players.map((prev) => {
      const botObj = {
        wins: prev.wins,
        loses: prev.loses,
      };
      return {
        [prev.name]: botObj,
      };
    });

    const mergedObj = Object.assign({}, ...arrayofObj);

    setLeaderboard(mergedObj);
  }, []);
  
  useEffect(() => {
    if (players.length === 1) {
      setIsGameRunning(false);
    }
  }, [players]);

  useEffect(() => {
    checkIsAlwaysTie(players, operator)
  },[])

  function startGame() {
    dispatch(setSavedState(makeCopyBotsArr(players)))
    setIsGameRunning((prev) => (prev ? false : true));
  }

  useEffect(() => {
    let intervalId;

    if (isGameRunning) {
      console.log("game is running")

      intervalId = setInterval(
        () => {
          console.log("Players", players[currBot])

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
        }, 
        collisionLocation ? (4000 - speed) + 1000 : 4000 - speed
      )
    }
    return () => clearInterval(intervalId);
  }, [isGameRunning, currBot, players, operator, dispatch]);

  function playAgain() {
    dispatch(setPlayers(savedState))

    setBattleLog([]);
    setLeaderboard({});
    setTimer((prev) => {
      return {
        min: 0,
        sec: 0,
        running: false,
      };
    });
    setCollisionLocation(null);
  }

  return (
    <main className="main_container">
      <div className="game_board">
        <div className="bots_display">
          <BotRoaster currentLocation iconPalette updateIconPalette />
        </div>
        <div className="arena">{renderArena(players, collisionLocation, tileNum, message)}</div>

        <div className="mute-clock-start-container">
          <MuteButton isMuted={isMuted} setIsMuted={setIsMuted} />
          <div className="GameClock">
            <GameClock
              isGameRunning={isGameRunning}
              timer={timer}
              setTimer={setTimer}
            />
          </div>
          <div className="buttons">
            {players.length === 1 ? (
              <div>
                <button
                  onClick={() => {
                    playAgain();
                  }}
                  className="btn"
                >
                  Restart
                </button>
              </div>
            ) : (
              <button onClick={() => startGame()} className="btn">
                {isGameRunning ? <FontAwesomeIcon icon={faPause} style={{ color: "#ffffff" }} /> : <FontAwesomeIcon icon={faPlay} style={{ color: "#ffffff" }} />}
              </button>
            )}
          </div>
        </div>
        <PlayFromScratchBtn />
      </div>
      <aside className="status_info">
        <ArenaSetting tileNum={tileNum} speed={speed} operator={operator} />
        <Leaderboard
          leaderboard={leaderboard}
          setLeaderboard={setLeaderboard}
        />
        <BattleLog battleLog={battleLog} />
        
      </aside>
    </main>
  );
}
