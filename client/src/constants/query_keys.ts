// src/constants/queryKeys.ts
export const queryKeys = {
  categories: {
    all: ["categories"] as const,
    details: (uid: number | string) => ["categories", uid] as const,
  },
  users: {
    all: ["users"] as const,
    details: (uid: number | string) => ["users", uid] as const,
  },
  // add more as needed
};
