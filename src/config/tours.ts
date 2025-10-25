
export interface TourStep {
  id: string;
  text: string;
  attachTo: {
    element: string;
    on: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  };
  buttons?: Array<{
    text: string;
    action: () => void;
    classes?: string;
  }>;
  classes?: string;
  highlightClass?: string;
}

export interface TourConfig {
  id: string;
  name: string;
  description: string;
  steps: TourStep[];
  storageKey: string;
}

// Navigation Tour Configuration
export const navigationTourConfig: TourConfig = {
  id: 'navigation-tour',
  name: 'Navigation Tour',
  description: 'Learn how to navigate the application',
  storageKey: 'hasSeenNavigationTour',
  steps: [
    {
      id: 'logo',
      text: 'This is the IAR Wallet logo. Click it to return to the home page.',
      attachTo: {
        element: 'header h1',
        on: 'bottom',
      },
    },
    {
      id: 'mobile-menu',
      text: 'On mobile devices, use this menu to access navigation options.',
      attachTo: {
        element: '.mobile-menu-toggle',
        on: 'bottom',
      },
    },
    {
      id: 'desktop-nav',
      text: 'Use these navigation links to explore different sections of the application.',
      attachTo: {
        element: '.desktop-nav',
        on: 'bottom',
      },
    },
    {
      id: 'theme-toggle',
      text: 'Toggle between light and dark mode for comfortable viewing.',
      attachTo: {
        element: '.mode-toggle',
        on: 'left',
      },
    },
    {
      id: 'auth-buttons',
      text: 'Sign in or create an account to access your wallet dashboard.',
      attachTo: {
        element: '.auth-buttons',
        on: 'bottom',
      },
    },
  ],
};

// Dashboard Tour Configurations
export const adminDashboardTourConfig: TourConfig = {
  id: 'admin-dashboard-tour',
  name: 'Admin Dashboard Tour',
  description: 'Learn how to use the admin dashboard',
  storageKey: 'hasSeenAdminDashboardTour',
  steps: [
    {
      id: 'sidebar-nav',
      text: 'Welcome to the Admin Dashboard! Use this sidebar to navigate between Analytics, User Management, and Transactions.',
      attachTo: {
        element: '.sidebar-nav',
        on: 'right',
      },
    },
    {
      id: 'analytics-overview',
      text: 'The analytics dashboard provides key metrics including revenue, user growth, and transaction volumes.',
      attachTo: {
        element: '.dashboard-analytics',
        on: 'bottom',
      },
    },
    {
      id: 'stats-cards',
      text: 'Monitor real-time performance with these stat cards showing revenue, users, transactions, and wallet balances.',
      attachTo: {
        element: '.dashboard-stats',
        on: 'top',
      },
    },
    {
      id: 'chart-section',
      text: 'Visualize trends and patterns with interactive charts and graphs.',
      attachTo: {
        element: '.dashboard-chart',
        on: 'top',
      },
    },
    {
      id: 'top-users',
      text: 'Identify your most valuable customers by viewing top users by wallet balance.',
      attachTo: {
        element: '.dashboard-top-users',
        on: 'top',
      },
    },
    {
      id: 'quick-actions',
      text: 'Access common administrative tasks quickly with these action buttons.',
      attachTo: {
        element: '.dashboard-quick-actions',
        on: 'top',
      },
    },
  ],
};

export const userDashboardTourConfig: TourConfig = {
  id: 'user-dashboard-tour',
  name: 'User Dashboard Tour',
  description: 'Learn how to use your wallet dashboard',
  storageKey: 'hasSeenUserDashboardTour',
  steps: [
    {
      id: 'sidebar-nav',
      text: 'Welcome to your wallet dashboard! Use this sidebar to navigate between your profile, transactions, and wallet information.',
      attachTo: {
        element: '.sidebar-nav',
        on: 'right',
      },
    },
    {
      id: 'dashboard-home',
      text: 'Your dashboard home shows your wallet balance, recent transactions, and quick access to common actions.',
      attachTo: {
        element: '[data-testid="dashboard-home"], .dashboard-home, main',
        on: 'bottom',
      },
    },
    {
      id: 'wallet-info',
      text: 'Check your wallet balance and transaction history. You can send money, add funds, or withdraw money from here.',
      attachTo: {
        element: '.wallet-section, [data-testid="wallet-info"]',
        on: 'top',
      },
    },
    {
      id: 'transactions',
      text: 'View your transaction history, send money to other users, or add funds to your wallet.',
      attachTo: {
        element: '.transactions-section, [data-testid="transactions"]',
        on: 'top',
      },
    },
  ],
};

export const agentDashboardTourConfig: TourConfig = {
  id: 'agent-dashboard-tour',
  name: 'Agent Dashboard Tour',
  description: 'Learn how to use the agent dashboard',
  storageKey: 'hasSeenAgentDashboardTour',
  steps: [
    {
      id: 'sidebar-nav',
      text: 'Welcome to the Agent Dashboard! As an agent, you can manage cash-in and cash-out transactions for users.',
      attachTo: {
        element: '.sidebar-nav',
        on: 'right',
      },
    },
    // Wallet Balance Card
    {
      id: 'wallet-balance-card',
      text: 'This card shows your current wallet balance. You can track how much money you have in your account here.',
      attachTo: {
        element: '.mywallet-wallet-balance-card',
        on: 'left',
      },
    },

    // Quick Actions Card
    {
      id: 'quick-actions-card',
      text: 'Use these buttons to quickly Send, Add, or Withdraw money from your wallet.',
      attachTo: {
        element: '.mywallet-quick-actions-card',
        on: 'top',
      },
    },

    // Transaction Breakdown Chart
    {
      id: 'transaction-breakdown-card',
      text: 'This chart gives you a visual breakdown of your recent transactions, such as Send, Add, and Withdraw totals.',
      attachTo: {
        element: '.mywallet-dashboard-transaction-breakdown',
        on: 'top',
      },
    },

    // Recent Transactions Table
    {
      id: 'recent-transactions-card',
      text: 'This table lists your most recent transactions with details like amount, sender, receiver, and date.',
      attachTo: {
        element: '.mywallet-recent-transactions',
        on: 'top',
      },
    },
  ],
};

// Export all tour configurations
export const tourConfigs = {
  navigation: navigationTourConfig,
  adminDashboard: adminDashboardTourConfig,
  userDashboard: userDashboardTourConfig,
  agentDashboard: agentDashboardTourConfig,
};

// Helper function to get tour config by role
export const getTourConfigByRole = (role?: string): TourConfig => {
  const roleUpper = (role || 'USER').toUpperCase();
  switch (roleUpper) {
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

// Helper function to check if user has seen a tour
export const hasSeenTour = (storageKey: string): boolean => {
  return localStorage.getItem(storageKey) === 'true';
};

// Helper function to mark tour as seen
export const markTourAsSeen = (storageKey: string): void => {
  localStorage.setItem(storageKey, 'true');
};

// Helper function to reset tour storage
export const resetTourStorage = (storageKey: string): void => {
  localStorage.removeItem(storageKey);
};
