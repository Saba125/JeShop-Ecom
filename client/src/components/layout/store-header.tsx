import { useSelector } from 'react-redux';
import { CAvatar } from '../common/custom-avatar';
import CFlex from '../ui/flex';
import type { RootState } from '@/store/store';
import getInitials from '@/lib/get_avatar';
const StoreHeader = () => {
    const user = useSelector((state: RootState) => state.user);
    return (
        <div className=" w-full px-5 h-[73.69px] border-b flex items-center justify-between">
            <div></div>
            <CAvatar initials={getInitials(user.username)} />
        </div>
    );
};

export default StoreHeader;
