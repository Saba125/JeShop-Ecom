import type { User } from "@/types";

const getAvatarUrl = (user: User) => {
    // if (user?.avatar) return user.avatar;
    const seed = user?.username || user?.email || 'default';
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
};
export default getAvatarUrl;