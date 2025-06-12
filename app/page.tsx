"use client";

import React from "react";
import { useRPSLS } from "./hooks/useRPSLS";

export default function Home() {
  const {
    playerScore,
    gameResult,
    resetScore,
    choices,
    playGame,
    loading,
    error,
    refetchChoices,
    gameHistory,
    clearHistory,
  } = useRPSLS();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Rock Paper Scissors Lizard Spock
          </h1>
          <p className="text-blue-100">
            The classic game with a Sheldon Cooper twist!
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={refetchChoices}
                className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Choose Your Weapon
            </h2>

            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading...</p>
              </div>
            )}

            {!loading && choices.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {choices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => playGame(choice.id)}
                    disabled={loading}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                      playerScore === choice.id
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 bg-gray-50 hover:border-purple-300 hover:bg-purple-50"
                    } ${
                      loading
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <div className="text-3xl mb-2">{choice.emoji}</div>
                    <div className="font-semibold text-gray-700 capitalize">
                      {choice.name}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {gameResult && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
                <div
                  className={`text-2xl font-bold mb-2 ${gameResult.resultColor}`}
                >
                  {gameResult.resultMessage}
                </div>
                <div className="text-gray-600 mb-2">
                  You played: {gameResult.playerEmoji}
                  <span className="font-semibold capitalize ml-1">
                    {gameResult.playerChoiceName}
                  </span>
                </div>
                <div className="text-gray-600 mb-4">
                  Computer played: {gameResult.computerEmoji}
                  <span className="font-semibold capitalize ml-1">
                    {choices.find((c) => c.id === gameResult.computer)?.name}
                  </span>
                </div>
                <button
                  onClick={resetScore}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Game History</h2>
              {gameHistory.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>

            {gameHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">🎮</div>
                <p>No games played yet!</p>
                <p className="text-sm">
                  Start playing to see your history here.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[540px] overflow-y-auto">
                {gameHistory.map((game) => (
                  <div
                    key={game.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-1">You</div>
                        <div className="text-2xl mb-1">{game.playerEmoji}</div>
                        <div className="text-xs font-semibold capitalize text-blue-600">
                          {game.playerChoice}
                        </div>
                      </div>
                      <div className="text-gray-400 text-sm">vs</div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-1">AI</div>
                        <div className="text-2xl mb-1">
                          {game.computerEmoji}
                        </div>
                        <div className="text-xs font-semibold capitalize text-red-600">
                          {game.computerChoice}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${game.resultColor}`}>
                        {game.result.toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {game.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
