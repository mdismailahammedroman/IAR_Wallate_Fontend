# IAR Wallet - Tour System Documentation

This document provides comprehensive information about the Shepherd.js tour system implemented in the IAR Wallet application.

## 🎯 Overview

The tour system provides guided experiences for new users, helping them understand and navigate the application effectively. It includes role-specific tours for different user types (Admin, User, Agent) and contextual tours for specific features.

## 🏗️ Architecture

### Core Components

1. **TourProvider** (`src/components/Tour/TourProvider.tsx`)
   - Context provider for tour management
   - Creates and manages Shepherd.js tours
   - Provides global tour utilities

2. **TourButton** (`src/components/Tour/TourButton.tsx`)
   - Reusable button component for starting tours
   - Supports multiple button variants and sizes
   - Includes start, restart, and reset functionality

3. **Tour Configuration** (`src/config/tours.ts`)
   - Centralized tour step definitions
   - Role-specific tour configurations
   - Storage management utilities

4. **Tour Hooks** (`src/hooks/useTour.ts`)
   - Custom hooks for tour management
   - Role-based tour selection
   - Auto-start functionality

## 🎭 Tour Types

### 1. Navigation Tour
- **Purpose**: Introduce users to the main navigation elements
- **Target**: All users (public pages)
- **Storage Key**: `hasSeenNavigationTour`

### 2. Admin Dashboard Tour
- **Purpose**: Guide administrators through the admin dashboard
- **Target**: Admin and Super Admin users
- **Storage Key**: `hasSeenAdminDashboardTour`
- **Features**:
  - Analytics overview
  - User management
  - Transaction monitoring
  - Quick actions

### 3. User Dashboard Tour
- **Purpose**: Help regular users navigate their wallet dashboard
- **Target**: Regular users
- **Storage Key**: `hasSeenUserDashboardTour`
- **Features**:
  - Wallet overview
  - Transaction management
  - Profile settings

### 4. Agent Dashboard Tour
- **Purpose**: Guide agents through their specialized dashboard
- **Target**: Agent users
- **Storage Key**: `hasSeenAgentDashboardTour`
- **Features**:
  - Cash-in/Cash-out operations
  - Transaction processing
  - Agent profile management

### 5. Transaction Tour
- **Purpose**: Explain how to perform transactions
- **Target**: All authenticated users
- **Storage Key**: `hasSeenTransactionTour`

### 6. Profile Tour
- **Purpose**: Guide users through profile management
- **Target**: All authenticated users
- **Storage Key**: `hasSeenProfileTour`

## 🚀 Usage

### Basic Tour Usage

```tsx
import { useTour } from '@/hooks/useTour';

function MyComponent() {
  const { startTour, restartTour, resetTour } = useTour({ role: 'USER' });

  return (
    <div>
      <button onClick={() => startTour()}>Start Tour</button>
      <button onClick={() => restartTour()}>Restart Tour</button>
      <button onClick={() => resetTour()}>Reset Tour</button>
    </div>
  );
}
```

### Auto-Start Tours

```tsx
import { useDashboardTour } from '@/hooks/useTour';

function DashboardLayout() {
  const { startTour } = useDashboardTour('ADMIN'); // Auto-starts for new users

  useEffect(() => {
    startTour(); // Will only start if user hasn't seen the tour
  }, [startTour]);

  return <div>Dashboard content</div>;
}
```

### Using Tour Buttons

```tsx
import { TourButton } from '@/components/Tour/TourButton';

function DashboardHeader() {
  const { startTour, restartTour, resetTour } = useTour();

  return (
    <TourButton
      onStartTour={startTour}
      onRestartTour={restartTour}
      onResetTour={resetTour}
      showAllButtons={true}
    />
  );
}
```

## 🎨 Customization

### Styling Tours

Tours use Shepherd.js styling with custom CSS classes:

```css
.shepherd-button-primary {
  background-color: #4f46e5;
  color: white;
}

.shepherd-button-secondary {
  background-color: #6b7280;
  color: white;
}
```

### Custom Tour Steps

```tsx
import { tourConfigs } from '@/config/tours';

const customTourConfig = {
  ...tourConfigs.navigation,
  steps: [
    {
      id: 'custom-step',
      text: 'This is a custom step',
      attachTo: {
        element: '.my-element',
        on: 'bottom',
      },
      buttons: [
        {
          text: 'Next',
          action: () => tour.next(),
          classes: 'shepherd-button-primary',
        },
      ],
    },
  ],
};
```

## 🔧 Configuration

### Adding New Tours

1. **Create tour configuration** in `src/config/tours.ts`:

