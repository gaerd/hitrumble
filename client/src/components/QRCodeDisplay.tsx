import { QRCodeSVG } from 'qrcode.react';
import { Users, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Player } from '@shared/types';

interface QRCodeDisplayProps {
  gameCode: string;
  playerCount: number;
  players: Player[];
  onStartGame?: () => void;
}

export default function QRCodeDisplay({ gameCode, playerCount, players, onStartGame }: QRCodeDisplayProps) {
  const joinUrl = `${window.location.origin}/join/${gameCode}`;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden bg-bg"
    >
      {/* HitRumble Logo - Upper Left */}
      <div className="absolute top-8 left-8 z-20">
        <img
          src="/logo.png"
          alt="HitRumble Logo"
          className="h-24 w-auto"
        />
      </div>

      <div className="w-full max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT COLUMN: QR code and Start button */}
          <Card className="hr-card p-10 text-center shadow-glow">
            <div className="inline-block p-8 bg-white rounded-3xl shadow-2xl mb-8">
              <QRCodeSVG
                value={joinUrl}
                size={320}
                level="H"
                includeMargin={true}
              />
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-xl text-fg-2 font-bold mb-3">Game Code</p>
                <Badge className="text-6xl font-mono font-black px-12 py-4 bg-highlight text-bg-surface border-2 border-fg/20 shadow-glow">
                  {gameCode}
                </Badge>
              </div>

              <div className="pt-4">
                <button
                  className="hr-btn hr-btn--primary w-full text-2xl py-8 font-black shadow-glow"
                  onClick={onStartGame}
                  disabled={playerCount === 0}
                  data-testid="button-start-game"
                >
                  Start Game
                </button>
              </div>

              <p className="text-base text-fg-muted font-medium mt-4">
                Or go to {window.location.origin} and enter the code
              </p>
            </div>
          </Card>

          {/* RIGHT COLUMN: Player list */}
          <Card className="hr-card p-10 shadow-hr">
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {players.length === 0 ? (
                <div className="text-center py-16">
                  <User className="w-20 h-20 text-fg-muted mx-auto mb-4" />
                  <p className="text-2xl text-fg-2 font-bold">
                    Waiting for players...
                  </p>
                  <p className="text-lg text-fg-muted mt-2">
                    Scan the QR code to join
                  </p>
                </div>
              ) : (
                players.map((player, index) => (
                  <div
                    key={player.id}
                    className="flex items-center gap-4 p-4 bg-bg-surface rounded-hrmd border border-fg/10 hover-elevate"
                  >
                    {/* Profilbild eller avatar */}
                    <div className="relative flex-shrink-0">
                      {player.profileImage ? (
                        <img
                          src={player.profileImage}
                          alt={player.name}
                          className="w-16 h-16 rounded-full border-2 border-accent shadow-hr object-cover"
                        />
                      ) : (
                        <div
                          className="w-16 h-16 rounded-full border-2 border-accent shadow-hr flex items-center justify-center text-2xl font-black text-white"
                          style={{ backgroundColor: player.avatarColor || 'hsl(var(--hr-accent-2))' }}
                        >
                          {player.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      {!player.connected && (
                        <div className="absolute inset-0 bg-bg/70 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-warning">!</span>
                        </div>
                      )}
                    </div>

                    {/* Player info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-black text-fg truncate">
                        {player.name}
                      </h3>
                      {player.artistName && (
                        <p className="text-sm text-fg-2 font-medium truncate">
                          {player.artistName}
                        </p>
                      )}
                    </div>

                    {/* Position badge */}
                    <Badge className="text-lg font-mono font-black px-4 py-2 bg-highlight text-bg-surface border border-fg/20 flex-shrink-0">
                      #{index + 1}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
