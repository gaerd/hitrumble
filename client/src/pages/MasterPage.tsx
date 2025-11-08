import { useState } from 'react';
import AIChat from '@/components/AIChat';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import GameControl from '@/components/GameControl';
import RevealScreen from '@/components/RevealScreen';
import WinnerScreen from '@/components/WinnerScreen';
import type { Player, Song } from '@/types/game.types';

type Phase = 'setup' | 'lobby' | 'playing' | 'reveal' | 'finished';

export default function MasterPage() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [gameCode] = useState('ABC123');
  const [roundNumber, setRoundNumber] = useState(1);
  
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Anna', score: 7, isReady: false, timeline: [], startYear: 1985 },
    { id: '2', name: 'Erik', score: 5, isReady: true, timeline: [], startYear: 1992 },
    { id: '3', name: 'Sofia', score: 6, isReady: true, timeline: [], startYear: 1978 },
  ]);

  const currentSong: Song = {
    id: '1',
    title: 'Dancing Queen',
    artist: 'ABBA',
    year: 1976,
    albumCover: 'https://picsum.photos/seed/abba/400/400'
  };

  const handlePreferencesConfirmed = () => {
    setPhase('lobby');
  };

  const handleStartGame = () => {
    setPhase('playing');
  };

  const handleNextRound = () => {
    if (phase === 'playing') {
      setPhase('reveal');
    } else if (phase === 'reveal') {
      if (roundNumber >= 10) {
        setPhase('finished');
      } else {
        setRoundNumber(prev => prev + 1);
        setPlayers(prev => prev.map(p => ({ ...p, isReady: false })));
        setPhase('playing');
      }
    }
  };

  if (phase === 'setup') {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <AIChat onPreferencesConfirmed={handlePreferencesConfirmed} />
      </div>
    );
  }

  if (phase === 'lobby') {
    return (
      <QRCodeDisplay
        gameCode={gameCode}
        playerCount={players.length}
        onStartGame={handleStartGame}
      />
    );
  }

  if (phase === 'finished') {
    const winner = players.reduce((prev, current) => 
      current.score > prev.score ? current : prev
    );
    return (
      <WinnerScreen
        winner={winner}
        allPlayers={players}
        onNewGame={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold mb-2">HITSTER AI</h1>
          <p className="text-muted-foreground">Spelkod: <span className="font-mono font-bold">{gameCode}</span></p>
        </div>

        <GameControl
          currentSong={currentSong}
          roundNumber={roundNumber}
          players={players}
          phase={phase}
          onNextRound={handleNextRound}
        />

        {phase === 'reveal' && (
          <RevealScreen
            song={currentSong}
            results={players.map(p => ({
              playerName: p.name,
              correct: Math.random() > 0.3,
              placedAt: Math.floor(Math.random() * 5)
            }))}
            onContinue={handleNextRound}
          />
        )}
      </div>
    </div>
  );
}
