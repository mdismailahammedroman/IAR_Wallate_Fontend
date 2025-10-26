// src/components/Tour/tours.ts
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";

export const createTour = (role: string): InstanceType<typeof Shepherd.Tour> => {
  const tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
      cancelIcon: { enabled: true },
      scrollTo: { behavior: "smooth", block: "center" },
      classes: "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg rounded-lg p-3",
    },
  });

  // -----------------------------
  // Common step
  // -----------------------------
  tour.addStep({
    id: "welcome",
    text: `👋 Welcome ${role}! Let’s explore your dashboard.`,
    buttons: [{ text: "Next", action: tour.next }],
  });

  // -----------------------------
  // Admin + Super Admin
  // -----------------------------
  if (["ADMIN", "SUPER_ADMIN"].includes(role)) {
  tour.addStep({
  id: "stats",
  text: "Here’s an overview of your main stats: users, agents, and wallet balances.",
  attachTo: { element: ".dashboard-stats", on: "bottom" },
  buttons: [
    { text: "Back", action: tour.back },
    { text: "Next", action: tour.next },
  ],
});

tour.addStep({
  id: "revenue-chart",
  text: "This chart shows monthly revenue trends over the past 6 months.",
  attachTo: { element: ".dashboard-chart .col-span-3:first-child", on: "top" },
  buttons: [
    { text: "Back", action: tour.back },
    { text: "Next", action: tour.next },
  ],
});

tour.addStep({
  id: "transaction-pie",
  text: "Here you can see the breakdown of transaction types.",
  attachTo: { element: ".dashboard-chart .col-span-3:last-child", on: "top" },
  buttons: [
    { text: "Back", action: tour.back },
    { text: "Next", action: tour.next },
  ],
});

tour.addStep({
  id: "top-users",
  text: "These are your top users with the highest wallet balances.",
  attachTo: { element: ".dashboard-top-users .col-span-6.md\\:col-span-2:first-child", on: "top" },
  buttons: [
    { text: "Back", action: tour.back },
    { text: "Next", action: tour.next },
  ],
});

tour.addStep({
  id: "transactions",
  text: "Here are the latest transactions in the system.",
  attachTo: { element: ".dashboard-transactions", on: "top" },
  buttons: [
    { text: "Back", action: tour.back },
    { text: "Next", action: tour.next },
  ],
});

tour.addStep({
  id: "quick-actions",
  text: "Use these links to manage users, transactions, and agents quickly.",
  attachTo: { element: ".dashboard-actionss", on: "top" },
  buttons: [{ text: "Finish", action: tour.complete }],
});

  }

  // -----------------------------
  // User + Agent
  // -----------------------------
  if (["USER", "AGENT"].includes(role)) {
    tour.addStep({
      id: "wallet-balance",
      text: "This card shows your wallet balance in real-time.",
      attachTo: { element: ".mywallet-wallet-balance-card", on: "bottom" },
      buttons: [
        { text: "Back", action: tour.back },
        { text: "Next", action: tour.next },
      ],
    });

    tour.addStep({
      id: "quick-actions",
      text: "Perform quick actions like Send, Add, or Withdraw money here.",
      attachTo: { element: ".mywallet-quick-actions-card", on: "top" },
      buttons: [
        { text: "Back", action: tour.back },
        { text: "Next", action: tour.next },
      ],
    });

    tour.addStep({
      id: "chart",
      text: "View your transaction breakdown and spending pattern here.",
      attachTo: { element: ".mywallet-dashboard-transaction-breakdown", on: "top" },
      buttons: [
        { text: "Back", action: tour.back },
        { text: "Next", action: tour.next },
      ],
    });

    tour.addStep({
      id: "recent-transactions",
      text: "These are your latest transactions.",
      attachTo: { element: ".mywallet-recent-transactions", on: "top" },
      buttons: [
        { text: "Back", action: tour.back },
        { text: "Done", action: tour.complete },
      ],
    });
  }

  return tour;
};

// -----------------------------
// Start the tour
// -----------------------------
export const startTour = (role: string) => {
  const tour = createTour(role);
  tour.start();
  localStorage.setItem(`tourCompleted-${role}`, "true");
};

// -----------------------------
// Restart tour (even if completed)
// -----------------------------
export const restartTour = (role: string) => {
  localStorage.removeItem(`tourCompleted-${role}`);
  startTour(role);
};

// -----------------------------
// Reset tour flag only
// -----------------------------
export const resetTour = (role: string) => {
  localStorage.removeItem(`tourCompleted-${role}`);
};
