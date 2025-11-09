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
      className="min-h-screen flex items-start justify-start p-8 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url(/fltman_red_abackground_black_illustrated_speakers_low_angle_pe_3c6fccde-fd77-41bb-a28a-528037b87b37_0.png)' }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      {/* BeatBrawl Logo - Upper Left - Much Larger */}
      <div className="absolute top-12 left-12 z-20">
        <img
          src="/beatbrawl.png"
          alt="BeatBrawl Logo"
          className="h-32 w-auto"
          data-testid="img-logo"
        />
      </div>

      {/* Spotify Button - Upper Right */}
      <div className="absolute top-12 right-12 z-20">
        {!isCheckingSpotify && !spotifyConnected && (
          <Button
            onClick={handleConnectSpotify}
            disabled={isConnectingSpotify}
            className="gap-3 text-lg px-6 py-6 bg-black/80 hover:bg-black text-white font-bold shadow-xl border-2 border-white"
            data-testid="button-connect-spotify-home"
          >
            {isConnectingSpotify ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Music className="w-5 h-5 text-red-500" />
            )}
            Anslut till Spotify
          </Button>
        )}

        {spotifyConnected && (
          <Button
            disabled
            className="gap-3 text-lg px-6 py-6 bg-black/80 text-white font-bold shadow-xl border-2 border-white cursor-default"
            data-testid="button-spotify-connected"
          >
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            Ansluten till Spotify
          </Button>
        )}
      </div>

      {/* Two Buttons - Left Side in Red Area */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-6">
        <Button
          size="lg"
          className={`text-2xl py-8 px-12 bg-yellow-400 hover:bg-yellow-300 text-black font-black shadow-2xl ${
            spotifyConnected ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed'
          }`}
          disabled={!spotifyConnected}
          onClick={handleSelectMaster}
          data-testid="button-start-master"
        >
          Starta Spel
        </Button>

        <Button
          size="lg"
          className="text-2xl py-8 px-12 bg-orange-500 hover:bg-orange-400 text-white font-black shadow-2xl"
          onClick={onSelectPlayer}
          data-testid="button-join-player"
        >
          Gå Med i Spel
        </Button>
      </div>
    </div>
  );
}
