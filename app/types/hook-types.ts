export type UseRPSLS = {
  playerScore: number;
  computerScore: number;
  gameResult: GameResultRemaped | null;
  choices: Choice[];
  gameHistory: GameHistory[];
  playGame: (choice: number) => void;
  resetScore: () => void;
  refetchChoices: () => void;
  clearHistory: () => void;
  loading?: boolean;
  error?: string | null;
};

export type Choice = {
  id: number;
  name: string;
  emoji: any;
};

export type GameResultAPIResponse = {
  computer: number;
  player: number;
  results: string;
};

export type GameResultRemaped = {
  playerChoiceName: string;
  computerChoiceName: string;
  playerEmoji: any;
  computerEmoji: any;
  computer: number;
  player: number;
  results: string;
  resultMessage: string;
  resultColor: string;
};

export type GameHistory = {
  id: number;
  playerChoice: string;
  computerChoice: string;
  playerEmoji: string;
  computerEmoji: string;
  result: string;
  resultColor: string;
  timestamp: string;
};
