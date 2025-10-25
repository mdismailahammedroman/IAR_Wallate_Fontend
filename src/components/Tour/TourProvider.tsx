import { createContext, useContext, type ReactNode } from 'react';
import Shepherd from 'shepherd.js';

type ShepherdTour = InstanceType<typeof Shepherd.Tour>;
type ShepherdTourOptions = ConstructorParameters<typeof Shepherd.Tour>[0]; // inferred options type

interface TourContextType {
  createTour: (options?: ShepherdTourOptions) => ShepherdTour;
  startTour: (tour: ShepherdTour) => void;
  stopTour: (tour: ShepherdTour) => void;
  resetTourStorage: (key: string) => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) throw new Error('useTour must be used within a TourProvider');
  return context;
};

interface TourProviderProps {
  children: ReactNode;
}

export const TourProvider = ({ children }: TourProviderProps) => {
  const createTour = (options: ShepherdTourOptions = {}) => {
    const defaultOptions: ShepherdTourOptions = {
      defaultStepOptions: {
        cancelIcon: { enabled: true },
        classes: 'shadow-lg bg-indigo-600 text-white rounded-lg p-4',
        scrollTo: { behavior: 'smooth', block: 'center' },
      },
      useModalOverlay: true,
      ...options,
    };

    return new Shepherd.Tour(defaultOptions);
  };

  const startTour = (tour: ShepherdTour) => tour.start();
  const stopTour = (tour: ShepherdTour) => tour.cancel();
  const resetTourStorage = (key: string) => localStorage.removeItem(key);

  const value: TourContextType = { createTour, startTour, stopTour, resetTourStorage };

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
};
