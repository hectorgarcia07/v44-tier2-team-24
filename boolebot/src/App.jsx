import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import Homepage from "./Pages/HomePage";
import AboutUs from "./Pages/AboutUs";
import RootLayout from "./Pages/Root";
import BotsInfo from "./Pages/BotsInfo";
import Arena from "./Components/Gameplay/Arena"
import CreateArena from './Pages/CreateArena';
import { useEffect } from "react";
import ErrorPage from "./Pages/ErrorPage";
import { setSavedState } from "./Redux/savedState";
import { useSelector, useDispatch } from "react-redux";
import { resetArenaData } from "./Redux/arenaData";
import { resetPlayers } from "./Redux/players";

function App() {
  const arenaData = useSelector((state) => state.arenaData)
  const dispatch = useDispatch()
  const globalReset = () => {
    dispatch(resetPlayers())
    dispatch(resetArenaData())
    dispatch(setSavedState([]))
  }

  useEffect(() => {
    dispatch(resetPlayers())
    dispatch(setSavedState([]))
  }, [arenaData.tileNum])

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
          element: <BotsInfo />
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
