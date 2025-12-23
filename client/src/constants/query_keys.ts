// src/constants/queryKeys.ts
export const queryKeys = {
    categories: {
        all: ['categories'] as const,
        details: (uid: number | string) => ['categories', uid] as const,
    },
    users: {
        all: ['users'] as const,
        details: (uid: number | string) => ['users', uid] as const,
    },
    usersPaginated: {
        all: ['usersPaginated'] as const,
        details: (uid: number | string) => ['usersPaginated', uid] as const,
    },
    products: {
        all: ['products'] as const,
        details: (uid: number | string) => ['products', uid] as const,
        similar: (uid: number | string) => ['products', 'similar', uid] as const, // ✅ ADD THIS
    },
    units: {
        all: ['units'] as const,
        details: (uid: number | string) => ['units', uid] as const,
    },
    brands: {
        all: ['brands'] as const,
        details: (uid: number | string) => ['brands', uid] as const,
    },
    sales: {
        all: ['sales'] as const,
        details: (uid: number | string) => ['sales', uid] as const,
    },
};
