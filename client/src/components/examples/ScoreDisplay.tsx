import ScoreDisplay from '../ScoreDisplay'

export default function ScoreDisplayExample() {
  return (
    <div className="min-h-screen bg-background p-6 flex items-center justify-center">
      <div className="max-w-md w-full">
        <ScoreDisplay
          playerName="Anna"
          score={7}
          targetScore={10}
          timelineLength={8}
        />
      </div>
    </div>
  )
}
