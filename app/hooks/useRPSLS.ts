import { useState } from "react";
import { UseRPSLSType } from "../types/hook-types";

export const useRPSLS = (): UseRPSLSType => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameResult, setGameResult] = useState("");
  const [playerOptions, setPlayerOptions] = useState([]);

  const resetScore = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setGameResult("");
  };

  const playGame = () => {
    console.log("call API in order to get who won");
    // base on the answer set either computer score or player score
  };

  return {
    playerScore,
    computerScore,
    gameResult,
    playerOptions,
    resetScore,
    playGame,
  };
};
