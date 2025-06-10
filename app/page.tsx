"use client";

import React, { useEffect } from "react";
import { useRPSLS } from "./hooks/useRPSLS";

export default function Home() {
  const { playerScore, computerScore, gameResult, resetScore, choices } =
    useRPSLS();
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
          return choice.name;
        })}
      </div>
      Game result: {gameResult && <p>{gameResult}</p>}
    </div>
  );
}
