import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import Homepage from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs";
import RootLayout from "./Pages/Root";
import BotsInfo from "./Pages/BotsInfo";
import Arena from "./Components/Gameplay/Arena"
import CreateArena from './Pages/CreateArena';
import { useState, useEffect } from "react";
import bot1 from './assets/bot1.svg'
import ErrorPage from "./Pages/ErrorPage";
import { setSavedState } from "./Redux/savedState";
import { useSelector, useDispatch } from "react-redux";
import { resetArenaData } from "./Redux/arenaData";
import { resetPlayers } from "./Redux/players";

function App() {
  const arenaData = useSelector((state) => state.arenaData)
  const dispatch = useDispatch()
  const [botsData, setBotsData] = useState({
    name: "",
    value: 0,
    wins: 0,
    loses: 0,
    direction: 1,
    botIcon: bot1
  });
  const updateBotsData = (newState) => {
    setBotsData(newState);
  }
  const globalReset = () => {
    dispatch(resetPlayers())
    dispatch(resetArenaData())
    dispatch(setSavedState([]))
    setBotsData({
      name: "",
      value: 0,
      wins: 0,
      loses: 0,
      direction: 1,
      botIcon: bot1,
    });
  }

  useEffect(()=>{
    dispatch(resetPlayers())
    dispatch(setSavedState([]))
  },[arenaData.tileNum])

  const router = createBrowserRouter([
    //the following path is for the wrapper
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <RootLayout />,
      children: [
        { path: "/", element: <Homepage globalReset={globalReset} /> },
        {
          path: "/createArena",
          element: <CreateArena />,
        },
        {
          path: "/createBot",
          element: <BotsInfo updateBotsData={updateBotsData} botsData={botsData} />
        },
        { path: "/about", element: <AboutUs /> },
        {
          path: "/arena",
          element: <Arena />
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
