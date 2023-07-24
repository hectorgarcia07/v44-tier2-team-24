import React, { useEffect, useState } from 'react'
import '../../SASS/Partials/_leaderBoard.scss'
import { useSelector } from "react-redux";

export default function Leaderboard({ leaderboard }) {
  const { players } = useSelector( state => state.players )

    const [winningScore, setWinningScore] = useState(null)

    let leaderboardEl = []; 

    for (const [key, value] of Object.entries(leaderboard)) {
  
        leaderboardEl.push(
          <div
            key={key}
            className={
              winningScore && value.wins === winningScore && value.loses === 0
                ? "winning"
                : ""
            }
          >
            <li>
              {`${key}: loses: ${value.loses} wins: ${value.wins} `}
              {winningScore && value.wins === winningScore && value.loses === 0
                ? "🔥"
                : ""}
            </li>
          </div>
        );
    }
    
    useEffect(()=>{
      const playerCopy = [...players]
        const winningArr = playerCopy.sort(function(a, b){
          return b.wins - a.wins
        })

        const winningBot = winningArr[0]
        
        if(winningBot){
          if(playerCopy.length < (Object.keys(leaderboard).length)){
            setWinningScore(winningBot.wins)
          }
        }
    }, [players, leaderboard])
  

  return (
    <div className="leaderBoard">
      <h3>Leaderboard</h3>
      <ul className="leaderboard">{leaderboardEl}</ul>
    </div>
  );
}
