import { useState } from 'react';
import './App.css';
import PageRouter from './route';
import Loading from './components/common/loading';
import CheckUser from './check_user';
function App() {
    const accessToken = localStorage.getItem('accessToken');
    const [isLoading, setIsLoading] = useState(true);
    if (accessToken && isLoading) {
        return (
            <>
                <CheckUser isLoading={isLoading} setIsLoading={setIsLoading} />
                <Loading />
            </>
        );
    }
    return (
        <>
            <PageRouter />
        </>
    );
}

export default App;
