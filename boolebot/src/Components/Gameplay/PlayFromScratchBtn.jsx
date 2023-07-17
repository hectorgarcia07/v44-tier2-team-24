import React from 'react'
import { useDispatch } from 'react-redux';
import { resetPlayers } from '../../Redux/players';
import { Link } from 'react-router-dom';

export default function PlayFromScratchBtn() {
  const dispatch = useDispatch()

  function restartGame() {
    dispatch(resetPlayers())
  }
  
    return (
    <div>
      <Link to="/">
        <div>
          <button className="btn"
            onClick={() => {
              restartGame();
            }}
          
          >
            New Game
          </button>
        </div>
      </Link>
    </div>
  );
}
