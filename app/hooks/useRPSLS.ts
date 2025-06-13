import { useCallback, useEffect, useState } from "react";
import {
  Choice,
  GameHistory,
  GameResultAPIResponse,
  GameResultRemaped,
  UseRPSLS,
} from "../types/hook-types";

export const useRPSLS = (): UseRPSLS => {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameResult, setGameResult] = useState<GameResultRemaped | null>(null);
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>();

  const resetScore = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setGameResult(null);
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case "win":
        return "text-green-600";
      case "lose":
        return "text-red-600";
      case "tie":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getResultMessage = (result: string) => {
    switch (result) {
      case "win":
        return "🎉 You Won!";
      case "lose":
        return "😞 You Lost!";
      case "tie":
        return "🤝 It's a Tie!";
      default:
        return "";
    }
  };

  const getChoiceEmoji = (choiceName: string) => {
    const emojiMap = {
      rock: "🪨",
      paper: "📄",
      scissors: "✂️",
      lizard: "🦎",
      spock: "🖖",
    };
    return emojiMap[choiceName?.toLowerCase() as keyof typeof emojiMap] || "❓";
  };

  const fetchChoices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://codechallenge.boohma.com/choices");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as Choice[];
      const choicesWithEmojis = data.map((choice) => ({
        ...choice,
        emoji: getChoiceEmoji(choice.name),
      }));
      setChoices(choicesWithEmojis);
    } catch (err) {
      setError("Failed to fetch game choices");
      console.error("Error fetching choices:", err);
      setChoices([
        { id: 1, name: "rock", emoji: "🪨" },
        { id: 2, name: "paper", emoji: "📄" },
        { id: 3, name: "scissors", emoji: "✂️" },
        { id: 4, name: "lizard", emoji: "🦎" },
        { id: 5, name: "spock", emoji: "🖖" },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChoices();
  }, [fetchChoices]);

  const playGame = useCallback(
    async (choiceId: number) => {
      try {
        setLoading(true);
        setError(null);

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

        const resultMessage = getResultMessage(result.results);
        const resultColor = getResultColor(result.results);

        const gameData = {
          ...result,
          playerChoiceName,
          computerChoiceName,
          playerEmoji,
          computerEmoji,
          resultMessage,
          resultColor,
        };

        setGameResult(gameData);

        const gameRecord = {
          id: Date.now(),
          playerChoice: playerChoiceName,
          computerChoice: computerChoiceName,
          playerEmoji,
          computerEmoji,
          result: result.results,
          resultColor,
          timestamp: new Date().toLocaleTimeString(),
        } as GameHistory;

        setGameHistory((prev) => [gameRecord, ...(prev || []).slice(0, 9)]);
      } catch (err) {
        setError("Failed to play game");
        console.error("Error playing game:", err);
      } finally {
        setLoading(false);
      }
    },
    [choices]
  );

  const clearHistory = useCallback(() => {
    setGameHistory([]);
  }, []);

  return {
    playerScore,
    computerScore,
    gameResult,
    choices,
    resetScore,
    playGame,
    loading,
    error,
    clearHistory,
    gameHistory,
    refetchChoices: fetchChoices,
  };
};
