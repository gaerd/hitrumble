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
    <Card className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-1">{playerName}</h3>
        <p className="text-sm text-muted-foreground">Din poäng</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline justify-center gap-2 mb-2">
          <span className="text-6xl font-mono font-black" data-testid="text-score">{score}</span>
          <span className="text-3xl text-muted-foreground font-mono">/ {targetScore}</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 rounded-xl bg-muted/50">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Korrekta</span>
          </div>
          <p className="text-2xl font-mono font-bold">{score}</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-muted/50">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Tidslinje</span>
          </div>
          <p className="text-2xl font-mono font-bold">{timelineLength}</p>
        </div>
      </div>
    </Card>
  );
}
