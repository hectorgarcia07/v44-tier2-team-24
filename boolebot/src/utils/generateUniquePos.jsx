import generateRandomNumber from './randomNum';
import { useSelector } from "react-redux";

export default function generateUniquePos(occupiedPositions) {
  const { tileNum } = useSelector((state) => state.arenaData)

  //generate a number between 1 to tileNum** but not any num in the occupiedPosition arr
  let isValid = false;
  let position;

  if (occupiedPositions.length >= tileNum * tileNum) {
    return -1;
  }

  do {
    position = generateRandomNumber(tileNum * tileNum);

    if (!occupiedPositions.includes(position)) {
      isValid = true;
      occupiedPositions.push(position);
    }
  } while (!isValid);

  return position;
}
