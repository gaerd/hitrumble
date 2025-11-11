import { useState, useEffect } from "react";
import { Users, Sparkles, Music, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface HomeProps {
  onSelectMaster?: () => void;
  onSelectPlayer?: () => void;
}

export default function Home({ onSelectMaster, onSelectPlayer }: HomeProps) {
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [isCheckingSpotify, setIsCheckingSpotify] = useState(true);
  const [isConnectingSpotify, setIsConnectingSpotify] = useState(false);

  useEffect(() => {
    fetch('/api/spotify/status')
      .then(res => res.json())
      .then(data => {
        setSpotifyConnected(data.connected);
        setIsCheckingSpotify(false);
      })
      .catch(() => {
        setIsCheckingSpotify(false);
      });
  }, []);

  const handleConnectSpotify = () => {
    setIsConnectingSpotify(true);
    window.location.href = '/auth/spotify';
  };

  const handleSelectMaster = () => {
    if (spotifyConnected && onSelectMaster) {
      onSelectMaster();
    }
  };

  return (
    <div
      className="min-h-screen flex items-start justify-start p-8 relative overflow-hidden bg-bg"
    >

      {/* HitRumble Logo - Upper Left - Extra Large */}
      <div className="absolute top-12 left-12 z-20">
        <img
          src="/logo.png"
          alt="HitRumble Logo"
          className="h-48 w-auto"
          data-testid="img-logo"
        />
      </div>

      {/* HITRUMBLE START: Spotify Button with new theme */}
      <div className="absolute top-8 right-8 z-20">
        {!isCheckingSpotify && !spotifyConnected && (
          <Button
            onClick={handleConnectSpotify}
            disabled={isConnectingSpotify}
            className="gap-2 text-xs px-3 py-2 bg-bg-surface/90 hover:bg-bg-surface text-fg font-medium shadow-glow border border-fg/20 rounded-hrmd"
            data-testid="button-connect-spotify-home"
          >
            {isConnectingSpotify ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Music className="w-3 h-3 text-accent" />
            )}
            Connect Spotify
          </Button>
        )}

        {spotifyConnected && (
          <Button
            disabled
            className="gap-2 text-xs px-3 py-2 bg-bg-surface/90 text-fg font-medium shadow-hr border border-success/40 cursor-default rounded-hrmd"
            data-testid="button-spotify-connected"
          >
            <CheckCircle2 className="w-3 h-3 text-success" />
            Connected to Spotify
          </Button>
        )}
      </div>
      {/* HITRUMBLE END */}

      {/* HITRUMBLE START: CTA Buttons with gradient & neon theme */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-6">
        <button
          className={`hr-btn hr-btn--primary text-4xl py-10 px-16 font-black uppercase tracking-wider transition-all duration-200 ${
            spotifyConnected
              ? 'cursor-pointer hover:scale-105 animate-pulseGlow'
              : 'opacity-40 cursor-not-allowed'
          }`}
          disabled={!spotifyConnected}
          onClick={handleSelectMaster}
          data-testid="button-start-master"
        >
          Start Game
        </button>

        <button
          className="hr-btn hr-btn--primary text-4xl py-10 px-16 font-black uppercase tracking-wider transition-all duration-200 cursor-pointer hover:scale-105"
          onClick={onSelectPlayer}
          data-testid="button-join-player"
        >
          Join Game
        </button>
      </div>
      {/* HITRUMBLE END */}
    </div>
  );
}
