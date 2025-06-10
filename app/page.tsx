"use client";

import React, { useEffect } from "react";
import { useRPSLS } from "./hooks/useRPSLS";

export default function Home() {
  const {
    playerScore,
    computerScore,
    gameResult,
    resetScore,
    choices,
    playGame,
  } = useRPSLS();
  return (
    <div>
      <h1>Rock Paper Scissors</h1>
      <div>
        <h2>Score</h2>
        <p>
          You: {playerScore} | Computer: {computerScore}
        </p>
        <button onClick={resetScore}>Reset</button>
      </div>
      <div>
        <h3>Choose your move:</h3>
        {choices.map((choice) => {
          return (
            <button key={Math.random()} onClick={() => playGame(choice.id)}>
              {choice.name}
            </button>
          );
        })}
      </div>
      {gameResult && <div>Game result:{gameResult}</div>}
    </div>
  );
}
