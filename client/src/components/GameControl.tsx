import { useEffect } from 'react';
import { Play, SkipForward, Trophy, Disc3, AlertCircle, Radio, WifiOff, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSpotifyPlayer } from '@/hooks/useSpotifyPlayer';
import MusicEqualizer from './MusicEqualizer';
import type { Player, Song, RoundResult } from '@/types/game.types';

interface GameControlProps {
  currentSong: Song | null;
  roundNumber: number;
  players: Player[];
  onNextRound?: () => void;
  phase: 'playing' | 'reveal' | 'finished';
  spotifyConnected?: boolean;
  isDJPlaying?: boolean;
  results?: RoundResult[];
}

export default function GameControl({ currentSong, roundNumber, players, onNextRound, phase, isDJPlaying = false, results = [] }: GameControlProps) {
  const spotify = useSpotifyPlayer();

  useEffect(() => {
    if (isDJPlaying && spotify.isPlaying) {
      spotify.pausePlayback();
      return;
    }

    if (phase !== 'playing' || !currentSong) {
      if (spotify.isPlaying) {
        spotify.pausePlayback();
      }
      return;
    }

    if (spotify.isConnected && spotify.isReady && currentSong.id && !spotify.isPlaying && !isDJPlaying) {
      const trackUri = `spotify:track:${currentSong.id}`;
      spotify.playTrack(trackUri);
    }
  }, [currentSong, phase, spotify.isConnected, spotify.isReady, isDJPlaying]);

  const togglePlayback = () => {
    if (!spotify.isConnected || !spotify.isReady) return;

    if (spotify.isPlaying) {
      spotify.pausePlayback();
    } else if (currentSong) {
      spotify.playTrack(`spotify:track:${currentSong.id}`);
    }
  };

  /* HITRUMBLE START: Game control with neon theme */
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
      {/* LEFT COLUMN: Players */}
      <Card className="hr-card p-8 h-fit shadow-glow">
        <div className="space-y-4">
          {players
            .sort((a, b) => b.score - a.score)
            .map((player, idx) => (
              <div
                key={player.id}
                className={`flex items-center justify-between p-4 rounded-hrlg border-2 ${
                  idx === 0 ? 'border-accent bg-accent/10 shadow-glow' : 'border-fg/10 bg-fg/5'
                } ${!player.connected ? 'opacity-60' : ''} hover-elevate transition-colors`}
                data-testid={`player-score-${idx}`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {player.profileImage ? (
                    <div className="relative flex-shrink-0">
                      <img
                        src={player.profileImage}
                        alt={player.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-accent shadow-hr"
                        style={{ backgroundColor: player.avatarColor || 'hsl(var(--hr-accent-2))' }}
                      />
                      {idx === 0 && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold border-2 border-bg shadow-glow">
                          1
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 text-xl border-2 shadow-hr ${
                        idx === 0 ? 'border-accent shadow-glow' : 'border-fg/30'
                      }`}
                      style={{ backgroundColor: player.avatarColor || 'hsl(var(--hr-accent-2))' }}
                    >
                      {player.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-black text-xl truncate text-fg">{player.name}</span>
                    {player.artistName && (
                      <span className="text-sm text-fg-2 italic truncate">
                        "{player.artistName}"
                      </span>
                    )}
                    <div className="flex gap-2 mt-1">
                      {!player.connected && (
                        <Badge variant="destructive" className="text-xs flex items-center gap-1 bg-danger/20 text-danger border-danger/40">
                          <WifiOff className="w-3 h-3" />
                          Disconnected
                        </Badge>
                      )}
                      {player.connected && player.isReady && (
                        <Badge className="hr-tag text-sm bg-success/20 text-success border-success/40 font-black px-3 py-1">✓ Ready</Badge>
                      )}
                      {player.connected && !player.isReady && (
                        <Badge className="hr-tag text-sm bg-warning/20 text-warning border-warning/40 font-black px-3 py-1">Waiting...</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-4xl font-mono font-black flex-shrink-0 ml-2 text-fg">
                  {player.score}
                </div>
              </div>
            ))}
        </div>
      </Card>

      {/* RIGHT COLUMN: Game card and controls */}
      <div className="space-y-6">
        <Card className="hr-card p-8 shadow-glow">
          <div className="flex items-center justify-end mb-6">
            <Badge className="hr-tag text-2xl font-mono font-black px-8 py-4 bg-accent/20 text-accent border-accent/40 shadow-glow">
              {players.filter(p => p.connected && p.isReady).length}/{players.filter(p => p.connected).length} ready
            </Badge>
          </div>

        {currentSong && (
          <div className="bg-bg-surface/80 border-2 border-accent/30 rounded-hrlg p-10 mb-6 shadow-glow">
            {isDJPlaying ? (
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center py-6 relative">
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 scale-150">
                    <MusicEqualizer isPlaying={true} barCount={15} color="hsl(var(--hr-accent))" />
                  </div>
                  <Radio className="w-20 h-20 text-accent mb-4 animate-pulse relative z-10" />
                  <p className="text-4xl font-black text-accent mb-2 relative z-10 font-display">DJ ON AIR</p>
                </div>
                <div className="flex items-center gap-6 bg-fg/5 rounded-hrlg p-6 border-2 border-fg/10 shadow-hr">
                  {currentSong.albumCover && (
                    <img
                      src={currentSong.albumCover}
                      alt={currentSong.title}
                      className="w-32 h-32 rounded-hrlg shadow-hr border-2 border-accent"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-fg mb-2">{currentSong.title}</h3>
                    <p className="text-xl text-fg-2 mb-3">{currentSong.artist}</p>
                    <div className="flex items-center gap-4">
                      <Badge className="hr-tag text-2xl font-mono font-black px-6 py-2 bg-accent/20 text-accent border-accent/40 shadow-glow">
                        {currentSong.year}
                      </Badge>
                      {results.length > 0 && (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-6 h-6 text-success" />
                          <span className="text-xl font-black text-fg">
                            {results.filter(r => r.correct).length}/{results.length} correct
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : phase === 'playing' ? (
              <div className="relative overflow-hidden">
                {spotify.isPlaying && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/10 to-accent/10 animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-64 h-64 bg-accent/10 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 bg-accent/10 rounded-full animate-ping" style={{ animationDuration: '1.5s', animationDelay: '0.3s' }} />
                    </div>
                  </>
                )}
                <div className="relative flex flex-col items-center justify-center py-12">
                  <div className={`text-9xl font-bold mb-6 font-display ${spotify.isPlaying ? 'text-accent animate-pulse' : 'text-accent/50'}`}>?</div>
                  {spotify.isConnected && spotify.isReady ? (
                    <>
                      <div className="mb-6 scale-150">
                        <MusicEqualizer isPlaying={spotify.isPlaying} barCount={7} color="hsl(var(--hr-accent))" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <AlertCircle className="w-8 h-8 text-fg-muted" />
                        <p className="text-2xl font-bold text-fg">
                          Connect Spotify to play music
                        </p>
                      </div>
                      <p className="text-lg text-fg-muted">
                        Click "Connect Spotify Premium" at the top
                      </p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                {currentSong.albumCover && (
                  <img
                    src={currentSong.albumCover}
                    alt={currentSong.title}
                    className="w-32 h-32 rounded-hrlg shadow-hr border-2 border-accent"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-fg mb-2">{currentSong.title}</h3>
                  <p className="text-xl text-fg-2 mb-3">{currentSong.artist}</p>
                  <Badge className="hr-tag text-2xl font-mono font-black px-6 py-2 bg-accent/20 text-accent border-accent/40 shadow-glow">
                    {currentSong.year}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        )}

        </Card>
      </div>
    </div>
  );
  /* HITRUMBLE END */
}
