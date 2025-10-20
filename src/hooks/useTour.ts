import { useCallback, useMemo } from 'react';
import { useTour as useTourContext } from '@/components/Tour/TourProvider';
import { 
  tourConfigs, 
  getTourConfigByRole, 
  hasSeenTour, 
  markTourAsSeen, 
  resetTourStorage,
  type TourConfig 
} from '@/config/tours';

interface UseTourOptions {
  role?: string;
  autoStart?: boolean;
  forceStart?: boolean;
}

export const useTour = (options: UseTourOptions = {}) => {
  const { createTour, startTour, stopTour } = useTourContext();
  const { role = 'USER', autoStart = false, forceStart = false } = options;

  const tourConfig = useMemo(() => getTourConfigByRole(role), [role]);
  
  const tour = useMemo(() => {
    return createTour({
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        classes: 'shadow-lg bg-indigo-600 text-white rounded-lg p-4',
        scrollTo: { behavior: 'smooth', block: 'center' },
      },
      useModalOverlay: true,
    });
  }, [createTour]);

  const startTourByConfig = useCallback((config: TourConfig = tourConfig) => {
    // Check if user has already seen this tour
    if (!forceStart && hasSeenTour(config.storageKey)) {
      return false;
    }

    // Clear existing steps
    if (tour.steps) {
      tour.steps.forEach((step: any) => tour.removeStep(step.id));
    }

    // Add steps from configuration
    config.steps.forEach((step, index) => {
      const buttons = step.buttons || [];
      
      // Add navigation buttons if not provided
      if (buttons.length === 0) {
        const navButtons = [];
        
        // Always add a cancel button
        navButtons.push({
          text: 'Skip Tour',
          action: () => {
            tour.cancel();
            markTourAsSeen(config.storageKey);
          },
          classes: 'shepherd-button-secondary',
        });
        
        if (index > 0) {
          navButtons.push({
            text: 'Back',
            action: () => tour.back(),
            classes: 'shepherd-button-secondary',
          });
        }
        
        if (index < config.steps.length - 1) {
          navButtons.push({
            text: 'Next',
            action: () => tour.next(),
            classes: 'shepherd-button-primary',
          });
        } else {
          navButtons.push({
            text: 'Finish',
            action: () => {
              tour.complete();
              markTourAsSeen(config.storageKey);
            },
            classes: 'shepherd-button-primary',
          });
        }
        
        buttons.push(...navButtons);
      }

      tour.addStep({
        id: step.id,
        text: step.text,
        attachTo: step.attachTo,
        buttons,
        classes: step.classes,
        highlightClass: step.highlightClass,
      });
    });

    startTour(tour);
    console.log(`Tour started: ${config.name}`);
    return true;
  }, [tour, tourConfig, forceStart, startTour]);

  const restartTour = useCallback((config: TourConfig = tourConfig) => {
    resetTourStorage(config.storageKey);
    startTourByConfig(config);
  }, [startTourByConfig, tourConfig]);

  const resetTour = useCallback((config: TourConfig = tourConfig) => {
    resetTourStorage(config.storageKey);
  }, [tourConfig]);

  const stopCurrentTour = useCallback(() => {
    stopTour(tour);
  }, [stopTour, tour]);

  // Auto-start tour if enabled and conditions are met
  const shouldAutoStart = useMemo(() => {
    return autoStart && (!hasSeenTour(tourConfig.storageKey) || forceStart);
  }, [autoStart, tourConfig.storageKey, forceStart]);

  return {
    tour,
    tourConfig,
    startTour: startTourByConfig,
    restartTour,
    resetTour,
    stopTour: stopCurrentTour,
    hasSeenTour: () => hasSeenTour(tourConfig.storageKey),
    shouldAutoStart,
    // Specific tour starters
    startNavigationTour: () => startTourByConfig(tourConfigs.navigation),
    startDashboardTour: () => startTourByConfig(tourConfig),
    startTransactionTour: () => startTourByConfig(tourConfigs.transaction),
    startProfileTour: () => startTourByConfig(tourConfigs.profile),
  };
};

// Hook for specific tour types
export const useNavigationTour = () => {
  const tourContext = useTourContext();
  const tour = useMemo(() => tourContext.createTour(), [tourContext]);
  
  return {
    startTour: () => {
      if (hasSeenTour(tourConfigs.navigation.storageKey)) return false;
      
      tour.steps = [];
      tourConfigs.navigation.steps.forEach((step, index) => {
        const buttons = [];
        
        if (index > 0) {
          buttons.push({
            text: 'Back',
            action: () => tour.back(),
          });
        }
        
        if (index < tourConfigs.navigation.steps.length - 1) {
          buttons.push({
            text: 'Next',
            action: () => tour.next(),
          });
        } else {
          buttons.push({
            text: 'Finish',
            action: () => {
              tour.complete();
              markTourAsSeen(tourConfigs.navigation.storageKey);
            },
          });
        }
        
        tour.addStep({
          id: step.id,
          text: step.text,
          attachTo: step.attachTo,
          buttons,
        });
      });
      
      tourContext.startTour(tour);
      return true;
    },
    resetTour: () => resetTourStorage(tourConfigs.navigation.storageKey),
  };
};

export const useDashboardTour = (options: { role?: string } = {}) => {
  return useTour({ ...options, autoStart: true });
};
