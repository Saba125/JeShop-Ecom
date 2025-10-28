import { useEffect, useState } from 'react';
import './App.css';
import PageRouter from './route';
import Loading from './components/common/loading';
import Api from './auth/Api';
import { AUTH_TOKEN } from './constants';
import { useDispatch } from 'react-redux';
import { setUser } from './store/userSlice';
import axios from 'axios';
import { useDialog } from './hooks/use-dialog';
import CDialog from './components/common/custom-dialog';

function App() {
    const accessToken = localStorage.getItem(AUTH_TOKEN);
    const { isOpen, closeDialog, onFinish, title } = useDialog();
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    console.log(isOpen);

    useEffect(() => {
        if (!accessToken) {
            setIsLoading(false);
            return;
        }

        const controller = new AbortController(); // ✅ optional, for canceling on unmount

        const fetchData = async () => {
            try {
                const res: any = await Api.get('checkUser', { signal: controller.signal });

                if (!res.error) {
                    dispatch(setUser(res)); // ✅ only dispatch serializable data
                }
            } catch (error: any) {
                // ✅ If request was canceled, don't dispatch anything
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

        // ✅ Cancel request on unmount
        return () => {
            controller.abort();
        };
    }, [accessToken, dispatch]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <PageRouter />;
            <CDialog open={isOpen} onOpenChange={closeDialog} onSubmit={onFinish} title={title} />
        </>
    );
}

export default App;
