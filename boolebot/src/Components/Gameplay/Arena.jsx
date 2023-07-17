import { useState, useEffect } from "react";
import React from "react";
import BotRoaster from "./BotRoaster";
import ArenaSetting from "./ArenaSetting";
import BattleLog from "./BattleLog";
import Leaderboard from "./Leaderboard";
import GameClock from "./GameClock";
import PlayFromScratchBtn from "./PlayFromScratchBtn";
import makeCopyBotsArr from "../../utils/makeCopyBotsArr";
import IndianaJonesPunch from "../../assets/sfx/indiana-jones-punch_down.mp3";
import MuteButton from "../../utils/MuteButton";
import { botMovement } from "../../utils/gameUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { setSavedState } from "../../Redux/savedState";
import { useSelector, useDispatch } from "react-redux";
import { renderArena, checkIsAlwaysTie } from "../../utils/arenaUtils";
import { setPlayers } from "../../Redux/players";

export default function Arena(props) {
  const dispatch = useDispatch()
  const { players, arenaData} = useSelector(state => state)
  const { tileNum, speed, operator } = arenaData
  
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [leaderboard, setLeaderboard] = useState({});
  const [currBot, setCurrBot] = useState(0);
  const [collisionLocation, setCollisionLocation] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [isMuted, setIsMuted] = useState(true)
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
      intervalId = setInterval(
        () => botMovement(setCollisionLocation, players, currBot, tileNum), 
        collisionLocation ? (4000 - speed) + 1000 : 4000 - speed
      );
    }

    return () => clearInterval(intervalId);
  }, [isGameRunning, currBot, players, operator]);

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
        <div className="arena">{renderArena(players, collisionLocation)}</div>

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
