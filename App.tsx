import React, { useState, useEffect, useRef } from 'react';
import { GameState, Category, Player, CATEGORIES } from './types';
import { WORD_LISTS } from './constants';
import { HomeScreen } from './components/screens/HomeScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { SetupScreen } from './components/screens/SetupScreen';
import { PassDeviceScreen } from './components/screens/PassDeviceScreen';
import { RevealRoleScreen } from './components/screens/RevealRoleScreen';
import { DiscussionScreen } from './components/screens/DiscussionScreen';
import { ResultScreen } from './components/screens/ResultScreen';
import { Volume2, VolumeX } from 'lucide-react';

// Helper to shuffle array
function shuffle<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const App: React.FC = () => {
  // Audio state
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initial State
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    playerCount: 4,
    impostorCount: 1,
    selectedCategory: 'Aleatório',
    currentNormalWord: '',
    currentImpostorWord: '',
    currentPlayerIndex: 0,
    currentScreen: 'home', // Start at Home
    viewingTimeSeconds: 3,
    customNames: [],
    isMusicPlaying: false,
    vibrationEnabled: true
  });

  // Initialize Music
  useEffect(() => {
    try {
        // Using a royalty-free track
        const audioUrl = "https://cdn.pixabay.com/download/audio/2022/03/24/audio_33385e0546.mp3?filename=mystery-search-19345.mp3"; 
        
        const audio = new Audio(audioUrl);
        audio.loop = true;
        audio.volume = 0.3;
        
        // Handle loading errors gracefully
        audio.addEventListener('error', (e) => {
            console.warn("Audio failed to load", e);
        });

        audioRef.current = audio;
    } catch (e) {
        console.warn("Audio initialization failed", e);
    }

    return () => {
      if (audioRef.current) {
          try {
            audioRef.current.pause();
          } catch (e) {}
          audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    try {
        if (gameState.isMusicPlaying) {
            audioRef.current.pause();
        } else {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.warn("Audio play blocked or failed", error);
                    // If play fails, force state back to off
                    setGameState(prev => ({ ...prev, isMusicPlaying: false }));
                });
            }
        }
        setGameState(prev => ({ ...prev, isMusicPlaying: !prev.isMusicPlaying }));
    } catch (e) {
        console.warn("Toggle music failed", e);
    }
  };

  const toggleVibration = () => {
      const newVal = !gameState.vibrationEnabled;
      setGameState(prev => ({ ...prev, vibrationEnabled: newVal }));
      if (newVal && navigator.vibrate) {
          try { navigator.vibrate(50); } catch(e){}
      }
  };

  const vibrate = (pattern: number | number[]) => {
      if (gameState.vibrationEnabled && navigator.vibrate) {
          try { navigator.vibrate(pattern); } catch(e){}
      }
  };

  const startGame = () => {
    // 1. Select Category & Word Pair
    let categoryToUse = gameState.selectedCategory;
    if (categoryToUse === 'Aleatório') {
      const cats = Object.keys(WORD_LISTS) as Category[];
      categoryToUse = cats[Math.floor(Math.random() * cats.length)];
    }

    const wordPairs = WORD_LISTS[categoryToUse as Exclude<Category, 'Aleatório'>];
    const pair = wordPairs[Math.floor(Math.random() * wordPairs.length)];

    // 2. Setup Players
    // Ensure custom names are populated
    const names = [...gameState.customNames];
    for(let i=0; i<gameState.playerCount; i++) {
        if(!names[i]) names[i] = `Jogador ${i+1}`;
    }

    const newPlayers: Player[] = Array.from({ length: gameState.playerCount }, (_, i) => ({
      id: i + 1,
      name: names[i],
      isImpostor: false,
      seenRole: false,
      word: pair.normal // Default to normal
    }));

    // 3. Assign Impostors
    const indices = Array.from({ length: gameState.playerCount }, (_, i) => i);
    const shuffledIndices = shuffle(indices);
    for (let i = 0; i < gameState.impostorCount; i++) {
      const playerIdx = shuffledIndices[i];
      newPlayers[playerIdx].isImpostor = true;
      newPlayers[playerIdx].word = pair.impostor; // Assign Impostor word
    }

    setGameState(prev => ({
      ...prev,
      players: newPlayers,
      currentNormalWord: pair.normal,
      currentImpostorWord: pair.impostor,
      currentScreen: 'pass',
      currentPlayerIndex: 0
    }));
    
    vibrate(100);
  };

  const handlePlayerReady = () => {
    vibrate(50);
    setGameState(prev => ({ ...prev, currentScreen: 'reveal' }));
  };

  const handlePlayerDone = () => {
    vibrate(50);
    setGameState(prev => {
      const nextIndex = prev.currentPlayerIndex + 1;
      if (nextIndex >= prev.playerCount) {
        return { ...prev, currentScreen: 'discussion' };
      }
      return { ...prev, currentPlayerIndex: nextIndex, currentScreen: 'pass' };
    });
  };

  const handleRevealImpostor = () => {
    vibrate([100, 50, 100]);
    setGameState(prev => ({ ...prev, currentScreen: 'result' }));
  };

  const handleRestart = () => {
     startGame();
  };

  const handleHome = () => {
      setGameState(prev => ({
          ...prev,
          currentScreen: 'home', // Go to Home instead of Setup
          players: [],
          currentPlayerIndex: 0
      }));
  };

  const displayCategory = gameState.selectedCategory === 'Aleatório' ? 'Tema Surpresa' : gameState.selectedCategory;

  return (
    <div className="h-[100dvh] w-full max-w-lg mx-auto bg-black text-neutral-100 shadow-2xl overflow-hidden relative font-sans">
      
      {/* Audio Toggle Overlay (Visible on all screens except Settings which has its own) */}
      {gameState.currentScreen !== 'settings' && (
          <button 
            onClick={toggleMusic}
            className="absolute top-4 right-4 z-50 p-2 bg-neutral-900/80 rounded-full text-neutral-400 hover:text-white border border-neutral-700 backdrop-blur-md"
          >
            {gameState.isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
      )}

      {gameState.currentScreen === 'home' && (
        <HomeScreen 
            onStart={() => setGameState(prev => ({ ...prev, currentScreen: 'setup' }))} 
            onSettings={() => setGameState(prev => ({ ...prev, currentScreen: 'settings' }))} 
        />
      )}

      {gameState.currentScreen === 'settings' && (
        <SettingsScreen 
            isMusicPlaying={gameState.isMusicPlaying}
            toggleMusic={toggleMusic}
            vibrationEnabled={gameState.vibrationEnabled}
            toggleVibration={toggleVibration}
            viewingTime={gameState.viewingTimeSeconds}
            setViewingTime={(t) => setGameState(prev => ({ ...prev, viewingTimeSeconds: t }))}
            onBack={handleHome}
        />
      )}

      {gameState.currentScreen === 'setup' && (
        <SetupScreen
          playerCount={gameState.playerCount}
          setPlayerCount={(n) => setGameState(prev => ({ ...prev, playerCount: n }))}
          impostorCount={gameState.impostorCount}
          setImpostorCount={(n) => setGameState(prev => ({ ...prev, impostorCount: n }))}
          category={gameState.selectedCategory}
          setCategory={(c) => setGameState(prev => ({ ...prev, selectedCategory: c }))}
          customNames={gameState.customNames}
          setCustomNames={(names) => setGameState(prev => ({ ...prev, customNames: names }))}
          onStart={startGame}
        />
      )}

      {gameState.currentScreen === 'pass' && (
        <PassDeviceScreen
          playerName={gameState.players[gameState.currentPlayerIndex].name}
          onReady={handlePlayerReady}
        />
      )}

      {gameState.currentScreen === 'reveal' && (
        <RevealRoleScreen
          playerName={gameState.players[gameState.currentPlayerIndex].name}
          word={gameState.players[gameState.currentPlayerIndex].word}
          category={displayCategory}
          onNext={handlePlayerDone}
          viewingTime={gameState.viewingTimeSeconds}
        />
      )}

      {gameState.currentScreen === 'discussion' && (
        <DiscussionScreen
          onReveal={handleRevealImpostor}
          category={displayCategory}
        />
      )}

      {gameState.currentScreen === 'result' && (
        <ResultScreen
          players={gameState.players}
          normalWord={gameState.currentNormalWord}
          impostorWord={gameState.currentImpostorWord}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      )}
    </div>
  );
};

export default App;