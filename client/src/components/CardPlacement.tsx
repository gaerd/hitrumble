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
    <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
      <div className="max-w-md mx-auto">
        <Button
          size="lg"
          className="w-full text-xl py-8 bg-red-500 hover:bg-red-600 text-white font-black border-4 border-white shadow-2xl"
          disabled={selectedPosition === null}
          onClick={onConfirm}
          data-testid="button-confirm-placement"
        >
          Bekräfta Placering
        </Button>
      </div>
    </div>
  );
}
