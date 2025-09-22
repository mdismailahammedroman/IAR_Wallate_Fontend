export const Role = {
  User: "user",
  Agent: "agent",
} as const;

export type Role = (typeof Role)[keyof typeof Role];