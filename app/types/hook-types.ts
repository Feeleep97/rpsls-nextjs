export type UseRPSLS = {
  playerScore: number;
  computerScore: number;
  gameResult: string;
  choices: Choice[];
  playGame: (choice: string) => void;
  resetScore: () => void;
  loading?: boolean;
  error?: string | null;
};

export type Choice = {
  id: number;
  name: string;
};
