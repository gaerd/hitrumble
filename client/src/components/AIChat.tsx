import { useState } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Message {
  role: 'user' | 'ai';
  content: string;
}

interface AIChatProps {
  onPreferencesConfirmed?: (preferences: string) => void;
}

export default function AIChat({ onPreferencesConfirmed }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Hej! Jag är din AI-spelledare. Berätta vilken typ av musik ni vill spela med idag. Till exempel "80-tals rock" eller "svensk pop från 90-talet"!' }
  ]);
  const [input, setInput] = useState('');
  const [lastPreference, setLastPreference] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    const preference = input.trim();
    const userMessage: Message = { role: 'user', content: preference };
    setMessages(prev => [...prev, userMessage]);
    setLastPreference(preference);
    
    setTimeout(() => {
      const aiMessage: Message = { 
        role: 'ai', 
        content: `Perfekt! Jag har förberett ${preference} för er. Klicka på "Bekräfta" för att börja!` 
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
    
    setInput('');
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      <div className="mb-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">AI Spelledare</h2>
        <p className="text-muted-foreground mt-2">Berätta vilken musik ni vill ha</p>
      </div>

      <div className="flex-1 overflow-auto mb-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-gradient-to-br from-accent to-accent/70'
              }`}
              data-testid={`message-${msg.role}-${idx}`}
            >
              <p className="text-lg">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      <Card className="p-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="T.ex. '80-tals rock' eller 'svensk pop'"
            className="text-lg"
            data-testid="input-music-preference"
          />
          <Button size="lg" onClick={handleSend} data-testid="button-send">
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <div className="mt-4">
          <Button 
            size="lg" 
            className="w-full" 
            variant="secondary"
            onClick={() => onPreferencesConfirmed?.(lastPreference)}
            disabled={!lastPreference}
            data-testid="button-confirm-preferences"
          >
            Bekräfta & Fortsätt
          </Button>
        </div>
      </Card>
    </div>
  );
}
