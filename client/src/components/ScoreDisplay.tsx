import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ScoreDisplayProps {
  score: number;
  targetScore?: number;
  profileImage?: string;
  artistName?: string;
  avatarColor?: string;
}

export default function ScoreDisplay({ score, targetScore = 10, profileImage, artistName, avatarColor }: ScoreDisplayProps) {
  const progress = (score / targetScore) * 100;

  return (
    <Card className="hr-card p-6 shadow-glow">
      <div className="flex items-center gap-4 mb-6">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-accent object-cover shadow-hr"
          />
        ) : (
          <div
            className="w-20 h-20 rounded-full border-2 border-accent flex items-center justify-center text-3xl font-black text-white shadow-hr"
            style={{ backgroundColor: avatarColor || 'hsl(var(--hr-accent))' }}
          >
            {artistName?.[0] || '?'}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-2xl font-black text-fg font-display">
            {artistName || 'Spelare'}
          </h3>
          <p className="text-sm text-fg-2 font-bold">Artist</p>
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-center gap-2 mb-2">
          <span className="text-6xl font-mono font-black text-fg" data-testid="text-score">{score}</span>
          <span className="text-3xl text-fg-muted font-mono">/ {targetScore}</span>
        </div>
        <Progress value={progress} className="h-3 bg-bg-surface" />
      </div>
    </Card>
  );
}
