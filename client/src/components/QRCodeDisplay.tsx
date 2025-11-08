import { QRCodeSVG } from 'qrcode.react';
import { Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface QRCodeDisplayProps {
  gameCode: string;
  playerCount: number;
  onStartGame?: () => void;
}

export default function QRCodeDisplay({ gameCode, playerCount, onStartGame }: QRCodeDisplayProps) {
  const joinUrl = `${window.location.origin}/join/${gameCode}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Väntar på Spelare</h1>
          <p className="text-xl text-muted-foreground">Skanna QR-koden för att gå med</p>
        </div>

        <Card className="p-12 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-mono font-bold text-lg" data-testid="text-player-count">
                {playerCount} spelare anslutna
              </span>
            </div>
          </div>

          <div className="inline-block p-8 bg-white rounded-3xl shadow-2xl mb-8">
            <QRCodeSVG
              value={joinUrl}
              size={300}
              level="H"
              includeMargin={true}
            />
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Spelkod</p>
              <Badge variant="secondary" className="text-5xl font-mono font-black px-8 py-3">
                {gameCode}
              </Badge>
            </div>

            <div className="pt-4">
              <Button
                size="lg"
                className="w-full text-xl"
                onClick={onStartGame}
                disabled={playerCount === 0}
                data-testid="button-start-game"
              >
                Starta Spel ({playerCount} spelare)
              </Button>
            </div>
          </div>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Spelare kan också gå till {window.location.origin} och ange koden manuellt
        </p>
      </div>
    </div>
  );
}
