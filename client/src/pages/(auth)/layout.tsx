import Header from '@/components/layout/header';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '@/components/common/loading';

const AuthLayout = () => {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // simulate a short check
        if (user.uid) {
            navigate('/');
        } else {
            setLoading(false);
        }
    }, [user.uid, navigate]);

    if (loading) {
        // You can use a spinner or skeleton here
        return <Loading />;
    }

    return (
        <div>
            <Header />
            <div className="mt-6 flex justify-center">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
