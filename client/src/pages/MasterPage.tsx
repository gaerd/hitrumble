import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import AIChat from '@/components/AIChat';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import GameControl from '@/components/GameControl';
import WinnerScreen from '@/components/WinnerScreen';
import { socketService } from '@/lib/socket';
import type { GameState, RoundResult } from '@/types/game.types';

export default function MasterPage() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [preferences, setPreferences] = useState('');
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [isDJPlaying, setIsDJPlaying] = useState(false);
  const [showReconnectPrompt, setShowReconnectPrompt] = useState(false);
  const [savedMasterSession, setSavedMasterSession] = useState<{ gameCode: string; masterPersistentId: string } | null>(null);
  const { toast } = useToast();
  const gameStateRef = useRef<GameState | null>(null);

  // Keep ref in sync with state
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    fetch('/api/spotify/status')
      .then(res => res.json())
      .then(data => setSpotifyConnected(data.connected))
      .catch(console.error);

    // Check for saved master session
    const session = socketService.getMasterSession();
    if (session) {
      setSavedMasterSession(session);
      setShowReconnectPrompt(true);
      return;
    }

    const socket = socketService.connect();

    socketService.createGame((data) => {
      setGameState(data.gameState);
      // Save master session for reconnection
      socketService.saveMasterSession(data.gameState.id, data.gameState.masterPersistentId);
    });

    socketService.onGameStateUpdate((newState) => {
      setGameState(newState);
    });

    socketService.onGameStarted((newState) => {
      setGameState(newState);
    });

    socketService.onResultsRevealed((data) => {
      setResults(data.results);
      setGameState(data.gameState);
    });

    socketService.onPlayerDisconnected((data) => {
      toast({
        title: 'Player Disconnected',
        description: `${data.playerName} lost connection and can reconnect`,
        duration: 5000
      });
    });

    socketService.onDJCommentary((base64Audio) => {
      console.log('DJ commentary received, playing...');
      setIsDJPlaying(true);
      
      const audioBlob = new Blob(
        [Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0))],
        { type: 'audio/mpeg' }
      );
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        console.log('DJ commentary finished, checking if we should continue...');
        setIsDJPlaying(false);
        URL.revokeObjectURL(audioUrl);
        
        // Vänta lite och kolla om spelet är finished innan vi går vidare
        setTimeout(() => {
          const currentState = gameStateRef.current;
          if (currentState && currentState.phase !== 'finished') {
            console.log('Auto-starting next round...');
            socketService.nextRound();
          } else {
            console.log('Game finished - not starting next round');
          }
        }, 1500);
      };
      
      audio.onerror = (e) => {
        console.error('DJ audio error:', e);
        setIsDJPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.play().catch(err => {
        console.error('Failed to play DJ audio:', err);
        setIsDJPlaying(false);
        URL.revokeObjectURL(audioUrl);
      });
    });

    socketService.onRoundStarted((newState) => {
      setGameState(newState);
      setResults([]);
    });

    socketService.onError((message) => {
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive'
      });
    });

    return () => {
      socketService.disconnect();
    };
  }, [toast]);

  const handleAIChatConfirm = (pref: string) => {
    if (!preferences) {
      setPreferences(pref || 'rock music');
    }
    
    socketService.confirmPreferences(pref || preferences, (data) => {
      setGameState(data.gameState);
    });
  };

  const handleStartGame = () => {
    socketService.startGame();
  };

  const handleRevealResults = () => {
    socketService.revealResults();
  };

  const handleNextRound = () => {
    if (gameState?.phase === 'playing') {
      handleRevealResults();
    } else if (gameState?.phase === 'reveal') {
      socketService.nextRound();
    }
  };

  const handleReconnect = () => {
    if (!savedMasterSession) return;

    const socket = socketService.connect();
    
    socketService.reconnectMaster(
      savedMasterSession.gameCode,
      savedMasterSession.masterPersistentId,
      (data) => {
        setGameState(data.gameState);
        setShowReconnectPrompt(false);
        
        // Refresh master session after successful reconnection
        socketService.saveMasterSession(data.gameState.id, data.gameState.masterPersistentId);
        
        toast({
          title: 'Återansluten!',
          description: 'Du är tillbaka i spelet',
          duration: 3000
        });

        // Setup socket listeners for reconnected session
        setupSocketListeners();
      }
    );

    socketService.onError((message) => {
      toast({
        title: 'Kunde inte återansluta',
        description: message,
        variant: 'destructive',
        duration: 5000
      });
      handleStartNewGame();
    });
  };

  const handleStartNewGame = () => {
    socketService.clearMasterSession();
    setShowReconnectPrompt(false);
    setSavedMasterSession(null);
    window.location.reload();
  };

  const setupSocketListeners = () => {
    socketService.onGameStateUpdate((newState) => {
      setGameState(newState);
      // Refresh master session timestamp to keep it alive during gameplay
      if (newState.masterPersistentId) {
        socketService.saveMasterSession(newState.id, newState.masterPersistentId);
      }
    });

    socketService.onGameStarted((newState) => {
      setGameState(newState);
    });

    socketService.onResultsRevealed((data) => {
      setResults(data.results);
      setGameState(data.gameState);
    });

    socketService.onPlayerDisconnected((data) => {
      toast({
        title: 'Spelare frånkopplad',
        description: `${data.playerName} tappade anslutningen och kan återansluta`,
        duration: 5000
      });
    });

    socketService.onDJCommentary((base64Audio) => {
      console.log('DJ commentary received, playing...');
      setIsDJPlaying(true);
      
      const audioBlob = new Blob(
        [Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0))],
        { type: 'audio/mpeg' }
      );
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        console.log('DJ commentary finished, checking if we should continue...');
        setIsDJPlaying(false);
        URL.revokeObjectURL(audioUrl);
        
        setTimeout(() => {
          const currentState = gameStateRef.current;
          if (currentState && currentState.phase !== 'finished') {
            console.log('Auto-starting next round...');
            socketService.nextRound();
          } else {
            console.log('Game finished - not starting next round');
          }
        }, 1500);
      };
      
      audio.onerror = (e) => {
        console.error('DJ audio error:', e);
        setIsDJPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.play().catch(err => {
        console.error('Failed to play DJ audio:', err);
        setIsDJPlaying(false);
        URL.revokeObjectURL(audioUrl);
      });
    });

    socketService.onRoundStarted((newState) => {
      setGameState(newState);
      setResults([]);
    });

    socketService.onError((message) => {
      toast({
        title: 'Fel',
        description: message,
        variant: 'destructive'
      });
    });
  };

  // Show reconnect prompt
  if (showReconnectPrompt && savedMasterSession) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden bg-bg"
      >
        <div className="absolute top-12 left-12 z-20">
          <img src="/logo.png" alt="HitRumble Logo" className="h-48 w-auto" />
        </div>

        <div className="w-full max-w-md p-10 hr-card shadow-glow relative z-30">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎮</div>
            <h1 className="text-4xl font-black mb-3 text-fg font-display">
              VÄLKOMMEN TILLBAKA!
            </h1>
            <p className="text-fg-2 text-lg">Vi hittade ditt senaste spel</p>
          </div>
          <div className="space-y-4">
            <div className="bg-bg-surface rounded-hrmd p-6 border border-fg/10">
              <p className="text-sm text-fg-muted mb-1 font-bold">Spelkod</p>
              <p className="text-2xl font-mono font-black text-fg">{savedMasterSession.gameCode}</p>
            </div>
            <button
              className="hr-btn hr-btn--primary w-full text-xl py-6 font-black"
              onClick={handleReconnect}
              data-testid="button-reconnect-master"
            >
              Återanslut till spel
            </button>
            <button
              className="w-full text-lg py-4 bg-bg-surface hover-elevate text-fg font-bold border border-fg/20 rounded-hrmd"
              onClick={handleStartNewGame}
              data-testid="button-start-new-master"
            >
              Starta nytt spel
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!gameState) {
    return (
      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg"
      >
        <div className="absolute top-12 left-12 z-20">
          <img src="/logo.png" alt="HitRumble Logo" className="h-48 w-auto" />
        </div>
        <p className="text-3xl text-fg font-black relative z-10">Creating game...</p>
      </div>
    );
  }

  if (gameState.phase === 'setup') {
    if (!spotifyConnected) {
      window.location.href = '/?spotify_required=true';
      return null;
    }
    return <AIChat onPreferencesConfirmed={handleAIChatConfirm} />;
  }

  if (gameState.phase === 'lobby') {
    return (
      <QRCodeDisplay
        gameCode={gameState.id}
        playerCount={gameState.players.length}
        players={gameState.players}
        onStartGame={handleStartGame}
      />
    );
  }

  if (gameState.phase === 'finished' && gameState.winner) {
    return (
      <WinnerScreen
        winner={gameState.winner}
        allPlayers={gameState.players}
        onNewGame={() => window.location.reload()}
      />
    );
  }

  return (
    <div
      className="min-h-screen p-8 relative overflow-hidden bg-bg"
    >
      {/* HitRumble Logo - Upper Left */}
      <div className="absolute top-8 left-8 z-50">
        <img
          src="/logo.png"
          alt="HitRumble Logo"
          className="h-24 w-auto"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-30">
        <div className="mb-6 text-center">
          <p className="text-fg text-xl">
            Game Code: <span className="font-mono font-black text-2xl">{gameState.id}</span>
          </p>
        </div>

        <GameControl
          currentSong={gameState.currentSong}
          roundNumber={gameState.roundNumber}
          players={gameState.players}
          phase={gameState.phase}
          onNextRound={handleNextRound}
          spotifyConnected={spotifyConnected}
          isDJPlaying={isDJPlaying}
          results={results}
        />

      </div>
    </div>
  );
}
