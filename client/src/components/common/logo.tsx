import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../ui/sidebar';
import { useTheme } from '@/providers/theme-provider';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

const Logo = () => {
    const navigate = useNavigate();
    const {theme} = useTheme()
    const user = useSelector((state: RootState) => state.user);
    console.log(user)
    return (
        <div
            onClick={() => {
                navigate('/');
            }}
        >
            <img className="cursor-pointer" src={theme === 'dark' ? '/images/logo-dark-bg.png' : '/images/jeshop.png'} width={150} height={150} />
        </div>
    );
};

export default Logo;
