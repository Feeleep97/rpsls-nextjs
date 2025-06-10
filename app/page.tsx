"use client";

import React from "react";
import { useRPSLS } from "./hooks/useRPSLS";

export default function Home() {
  const { playerScore, computerScore, gameResult, resetScore, playGame } =
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
      </div>
      Game result: {gameResult && <p>{gameResult}</p>}
    </div>
  );
}
