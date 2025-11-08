import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Timeline from '@/components/Timeline';
import CardPlacement from '@/components/CardPlacement';
import ScoreDisplay from '@/components/ScoreDisplay';
import type { Song } from '@/types/game.types';

type PlayerPhase = 'join' | 'waiting' | 'playing';

export default function PlayerPage() {
  const [phase, setPhase] = useState<PlayerPhase>('join');
  const [playerName, setPlayerName] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  const timeline: Song[] = [
    { id: '1', title: 'Bohemian Rhapsody', artist: 'Queen', year: 1975, albumCover: 'https://picsum.photos/seed/queen/400/400' },
    { id: '2', title: 'Billie Jean', artist: 'Michael Jackson', year: 1983, albumCover: 'https://picsum.photos/seed/mj/400/400' },
    { id: '3', title: 'Smells Like Teen Spirit', artist: 'Nirvana', year: 1991, albumCover: 'https://picsum.photos/seed/nirvana/400/400' },
  ];

  const currentSong: Song = {
    id: '4',
    title: 'Purple Rain',
    artist: 'Prince',
    year: 1984,
    albumCover: 'https://picsum.photos/seed/prince/400/400'
  };

  const handleJoin = () => {
    if (playerName && gameCode) {
      setPhase('playing');
    }
  };

  if (phase === 'join') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">Gå Med i Spel</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Ditt Namn</label>
              <Input
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Ange ditt namn"
                className="text-lg"
                data-testid="input-player-name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Spelkod</label>
              <Input
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value)}
                placeholder="Ange spelkod"
                className="text-lg font-mono"
                data-testid="input-game-code"
              />
            </div>
            <Button
              size="lg"
              className="w-full"
              onClick={handleJoin}
              disabled={!playerName || !gameCode}
              data-testid="button-join"
            >
              Gå Med
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-80">
      <div className="p-6">
        <ScoreDisplay
          playerName={playerName || 'Spelare'}
          score={3}
          timelineLength={timeline.length}
        />
      </div>

      <Timeline
        timeline={timeline}
        startYear={1980}
        highlightPosition={selectedPosition ?? undefined}
        onPlaceCard={setSelectedPosition}
      />

      <CardPlacement
        song={currentSong}
        selectedPosition={selectedPosition}
        onConfirm={() => {
          console.log('Confirmed placement at', selectedPosition);
          setSelectedPosition(null);
        }}
      />
    </div>
  );
}
