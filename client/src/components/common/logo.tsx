import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../ui/sidebar';
import { useTheme } from '@/providers/theme-provider';

const Logo = () => {
    const navigate = useNavigate();
    const {theme} = useTheme()
    console.log(theme)
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
