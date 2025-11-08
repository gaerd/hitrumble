export interface Song {
  id: string;
  title: string;
  artist: string;
  year: number;
  albumCover?: string;
}

export interface Player {
  id: string;
  name: string;
  timeline: Song[];
  startYear: number;
  score: number;
  isReady: boolean;
}

export interface GameState {
  id: string;
  phase: 'setup' | 'lobby' | 'playing' | 'reveal' | 'finished';
  players: Player[];
  currentSong: Song | null;
  roundNumber: number;
  winner: Player | null;
}
