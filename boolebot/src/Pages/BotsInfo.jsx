import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import sweetAlertMixin from '../Components/SweetAlertConfig';
import { Link } from "react-router-dom";
import generateRandomNumber from '../utils/randomNum';
import IconPalette from './IconPalette'
import BotRoaster from '../Components/Gameplay/BotRoaster';
import useAutoFocus from '../Components/hooks/useAutoFocus';
import makeCopyBotsArr from '../utils/makeCopyBotsArr';
import getOccupiedPos from '../utils/getOccupiedPos';
import generateUniquePos from '../utils/generateUniquePos';
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addPlayer } from '../Redux/players';

import bot1 from '../assets/bot1.svg'
import bot2 from '../assets/bot2.svg'
import bot3 from '../assets/bot3.svg'
import bot4 from '../assets/bot4.svg' 
import bot5 from '../assets/bot5.svg'
import bot6 from '../assets/bot6.svg'
import bot7 from '../assets/bot7.svg'
import bot8 from '../assets/bot8.svg'
import Container from '../Components/Layout/Container';

export default function BotsInfo({ updateBotsData, botsData }) {
  const { arenaData } = useSelector( (state) => state.arenaData )
  const { players } = useSelector( (state) => state.players )

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const [isBotsArrayFull, setIsBotsArrayFull] = useState(false)
  const tileNum = arenaData.tileNum

  console.log(arenaData)

  
  const inputAutoFocus = useAutoFocus(players);
  const [iconPalette, setIconPalette] = useState([
    {
      url: bot1,
      isSelected: false
    },
    
    {
      url: bot2,
      isSelected: false
    },
    {
      url: bot3,
      isSelected: false
    },
    {
      url: bot4,
      isSelected: false
    },
    {
      url: bot5,
      isSelected: false
    },
    {
      url: bot6,
      isSelected: false
    },
    {
      url: bot7,
      isSelected: false
    },
    {
      url: bot8,
      isSelected: false
    },
  ])
  const [iconSelected, setIconSelected] = useState(0);
  const [isValid, setIsValid]= useState({
    name: false
  });
  const updateIconPalette = (selectedIcon) =>{
    setIconPalette(selectedIcon);
  }
  const updateIconSelected = (newSelectedIcon) =>{
    setIconSelected(newSelectedIcon)
  }

// Generic change handler
function handleChange(e){
  const changedField = e.target.name;
  const newValue = e.target.value;
  let botsDataCopy = {...botsData}
  let isSameName = players.some((bot) => bot.name === newValue)

  if (changedField === "name" && isSameName ) {
    setIsValid( prev => {
      return { name: isSameName}
    })

    // Display an error message or perform necessary actions
    sweetAlertMixin.fire({
      icon: "error",
      title: "Oops...",
      text: `* Each Bots should have unique names`,  
    });
  }
  else{
    updateBotsData({...botsDataCopy, [changedField]: newValue})
  }
}

  //form event- submit
  const handleSubmit = (event) => {
    event.preventDefault();
    
    let occupiedPositions = getOccupiedPos(players, arenaData, tileNum)
    let pos = occupiedPositions.length
      ? generateUniquePos(occupiedPositions)
      : generateRandomNumber(tileNum * tileNum); 
    
    if(pos === -1){
      setIsBotsArrayFull(true)

      sweetAlertMixin.fire({
        icon: "error",
        title: "Reached full arena capacity ",
        text: `Can't add more bots to the arena`,
      });
    }
    else{
      setIsBotsArrayFull(false);
      let botsArrCopy = makeCopyBotsArr(players);
      const newBot = {
        position: pos,
        direction: Number(botsData.direction),
        name: botsData.name,
        value: Number(botsData.value),
        botIcon: botsData.botIcon,
        wins: 0,
        loses: 0,
      }

      const duplicateBot = botsArrCopy.some((bot) => bot.name === newBot.name);

      if (!duplicateBot) {
        const newIconPallet = [ ...iconPalette ]
        newIconPallet[iconSelected].isSelected = true;

        const newIndex = newIconPallet.findIndex((icon) => !icon.isSelected);
        setIconSelected((prev) => newIndex);
        setIconPalette((prev) => {
          return newIconPallet;
        });
        const isAllIconSelected = newIndex !== -1;

        if (isAllIconSelected) {
          updateBotsData({
            name: "",
            value: 0,
            wins: 0,
            loses: 0,
            direction: 1,
            botIcon: iconPalette[newIndex].url,
          });
        }
        dispatch(addPlayer([...botsArrCopy, newBot]))
      }
    }    
  };

  function handleEnterArena(){
    if(players.length === 1){
      sweetAlertMixin.fire({
        icon: "error",
        title: "Not enough bot in the arena",
        text: `You must start the game with at least two robots`,
      });
    }else{
      return navigate("/arena");
    }
  }

  return (
    <div className="botInfo_page">
      <Container>
        <h2>Create Bot</h2>

        <div className="bots_display">
          <BotRoaster
            currentLocation={location.pathname}
            iconPalette={iconPalette}
            updateIconPalette={updateIconPalette}
            setIsBotsArrayFull={setIsBotsArrayFull}
          />
        </div>

        <div className="test">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="name">
                Name your bot:
                <input
                  placeholder=" Name your robot"
                  ref={inputAutoFocus}
                  type="text"
                  id="name"
                  name="name"
                  value={botsData.name}
                  onChange={handleChange}
                  maxLength={9}
                  required
                />
              </label>
              {isValid.name ? (
                <p style={{ color: "red" }}>
                  {" "}
                  * Each Bots should have a unique name
                </p>
              ) : (
                ""
              )}

              <div></div>
              
              <label htmlFor="value">
                <span className="question-space">Choose a Boolean Value</span> <button
                  className="question-button"
                  onClick={(e) => {
                    e.preventDefault();
                    sweetAlertMixin.fire({
                      title: 'Boolean Operator',
                      text: 'Pick either 0 or 1 and this will determine the outcome of a collision between two bots. When two bots collide, the boolean values are evaluated using the boolean operation that was chosen on the Arena Settings page',
                      confirmButtonText: 'OK'
                    });
                  }}
                >
                  ?
                </button>
                <select
                  id="value"
                  name="value"
                  value={botsData.value}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a Value
                  </option>
                  <option value="1">1</option>
                  <option value="0">0</option>
                </select>
              </label>

              <label htmlFor="icons">Bot Icon</label>

              <IconPalette
                id="icons"
                iconPalette={iconPalette}
                botsData={botsData}
                updateBotsData={updateBotsData}
                iconSelected={iconSelected}
                updateIconSelected={updateIconSelected}
              />

              <label htmlFor="direction">
                Bot Direction:
                <select
                  id="direction"
                  name="direction"
                  value={botsData.direction}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select a Direction
                  </option>
                  <option value="1">↑</option>
                  <option value="2">↓</option>
                  <option value="3">←</option>
                  <option value="4">→</option>
                  <option value="5">↗</option>
                  <option value="6">↖</option>
                  <option value="7">↘</option>
                  <option value="8">↙</option>
                </select>
              </label>
              <button type="submit" className="bot-submission-btn" disabled={isBotsArrayFull}>
                Add Bot
              </button>
            </fieldset>
          </form>
          <Link to="/createArena">
            <button className='navigate-btn'>← Back</button>
          </Link>
            <button className='navigate-btn' onClick={handleEnterArena}>Battle Ground →</button>
        </div>
      </Container>
    </div>
  );
}
