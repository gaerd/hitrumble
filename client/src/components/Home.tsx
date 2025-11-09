import { useState, useEffect } from "react";
import { Users, Sparkles, Music, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import logoUrl from "@assets/hitster logo_1762695517073.png";

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
    <div className="min-h-screen bg-red-600 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Diagonal black speaker element inspired by the image */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent via-transparent to-black/80 transform rotate-12 scale-150"></div>
      </div>
      {/* Animated glow effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="w-full max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8 transform hover:scale-105 transition-transform duration-300">
            <img
              src={logoUrl}
              alt="HITSTER AI Logo"
              className="w-96 h-auto drop-shadow-2xl"
              data-testid="img-logo"
            />
          </div>
          <p className="text-3xl text-white/90 font-bold tracking-wide">
            🎵 Musikspelet med AI-driven musikval 🎵
          </p>
        </div>

        {!isCheckingSpotify && !spotifyConnected && (
          <Alert className="mb-10 bg-black/70 border-4 border-yellow-400 backdrop-blur-sm shadow-2xl" data-testid="alert-spotify-required">
            <Music className="h-8 w-8 text-yellow-400" />
            <AlertDescription className="text-xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-black text-white text-2xl">
                  🎧 Spotify Premium krävs för att spela HITSTER AI
                </span>
                <Button
                  onClick={handleConnectSpotify}
                  disabled={isConnectingSpotify}
                  className="gap-2 whitespace-nowrap text-xl px-8 py-7 bg-green-600 hover:bg-green-500 text-white font-black shadow-2xl transform hover:scale-110 transition-all border-2 border-white"
                  data-testid="button-connect-spotify-home"
                >
                  {isConnectingSpotify ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Ansluter...
                    </>
                  ) : (
                    <>
                      <Music className="w-6 h-6" />
                      Anslut Spotify Premium
                    </>
                  )}
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {spotifyConnected && (
          <Alert className="mb-10 bg-black/70 border-4 border-green-400 backdrop-blur-sm shadow-2xl" data-testid="alert-spotify-connected">
            <CheckCircle2 className="h-8 w-8 text-green-400" />
            <AlertDescription className="text-2xl font-black text-white">
              ✓ Spotify Premium är ansluten!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <Card
            className={`p-14 bg-black/80 backdrop-blur-md border-4 border-white shadow-2xl ${
              spotifyConnected ? 'hover:scale-105 hover:border-yellow-400 cursor-pointer transform transition-all duration-300' : 'opacity-50 cursor-not-allowed'
            }`}
            data-testid="card-master"
            onClick={handleSelectMaster}
          >
            <div className="flex flex-col items-center text-center space-y-7">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl animate-pulse border-4 border-white">
                <Sparkles className="w-14 h-14 text-black" />
              </div>
              <div>
                <h2 className="text-5xl font-black mb-4 text-white drop-shadow-2xl">Starta Spel</h2>
                <p className="text-white text-xl font-bold">
                  🎮 Bli spelledare och styra musiken med AI
                </p>
              </div>
              <Button
                size="lg"
                className="w-full text-2xl py-8 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-black shadow-2xl transform hover:scale-110 transition-all border-4 border-white"
                disabled={!spotifyConnected}
                data-testid="button-start-master"
              >
                {spotifyConnected ? '🚀 Skapa Spelrum' : 'Kräver Spotify Premium'}
              </Button>
            </div>
          </Card>

          <Card className="p-14 bg-black/80 backdrop-blur-md border-4 border-white shadow-2xl hover:scale-105 hover:border-yellow-400 cursor-pointer transform transition-all duration-300" data-testid="card-player" onClick={onSelectPlayer}>
            <div className="flex flex-col items-center text-center space-y-7">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl animate-pulse border-4 border-white" style={{ animationDelay: '0.5s' }}>
                <Users className="w-14 h-14 text-black" />
              </div>
              <div>
                <h2 className="text-5xl font-black mb-4 text-white drop-shadow-2xl">Gå Med</h2>
                <p className="text-white text-xl font-bold">
                  👥 Anslut till ett spel och tävla med andra
                </p>
              </div>
              <Button size="lg" className="w-full text-2xl py-8 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-black shadow-2xl transform hover:scale-110 transition-all border-4 border-white" data-testid="button-join-player">
                📱 Skanna QR-kod
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-2xl text-white/80 font-bold drop-shadow-lg">
            🏆 Först till 10 korrekta placeringar vinner! 🏆
          </p>
        </div>
      </div>
    </div>
  );
}
