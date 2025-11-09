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
    <div className="min-h-screen bg-red-600 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Diagonal black speaker element */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-black/80 transform rotate-12 scale-150"></div>
      </div>
      {/* Animated glow effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-400 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-3xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black mb-4 text-white drop-shadow-2xl">Väntar på Spelare</h1>
          <p className="text-3xl text-white/90 font-bold">📱 Skanna QR-koden för att gå med</p>
        </div>

        <Card className="p-16 text-center bg-black/80 backdrop-blur-md border-4 border-white shadow-2xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 border-4 border-white mb-8 shadow-xl">
              <Users className="w-8 h-8 text-black animate-pulse" />
              <span className="font-mono font-black text-3xl text-black" data-testid="text-player-count">
                {playerCount} spelare anslutna
              </span>
            </div>
          </div>

          <div className="inline-block p-10 bg-white rounded-3xl shadow-2xl mb-10 transform hover:scale-105 transition-transform duration-300">
            <QRCodeSVG
              value={joinUrl}
              size={320}
              level="H"
              includeMargin={true}
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xl text-white/80 font-bold mb-3">Spelkod</p>
              <Badge className="text-6xl font-mono font-black px-12 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-4 border-white shadow-2xl">
                {gameCode}
              </Badge>
            </div>

            <div className="pt-6">
              <Button
                size="lg"
                className="w-full text-2xl py-8 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-black shadow-2xl transform hover:scale-105 transition-all border-4 border-white"
                onClick={onStartGame}
                disabled={playerCount === 0}
                data-testid="button-start-game"
              >
                🚀 Starta Spel ({playerCount} spelare)
              </Button>
            </div>
          </div>
        </Card>

        <p className="text-center text-xl text-white/70 font-semibold mt-8 drop-shadow-lg">
          💻 Spelare kan också gå till {window.location.origin} och ange koden manuellt
        </p>
      </div>
    </div>
  );
}
