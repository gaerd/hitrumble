import { useState, useEffect } from "react";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: 'user' | 'ai';
  content: string;
}

interface Song {
  title: string;
  artist: string;
  year: number;
}

interface StartYearRange {
  min: number;
  max: number;
}

interface AIChatProps {
  onPreferencesConfirmed?: (preferences: string) => void;
}

const loadingMessages = [
  "Finding immortal tracks!",
  "Feeling the vibe and digging through the records",
  "Mixing the perfect playlist",
  "Dropping beats from every decade",
  "Tracking down the classics",
  "Let AI choose the bangers"
];

export default function AIChat({ onPreferencesConfirmed }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Hey! I\'m your AI game master. Tell me what kind of music you want to play with today. For example "80s rock" or "Swedish pop from the 90s"!' }
  ]);
  const [input, setInput] = useState('');
  const [lastPreference, setLastPreference] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [generatedSongs, setGeneratedSongs] = useState<Song[]>([]);
  const [startYearRange, setStartYearRange] = useState<StartYearRange | null>(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  // Rotate loading messages
  useEffect(() => {
    if (isConfirming) {
      const interval = setInterval(() => {
        setLoadingMessageIndex(prev => (prev + 1) % loadingMessages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isConfirming]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;
    
    const userInput = input.trim();
    const userMessage: Message = { role: 'user', content: userInput };
    setMessages(prev => [...prev, userMessage]);
    setLastPreference(userInput);
    setInput('');
    setIsThinking(true);
    
    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.role === 'ai' ? 'assistant' : 'user',
        content: msg.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userInput,
          conversationHistory
        })
      });

      if (!response.ok) {
        throw new Error('Chat request failed');
      }

      const data = await response.json();
      const aiMessage: Message = { 
        role: 'ai', 
        content: data.response
      };
      setMessages(prev => [...prev, aiMessage]);
      
      // Save songs if AI generated any
      if (data.songs && data.songs.length > 0) {
        setGeneratedSongs(data.songs);
        console.log(`AI generated ${data.songs.length} songs`);
      }
      
      // Save start year range if provided
      if (data.startYearRange) {
        setStartYearRange(data.startYearRange);
        console.log(`AI suggested start year range: ${data.startYearRange.min}-${data.startYearRange.max}`);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const fallbackMessage: Message = { 
        role: 'ai', 
        content: `Perfect! I've prepared ${userInput} for you. Click "Confirm & Continue" to begin!` 
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  // HITRUMBLE START: Loading overlay with gradient theme
  if (isConfirming) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: 'url(/fltman_red_abackground_black_illustrated_speakers_low_angle_pe_3c6fccde-fd77-41bb-a28a-528037b87b37_0.png)' }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: 'hsl(var(--hr-scrim) / 0.6)' }}></div>
        <div className="absolute top-12 left-12 z-20">
          <img src="/beatbrawl.png" alt="BeatBrawl Logo" className="h-48 w-auto" />
        </div>

        <div className="relative z-30 text-center">
          <div className="hr-card p-12 shadow-glow mb-8 max-w-2xl bg-hr-cta">
            <p className="text-4xl font-black text-white uppercase tracking-wider font-display">
              {loadingMessages[loadingMessageIndex]}
            </p>
          </div>
          <Loader2 className="w-16 h-16 animate-spin text-accent mx-auto" />
        </div>
      </div>
    );
  }
  // HITRUMBLE END

  /* HITRUMBLE START: Chat interface with neon theme */
  return (
    <div
      className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: 'url(/fltman_red_abackground_black_illustrated_speakers_low_angle_pe_3c6fccde-fd77-41bb-a28a-528037b87b37_0.png)' }}
    >
      <div className="absolute inset-0" style={{ backgroundColor: 'hsl(var(--hr-scrim) / 0.6)' }}></div>

      <div className="absolute top-12 left-12 z-20">
        <img
          src="/beatbrawl.png"
          alt="BeatBrawl Logo"
          className="h-48 w-auto"
        />
      </div>

      <div className="w-full max-w-4xl relative z-30 flex flex-col h-[80vh]">
        <div className="flex-1 overflow-auto mb-6 space-y-4 px-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] p-5 rounded-hrlg shadow-hr border-2 ${
                  msg.role === 'user'
                    ? 'bg-accent-highlight text-bg font-black border-accent-highlight'
                    : 'bg-bg-surface/95 text-fg border-fg/20'
                }`}
                data-testid={`message-${msg.role}-${idx}`}
              >
                <p className="text-lg font-medium">{msg.content}</p>
              </div>
            </div>
          ))}
          {isThinking && (
            <div className="flex justify-start">
              <div className="max-w-[75%] p-5 rounded-hrlg bg-bg-surface/95 border-2 border-fg/20 shadow-hr">
                <Loader2 className="w-5 h-5 animate-spin text-accent" />
              </div>
            </div>
          )}
        </div>

        <div className="bg-bg-surface/95 p-6 border-2 border-fg/20 shadow-glow rounded-hrlg">
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="e.g. '80s rock' or 'Swedish pop'"
              className="flex-1 text-lg py-6 px-4 bg-bg-surface2 border-2 border-accent/30 font-medium rounded-hrmd text-fg placeholder:text-fg-muted focus:outline-none focus:border-accent"
              data-testid="input-music-preference"
            />
            <Button
              size="lg"
              onClick={handleSend}
              disabled={isThinking}
              className="px-7 bg-accent hover:bg-accent/90 text-white font-black shadow-glow rounded-hrmd"
              data-testid="button-send"
            >
              {isThinking ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
          <button
            className={`hr-btn hr-btn--primary w-full text-2xl py-7 px-12 font-black uppercase tracking-wider transition-all duration-200 ${
              lastPreference && !isConfirming
                ? 'cursor-pointer hover:scale-105'
                : 'opacity-40 cursor-not-allowed'
            }`}
            onClick={() => {
              setIsConfirming(true);
              const dataToSend = generatedSongs.length > 0
                ? JSON.stringify({
                    preference: lastPreference,
                    songs: generatedSongs,
                    startYearRange: startYearRange || { min: 1950, max: 2020 }
                  })
                : lastPreference;
              onPreferencesConfirmed?.(dataToSend);
            }}
            disabled={!lastPreference || isConfirming}
            data-testid="button-confirm-preferences"
          >
            {isConfirming ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin inline" />
                Searching for songs...
              </>
            ) : (
              'Confirm & Continue'
            )}
          </button>
        </div>
      </div>
    </div>
  );
  /* HITRUMBLE END */
}
