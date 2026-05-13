import AuthHeader from '@/components/layout/auth-header';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from '@/components/common/loading';
import Footer from '@/components/common/footer-section';

const AuthLayout = () => {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user.uid) {
            navigate('/');
        } else {
            setLoading(false);
        }
    }, [user.uid, navigate]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <AuthHeader />
            <div className="mt-6 mb-6 flex justify-center">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default AuthLayout;
