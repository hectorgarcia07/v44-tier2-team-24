import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { removePlayer } from '../../Redux/players';

export default function BotRoaster({
  currentLocation,
  iconPalette,
  updateIconPalette,
  setIsBotsArrayFull,
}) {
  const players = useSelector( state => state.players )
  const dispatch = useDispatch()


  const handleDelete = (botName) => {
    const iconPaletteCopy = [...iconPalette];

    let index = players.findIndex((bot) => bot.name === botName);
    let iconPaletteIndex = iconPalette.findIndex(
      (icon) => icon.url === players[index].botIcon
    );
    iconPaletteCopy[iconPaletteIndex].isSelected = false;

    updateIconPalette(iconPaletteCopy);
    dispatch(removePlayer(botName))
    setIsBotsArrayFull(false);
  };

  const [expandedBots, setExpandedBots] = useState([]);

  const toggleBotExpansion = (index) => {
    setExpandedBots((prevExpandedBots) => {
      const newExpandedBots = [...prevExpandedBots];
      newExpandedBots[index] = !newExpandedBots[index];
      return newExpandedBots;
    });
  };

  return (
    <div className="createdBots">
      {players &&
        players.map((bot, index) => (
          <div className={`showBot ${bot.name}`} key={index}>
            <div className="botIcon_wrapper">
              <img src={bot.botIcon} alt="photo of a robot head" />
            </div>
            <div key={index} className="botIcon_details">
              <h3 className="title">{bot.name}</h3>
              {expandedBots[index] && (
                <React.Fragment>
                  <p>Position: {bot.position}</p>
                  <p>
                    Direction:{" "}
                    {bot.direction === 1
                      ? "⬆️"
                      : bot.direction === 2
                      ? "⬇️"
                      : bot.direction === 3
                      ? "⬅️"
                      : bot.direction === 4
                      ? "➡️"
                      : bot.direction === 5
                      ? "↗️"
                      : bot.direction === 6
                      ? "↖️"
                      : bot.direction === 7
                      ? "↘️"
                      : bot.direction === 8
                      ? "↙️"
                      : ""}
                  </p>
                  <p>Value: {bot.value}</p>
                </React.Fragment>
              )}
              <div className="botsInfoButtons">
                <button
                  className="expand"
                  onClick={() => toggleBotExpansion(index)}
                >
                  {expandedBots[index] ? "Collapse" : "Expand"}
                </button>
                {currentLocation === "/createBot" ? (
                  <button onClick={() => handleDelete(bot.name)}>Delete</button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
