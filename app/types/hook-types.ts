export type UseRPSLSType = {
  playerScore: number;
  computerScore: number;
  gameResult: string;
  choices: string[];
  playGame: (choice: string) => void;
  resetScore: () => void;
  loading?: boolean;
  error?: string | null;
};
