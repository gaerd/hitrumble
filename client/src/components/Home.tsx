import { Music2, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface HomeProps {
  onSelectMaster?: () => void;
  onSelectPlayer?: () => void;
}

export default function Home({ onSelectMaster, onSelectPlayer }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-accent/20 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
            <Music2 className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            HITSTER AI
          </h1>
          <p className="text-xl text-muted-foreground font-medium">
            Musikspelet med AI-driven musikval
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 hover-elevate cursor-pointer" data-testid="card-master" onClick={onSelectMaster}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Starta Spel</h2>
                <p className="text-muted-foreground">
                  Bli spelledare och styra musiken med AI
                </p>
              </div>
              <Button size="lg" className="w-full" data-testid="button-start-master">
                Skapa Spelrum
              </Button>
            </div>
          </Card>

          <Card className="p-8 hover-elevate cursor-pointer" data-testid="card-player" onClick={onSelectPlayer}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Gå Med</h2>
                <p className="text-muted-foreground">
                  Anslut till ett spel och tävla med andra
                </p>
              </div>
              <Button size="lg" variant="secondary" className="w-full" data-testid="button-join-player">
                Skanna QR-kod
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Först till 10 korrekta placeringar vinner!
          </p>
        </div>
      </div>
    </div>
  );
}
