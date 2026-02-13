export type Screen = 'home' | 'settings' | 'setup' | 'pass' | 'reveal' | 'discussion' | 'result';

export type Category = 
  | 'Aleatório'
  | 'Comida' 
  | 'Animais' 
  | 'Países' 
  | 'Esportes' 
  | 'Jogos' 
  | 'Filmes' 
  | 'Música' 
  | 'Objetos' 
  | 'Transportes';

export interface Player {
  id: number;
  name: string;
  isImpostor: boolean;
  word: string; // The specific word this player sees
}

export interface WordPair {
  normal: string;
  impostor: string;
}

export interface GameState {
  players: Player[];
  playerCount: number;
  impostorCount: number;
  selectedCategory: Category;
  currentNormalWord: string;
  currentImpostorWord: string;
  currentPlayerIndex: number;
  currentScreen: Screen;
  viewingTimeSeconds: number;
  customNames: string[];
  isMusicPlaying: boolean;
  vibrationEnabled: boolean;
}

export const CATEGORIES: Category[] = [
  'Aleatório',
  'Comida',
  'Animais',
  'Países',
  'Esportes',
  'Jogos',
  'Filmes',
  'Música',
  'Objetos',
  'Transportes'
];