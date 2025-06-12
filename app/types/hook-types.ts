export type UseRPSLS = {
  playerScore: number;
  computerScore: number;
  gameResult: GameResultRemaped | null;
  choices: Choice[];
  playGame: (choice: number) => void;
  resetScore: () => void;
  refetchChoices: () => void;
  loading?: boolean;
  error?: string | null;
};

export type Choice = {
  id: number;
  name: string;
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
