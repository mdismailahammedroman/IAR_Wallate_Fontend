import { createContext, useContext, ReactNode } from 'react';
import Shepherd from 'shepherd.js';

interface TourContextType {
  createTour: (options?: Shepherd.Tour.TourOptions) => Shepherd.Tour;
  startTour: (tour: Shepherd.Tour) => void;
  stopTour: (tour: Shepherd.Tour) => void;
  resetTourStorage: (key: string) => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};

interface TourProviderProps {
  children: ReactNode;
}

export const TourProvider = ({ children }: TourProviderProps) => {
  const createTour = (options: Shepherd.Tour.TourOptions = {}) => {
    const defaultOptions: Shepherd.Tour.TourOptions = {
      defaultStepOptions: {
        cancelIcon: {
          enabled: true,
        },
        classes: 'shadow-lg bg-indigo-600 text-white rounded-lg p-4',
        scrollTo: { behavior: 'smooth', block: 'center' },
      },
      useModalOverlay: true,
      ...options,
    };

    return new Shepherd.Tour(defaultOptions);
  };

  const startTour = (tour: Shepherd.Tour) => {
    tour.start();
  };

  const stopTour = (tour: Shepherd.Tour) => {
    tour.cancel();
  };

  const resetTourStorage = (key: string) => {
    localStorage.removeItem(key);
  };

  const value: TourContextType = {
    createTour,
    startTour,
    stopTour,
    resetTourStorage,
  };

  return (
    <TourContext.Provider value={value}>
      {children}
    </TourContext.Provider>
  );
};
