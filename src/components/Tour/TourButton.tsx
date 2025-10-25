import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Trash2 } from 'lucide-react';

interface TourButtonProps {
  onStartTour: () => void;
  onRestartTour?: () => void;
  onResetTour?: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg'; // md will map to default
  showAllButtons?: boolean;
}

/**
 * Map the user-friendly size prop to Button component allowed sizes.
 * 'md' -> 'default'
 */
const mapButtonSize = (size?: 'sm' | 'md' | 'lg') => {
  if (size === 'md') return 'default';
  return size ?? 'default';
};

export const TourButton = ({
  onStartTour,
  onRestartTour,
  onResetTour,
  variant = 'outline',
  size = 'sm',
  showAllButtons = false,
}: TourButtonProps) => {
  const mappedSize = mapButtonSize(size);

  if (showAllButtons) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant={variant}
          size={mappedSize}
          onClick={onStartTour}
          className="flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          Start Tour
        </Button>

        {onRestartTour && (
          <Button
            variant="ghost"
            size={mappedSize}
            onClick={onRestartTour}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Restart
          </Button>
        )}

        {onResetTour && (
          <Button
            variant="ghost"
            size={mappedSize}
            onClick={onResetTour}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Reset
          </Button>
        )}
      </div>
    );
  }

  return (
    <Button
      variant={variant}
      size={mappedSize}
      onClick={onStartTour}
      className="flex items-center gap-2"
    >
      <Play className="w-4 h-4" />
      Start Tour
    </Button>
  );
};
