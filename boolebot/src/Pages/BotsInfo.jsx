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
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addPlayer } from '../Redux/players';
import { booleanError, uniqueName } from '../Components/Forms/sweetAlert';
import * as Yup from 'yup';

import bot1 from '../assets/bot1.svg'
import bot2 from '../assets/bot2.svg'
import bot3 from '../assets/bot3.svg'
import bot4 from '../assets/bot4.svg' 
import bot5 from '../assets/bot5.svg'
import bot6 from '../assets/bot6.svg'
import bot7 from '../assets/bot7.svg'
import bot8 from '../assets/bot8.svg'
import Container from '../Components/Layout/Container';
import { useFormik } from 'formik';

export default function BotsInfo({ updateBotsData, botsData }) {
  const { arenaData } = useSelector( (state) => state.arenaData )
  const { players } = useSelector( (state) => state.players )
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
  const [isBotsArrayFull, setIsBotsArrayFull] = useState(false)
  
  const inputAutoFocus = useAutoFocus(players);

  const updateIconPalette = (selectedIcon) =>{
    setIconPalette(selectedIcon);
  }

  Yup.addMethod(Yup.string, "noRepeatedNames", function (errorMessage, players) {
    return this.test(`no-repeated-names`, errorMessage, function (value) {
      const { path, createError } = this;
      const names = players.map( player => player.name)
      const result = names.find(name => name == value)

      return (
        result == undefined ||
        createError({ path, message: errorMessage })
      );
    });
  });

  const BotValidation = Yup.object().shape({
    name: Yup.string()
      .min(0, 'Too Short!')
      .max(9, 'Too Long!')
      .noRepeatedNames("Name must be unique!", players)
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      value: "1",
      wins: 0,
      loses: 0,
      direction: "1",
      botIcon: "1"
    },
    validationSchema: BotValidation,
    onSubmit: values => {

      console.log("Bots info values ", values)
      
      let occupiedPositions = getOccupiedPos(players, arenaData, tileNum)
      let pos = occupiedPositions.length
        ? generateUniquePos(occupiedPositions, tileNum)
        : generateRandomNumber(tileNum * tileNum); 

      //if negative then no more bots can fit in the board
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
        let botsArrCopy = makeCopyBotsArr(players)

        const newBot = {
          position: pos,
          direction: Number(values.direction),
          name: values.name,
          value: Number(values.value),
          botIcon: iconPalette[values.botIcon].url,
          wins: 0,
          loses: 0,
        }

        //update the icon pallet that was selected
        const newIconPallet = [ ...iconPalette ]
        newIconPallet[values.botIcon].isSelected = true;
        setIconPalette(newIconPallet);

        formik.resetForm()
        const nextIndex = newIconPallet.findIndex((icon) => !icon.isSelected);
        formik.setFieldValue('botIcon', `${nextIndex}`)

        //if all icon index is taken then disable button
        if (nextIndex !== -1) {
          //reset formik
        }
        dispatch(addPlayer([...botsArrCopy, newBot]))
      }
    
  }
});

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const tileNum = arenaData.tileNum

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
          <form onSubmit={(e) => {
            e.preventDefault()
            console.log("Submit!!")

            formik.handleSubmit()
          }}>
            <fieldset>
              <label htmlFor="name">
                Name your bot:
                <input
                  placeholder=" Name your robot"
                  ref={inputAutoFocus}
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.onBlur}
                  maxLength={9}
                  required
                />
              </label>

              <div></div>
              
              <label htmlFor="value">
                <span className="question-space">Choose a Boolean Value</span> <button
                  className="question-button"
                  onClick={(e) => {
                    e.preventDefault();
                    sweetAlertMixin.fire(booleanError);
                  }}
                >
                  ?
                </button>
                <select
                  id="value"
                  name="value"
                  value={formik.values.value}
                  onChange={formik.handleChange}
                  onBlur={formik.onBlur}
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
                formik={formik}
                iconPalette={iconPalette}
              />

              <label htmlFor="direction">
                Bot Direction:
                <select
                  id="direction"
                  name="direction"
                  value={formik.values.direction}
                  onChange={formik.handleChange}
                  onBlur={formik.onBlur}
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
