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
  const isSelected = selectedPosition !== null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-6">
      <div className="max-w-md mx-auto">
        <button
          className={`hr-btn w-full text-xl py-8 font-black shadow-glow transition-all ${
            isSelected
              ? 'hr-btn--primary'
              : 'bg-bg-surface/50 text-fg-muted cursor-not-allowed opacity-50'
          }`}
          disabled={!isSelected}
          onClick={onConfirm}
          data-testid="button-confirm-placement"
        >
          {isSelected ? 'Confirm Placement' : 'Choose a Position'}
        </button>
      </div>
    </div>
  );
}
