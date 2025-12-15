import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/providers/theme-provider';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

const Logo = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const user = useSelector((state: RootState) => state.user);
    return (
        <div
            onClick={() => {
                navigate(user.user_type === 1 ? '/admin' : '/');
            }}
        >
            <img
                className="cursor-pointer"
                src={theme === 'dark' ? '/images/logo-dark-bg.png' : '/images/jeshop.png'}
                width={150}
                height={150}
            />
        </div>
    );
};

export default Logo;
