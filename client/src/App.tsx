import { Suspense, useEffect, useState } from 'react';
import './App.css';
import Loading from './components/common/loading';
import Api from './auth/Api';
import { AUTH_TOKEN } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/userSlice';
import axios from 'axios';
import { useDialog } from './hooks/use-dialog';
import CDialog from './components/common/custom-dialog';
import AdminRoutes from './routes/admin_routes';
import UserRoutes from './routes/user_routes';
import type { RootState } from './store/store';
import { RouterProvider } from 'react-router-dom';
function App() {
    const accessToken = localStorage.getItem(AUTH_TOKEN);
    const { isOpen, closeDialog, onFinish, title, description } = useDialog();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    useEffect(() => {
        if (!accessToken) {
            setIsLoading(false);
            return;
        }

        const controller = new AbortController();

        const  fetchData = async () => {
            try {
                const res: any = await Api.get('checkUser', { signal: controller.signal });

                if (!res.error) {
                    dispatch(setUser(res));
                }
            } catch (error: any) {
                if (axios.isCancel(error) || error.name === 'CanceledError') {
                    console.log('Request was canceled:', error.message);
                } else {
                    console.error('User fetch failed:', error);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [accessToken, dispatch]);
    if (isLoading || (accessToken && !user.uid)) {
        return <Loading />;
    }
    return (
        <>
            <Suspense fallback={<Loading />}>
                {user && user.user_type === 1 ? (
                    <RouterProvider key={user.user_type ?? 0} router={AdminRoutes()} />
                ) : (
                    <RouterProvider router={UserRoutes()} />
                )}
            </Suspense>
            <CDialog
                open={isOpen}
                onOpenChange={closeDialog}
                onSubmit={onFinish}
                title={title ? title : 'წაშლა'}
                description={description}
            />
        </>
    );
}

export default App;
