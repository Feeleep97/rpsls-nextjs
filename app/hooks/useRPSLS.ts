import { useCallback, useEffect, useState } from "react";
import {
  Choice,
  GameResultAPIResponse,
  GameResultRemaped,
  UseRPSLS,
} from "../types/hook-types";

export const useRPSLS = (): UseRPSLS => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameResult, setGameResult] = useState<GameResultRemaped | null>(null);

  const [choices, setChoices] = useState<Choice[]>([]);
  const [playerChoice, setPlayerChoice] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>();

  const resetScore = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setGameResult(null);
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

  const getChoiceEmoji = (choiceName: string) => {
    console.log(choiceName, "choice name");
    const emojiMap = {
      rock: "🪨",
      paper: "📄",
      scissors: "✂️",
      lizard: "🦎",
      spock: "🖖",
    };
    return emojiMap[choiceName?.toLowerCase()] || "❓";
  };

  const playGame = useCallback(
    async (choiceId: number) => {
      try {
        setLoading(true);
        setError(null);
        setPlayerChoice(choiceId);

        const response = await fetch("https://codechallenge.boohma.com/play", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ player: choiceId }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = (await response.json()) as GameResultAPIResponse;

        const playerChoiceName =
          choices.find((choice) => choice.id === choiceId)?.name || "Unknown";
        const computerChoiceName =
          choices.find((choice) => choice.id === result.computer)?.name ||
          "Unknown";

        const playerEmoji = getChoiceEmoji(playerChoiceName);
        const computerEmoji = getChoiceEmoji(computerChoiceName);

        const gameData = {
          ...result,
          playerChoiceName,
          computerChoiceName,
          playerEmoji,
          computerEmoji,
        };

        setGameResult(gameData);
      } catch (err) {
        setError("Failed to play game");
        console.error("Error playing game:", err);
      } finally {
        setLoading(false);
      }
    },
    [choices]
  );

  return {
    playerScore,
    computerScore,
    gameResult,
    choices,
    resetScore,
    playGame,
    refetchChoices: fetchChoices,
  };
};
