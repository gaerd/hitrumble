import { Trophy, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ScoreDisplayProps {
  playerName: string;
  score: number;
  targetScore?: number;
  timelineLength: number;
}

export default function ScoreDisplay({ playerName, score, targetScore = 10, timelineLength }: ScoreDisplayProps) {
  const progress = (score / targetScore) * 100;

  return (
    <Card className="p-6 bg-black border-4 border-white shadow-2xl">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-black mb-1 text-white" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>{playerName}</h3>
        <p className="text-sm text-white/60 font-bold">Din poäng</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline justify-center gap-2 mb-2">
          <span className="text-6xl font-mono font-black text-white" data-testid="text-score">{score}</span>
          <span className="text-3xl text-white/60 font-mono">/ {targetScore}</span>
        </div>
        <Progress value={progress} className="h-3 bg-white/20" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 rounded-2xl bg-white/10 border-2 border-white/20">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-red-500" />
            <span className="text-sm text-white/70 font-bold">Korrekta</span>
          </div>
          <p className="text-3xl font-mono font-black text-white">{score}</p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-white/10 border-2 border-white/20">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Target className="w-4 h-4 text-red-500" />
            <span className="text-sm text-white/70 font-bold">Tidslinje</span>
          </div>
          <p className="text-3xl font-mono font-black text-white">{timelineLength}</p>
        </div>
      </div>
    </Card>
  );
}
