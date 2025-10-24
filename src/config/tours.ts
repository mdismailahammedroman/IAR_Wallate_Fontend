
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

export const userDashboardTourConfig: TourConfig = {
  id: "user-dashboard-tour",
  name: "User Dashboard Tour",
  description: "Guided tour for user dashboard features",
  storageKey: "user-dashboard-tour",
  steps: [
    {
      id: "wallet-balance",
      text: "Here you can see your current wallet balance.",
      attachTo: { element: ".mywallet-wallet-balance-card", on: "bottom" },
    },
    {
      id: "quick-actions",
      text: "Quick actions like Send, Add, or Withdraw money are here.",
      attachTo: { element: ".mywallet-quick-actions-card", on: "bottom" },
    },
    {
      id: "transaction-breakdown",
      text: "This chart shows a breakdown of your recent transactions.",
      attachTo: { element: ".mywallet-dashboard-transaction-breakdown", on: "top" },
    },
  ],
};

export const adminDashboardTourConfig: TourConfig = {
  id: "admin-dashboard-tour",
  name: "Admin Dashboard Tour",
  description: "Guided tour for admin dashboard features",
  storageKey: "admin-dashboard-tour",
  steps: [
    {
      id: "analytics",
      text: "Admins can view analytics and key performance metrics here.",
      attachTo: { element: ".admin-analytics-card", on: "bottom" },
    },
    {
      id: "user-management",
      text: "Manage users from this section.",
      attachTo: { element: ".admin-users-card", on: "bottom" },
    },
  ],
};

export const getTourConfigByRole = (role?: string): TourConfig => {
  const roleUpper = (role || "USER").toUpperCase();

  switch (roleUpper) {
    case "ADMIN":
    case "SUPER_ADMIN":
      return adminDashboardTourConfig;

    case "AGENT":
    case "USER":
      return userDashboardTourConfig;

    default:
      return userDashboardTourConfig; // fallback
  }
};

export const hasSeenTour = (storageKey: string): boolean => {
  return localStorage.getItem(storageKey) === "true";
};

export const markTourAsSeen = (storageKey: string) => {
  localStorage.setItem(storageKey, "true");
};
export const resetTourStorage = (storageKey: string) => {
  localStorage.removeItem(storageKey);
};