```tsx
export const myCustomTour: TourConfig = {
  id: 'my-custom-tour',
  name: 'My Custom Tour',
  description: 'Description of my tour',
  storageKey: 'hasSeenMyCustomTour',
  steps: [
    // Define steps here
  ],
};
```

2. **Add to tour configs object**:

```tsx
export const tourConfigs = {
  // ... existing tours
  myCustom: myCustomTour,
};
```

3. **Use in components**:

```tsx
const { startTour } = useTour();
startTour(tourConfigs.myCustom);
```

### Role-Based Tours

The system automatically selects appropriate tours based on user roles:

```tsx
const getTourConfigByRole = (role: string): TourConfig => {
  switch (role.toUpperCase()) {
    case 'ADMIN':
    case 'SUPER_ADMIN':
      return adminDashboardTourConfig;
    case 'AGENT':
      return agentDashboardTourConfig;
    case 'USER':
    default:
      return userDashboardTourConfig;
  }
};
```

## 📱 Responsive Design

Tours are designed to work across all device sizes:

- **Mobile**: Simplified steps with touch-friendly buttons
- **Tablet**: Optimized positioning and sizing
- **Desktop**: Full feature set with detailed explanations

## 🎯 Best Practices

### 1. Tour Content
- Keep steps concise and focused
- Use clear, actionable language
- Highlight key features and benefits
- Provide context for each step

### 2. Performance
- Tours only load when needed
- Steps are created dynamically
- Minimal impact on application performance

### 3. User Experience
- Allow users to skip tours
- Provide restart functionality
- Remember tour completion status
- Offer contextual help

### 4. Accessibility
- Tours work with keyboard navigation
- Screen reader compatible
- High contrast mode support
- Focus management

## 🔍 Debugging

### Check Tour Status

```tsx
import { hasSeenTour, resetTourStorage } from '@/config/tours';

// Check if user has seen a tour
const hasSeen = hasSeenTour('hasSeenUserDashboardTour');

// Reset tour status (for testing)
resetTourStorage('hasSeenUserDashboardTour');
```

### Development Tools

```tsx
// Force start tour (ignores storage)
const { startTour } = useTour({ forceStart: true });

// Auto-start for development
const { startTour } = useTour({ autoStart: true });
```

## 🚀 Deployment

### Production Considerations

1. **Tour Storage**: Tours use localStorage for persistence
2. **Performance**: Minimal bundle size impact
3. **Analytics**: Track tour completion rates
4. **Updates**: Tours can be updated without app updates

### Environment Variables

```env
# Disable tours in development
VITE_DISABLE_TOURS=false

# Tour version for cache busting
VITE_TOUR_VERSION=1.0.0
```

## 📊 Analytics

Track tour performance with these events:

```tsx
// Tour started
analytics.track('tour_started', {
  tour_id: 'user-dashboard-tour',
  user_role: 'USER',
});

// Tour completed
analytics.track('tour_completed', {
  tour_id: 'user-dashboard-tour',
  completion_time: '2m 30s',
});

// Tour skipped
analytics.track('tour_skipped', {
  tour_id: 'user-dashboard-tour',
  step: 3,
});
```

## 🔮 Future Enhancements

### Planned Features

1. **Interactive Tours**: Allow users to interact with elements during tours
2. **Video Integration**: Embed video tutorials within tours
3. **Multi-language Support**: Localized tour content
4. **A/B Testing**: Test different tour variations
5. **Progressive Tours**: Contextual tours based on user behavior

### Integration Opportunities

1. **Onboarding Flow**: Complete user onboarding experience
2. **Feature Announcements**: Highlight new features
3. **Help System**: Contextual help integration
4. **Training Modules**: Comprehensive user training

## 🤝 Contributing

### Adding New Tours

1. Create tour configuration in `src/config/tours.ts`
2. Add appropriate CSS classes for styling
3. Test across different screen sizes
4. Update documentation
5. Add analytics tracking

### Testing Tours

```tsx
// Test tour functionality
describe('Tour System', () => {
  it('should start tour for new users', () => {
    const { startTour } = useTour();
    expect(startTour()).toBe(true);
  });

  it('should not start tour for returning users', () => {
    localStorage.setItem('hasSeenUserDashboardTour', 'true');
    const { startTour } = useTour();
    expect(startTour()).toBe(false);
  });
});
```

## 📚 Resources

- [Shepherd.js Documentation](https://shepherdjs.dev/)
- [Tour UX Best Practices](https://uxdesign.cc/onboarding-tours-best-practices-7a5b1e8e3c4d)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Context API](https://reactjs.org/docs/context.html)

---

This tour system provides a comprehensive, user-friendly way to guide new users through the IAR Wallet application, ensuring they can effectively use all features regardless of their role or technical expertise.
