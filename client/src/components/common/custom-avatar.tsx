import { useLogOut } from '@/api/users/logout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import getAvatarUrl from '@/lib/get_avatar_url';
import type { RootState } from '@/store/store';
import { User, Settings, Heart, ShoppingBag, LogOut } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface CAvatarProps {
    onLogout?: () => void;
}

export const CAvatar = ({ onLogout }: CAvatarProps) => {
    const { mutate: logout } = useLogOut();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
    const getInitials = (username: string) => {
        if (!username) return '?';
        const cleanName = username.replace(/[0-9_\-\.]/g, ' ').trim();
        if (cleanName.includes(' ')) {
            return cleanName
                .split(' ')
                .filter((word) => word.length > 0)
                .map((word) => word[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
        }
        return username.slice(0, 2).toUpperCase();
    };

    const handleLogOut = () => {
        logout();
    };

    return (
        <div>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="cursor-pointer outline-none" asChild>
                    <Avatar className="w-10 h-10 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                        <AvatarImage src={getAvatarUrl(user)} alt={user?.username || 'User'} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {getInitials(user?.username || user?.email || 'User')}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {user?.username || 'მომხმარებელი'}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user?.email || ''}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>პროფილი</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/orders')}>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        <span>ჩემი შეკვეთები</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/wishlist')}>
                        <Heart className="mr-2 h-4 w-4" />
                        <span>სურვილების სია</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>პარამეტრები</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={handleLogOut}
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>გასვლა</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
