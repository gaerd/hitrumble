import { CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Song } from '@/types/game.types';

interface PlayerResult {
  playerName: string;
  correct: boolean;
  placedAt: number;
}

interface RevealScreenProps {
  song: Song;
  results: PlayerResult[];
  onContinue?: () => void;
}

/* HITRUMBLE START: Reveal screen with neon theme */
export default function RevealScreen({ song, results, onContinue }: RevealScreenProps) {
  return (
    <div className="fixed inset-0 bg-bg/98 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-fg font-display">Rundresultat</h2>
        </div>

        <Card className="hr-card p-8 mb-6 shadow-glow">
          <div className="flex items-center gap-6 mb-6">
            {song.albumCover && (
              <img
                src={song.albumCover}
                alt={song.title}
                className="w-32 h-32 rounded-hrlg shadow-hr border-2 border-accent"
              />
            )}
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-2 text-fg">{song.title}</h3>
              <p className="text-xl text-fg-2 mb-3">{song.artist}</p>
              <Badge className="hr-tag text-3xl font-mono font-black px-6 py-2 bg-accent/20 text-accent border-accent/40">
                {song.year}
              </Badge>
            </div>
          </div>
        </Card>

        <Card className="hr-card p-6 mb-6 shadow-hr">
          <h3 className="text-xl font-bold mb-4 text-fg">Spelarresultat</h3>
          <div className="space-y-3">
            {results.map((result, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-4 rounded-hrlg border-2 ${
                  result.correct ? 'bg-success/10 border-success/30' : 'bg-danger/10 border-danger/30'
                }`}
                data-testid={`result-${idx}`}
              >
                <div className="flex items-center gap-3">
                  {result.correct ? (
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  ) : (
                    <XCircle className="w-6 h-6 text-danger" />
                  )}
                  <span className="font-semibold text-lg text-fg">{result.playerName}</span>
                </div>
                <Badge className={`hr-tag text-sm ${result.correct ? 'bg-success/20 text-success border-success/40' : 'bg-danger/20 text-danger border-danger/40'}`}>
                  {result.correct ? 'Correct!' : 'Wrong placement'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <button
          className="hr-btn hr-btn--primary w-full text-xl py-6"
          onClick={onContinue}
          data-testid="button-continue"
        >
          Fortsätt
        </button>
      </div>
    </div>
  );
}
/* HITRUMBLE END */
