import React from 'react';
import Logo from '../common/logo';
import { Button } from '../ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/providers/theme-provider';
import clsx from 'clsx';

const Header = () => {
    const {theme} = useTheme();
    const location = useLocation()
    const pathname = location.pathname
    const isRegister = pathname === '/auth/register'
    return (
        <div
            className={clsx("p-5 shadow-md",theme === 'light' ? 'bg-[#FFFF] text-black' : 'bg-[#1e1d1d] text-white')}
        >
            <div className="flex justify-between items-center">
                <Logo />
                <Button className="cursor-pointer">
                    {isRegister ? <Link to="/auth/login">ავტორიზაცია</Link> : <Link to="/auth/register">რეგისტრაცია</Link>}
                </Button>
            </div>
        </div>
    );
};

export default Header;
