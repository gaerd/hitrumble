import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Song } from '@/types/game.types';

interface CardPlacementProps {
  song: Song;
  selectedPosition: number | null;
  onConfirm?: () => void;
}

export default function CardPlacement({ song, selectedPosition, onConfirm }: CardPlacementProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t p-6 shadow-2xl">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-6">
          <Card className="w-40 h-56 p-3 flex-shrink-0 shadow-xl">
            {song.albumCover && (
              <img
                src={song.albumCover}
                alt={song.title}
                className="w-full h-24 object-cover rounded-lg mb-2"
              />
            )}
            <Badge className="text-lg font-mono font-bold mb-2">
              ?
            </Badge>
            <h4 className="font-semibold text-sm line-clamp-2">{song.title}</h4>
            <p className="text-xs text-muted-foreground line-clamp-1">{song.artist}</p>
          </Card>

          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Placera Kortet</h3>
            {selectedPosition !== null ? (
              <p className="text-muted-foreground mb-4">
                Vald position: <span className="font-mono font-bold">{selectedPosition + 1}</span>
              </p>
            ) : (
              <p className="text-muted-foreground mb-4">
                Välj var låten ska placeras på din tidslinje
              </p>
            )}
            <Button
              size="lg"
              className="w-full"
              disabled={selectedPosition === null}
              onClick={onConfirm}
              data-testid="button-confirm-placement"
            >
              Bekräfta Placering
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
