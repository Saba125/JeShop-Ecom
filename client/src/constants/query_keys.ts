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
  products: {
    all: ["products"] as const,
    details: (uid: number | string) => ["products", uid] as const
  },
  units: {
    all: ["units"] as const,
    details: (uid: number | string) => ["units", uid] as const
  }
  // add more as needed
};
