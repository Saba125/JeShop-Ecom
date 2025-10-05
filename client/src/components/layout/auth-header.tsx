import React from 'react';
import Logo from '../common/logo';
import { Button } from '../ui/button';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation()
    const pathname = location.pathname
    const isRegister = pathname === '/auth/register'
    return (
        <div
            className="
    p-5
    bg-[#FFFF]
    shadow-md
    "
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
