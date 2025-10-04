import { useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import PageRouter from './route';
import { Loader } from 'lucide-react';
import Loading from './components/common/loading';
import CheckUser from './check_user';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
function App() {
    const user = useSelector((state: RootState) => state.user)
    const [isLoading, setIsLoading] = useState(true);
    if (isLoading) {
    }
    return (
        <>
        <PageRouter />
        <CheckUser isLoading={isLoading} setIsLoading={setIsLoading}   />
        </>
    )
}

export default App;
