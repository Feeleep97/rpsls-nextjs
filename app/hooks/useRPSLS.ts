import { useCallback, useEffect, useState } from "react";
import { Choice, UseRPSLS } from "../types/hook-types";

export const useRPSLS = (): UseRPSLS => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameResult, setGameResult] = useState("");

  const [choices, setChoices] = useState<Choice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>();

  const resetScore = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setGameResult("");
  };

  const playGame = () => {
    console.log("call API in order to get who won");
    // base on the answer set either computer score or player score
  };

  const fetchChoices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://codechallenge.boohma.com/choices");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setChoices(data);
      console.log(choices, "data from api");
    } catch (err) {
      setError("Failed to fetch game choices");
      console.error("Error fetching choices:", err);
      setChoices([
        { id: 1, name: "rock" },
        { id: 2, name: "paper" },
        { id: 3, name: "scissors" },
        { id: 4, name: "lizard" },
        { id: 5, name: "spock" },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChoices();
  }, [fetchChoices]);
  return {
    playerScore,
    computerScore,
    gameResult,
    choices,
    resetScore,
    playGame,
  };
};
