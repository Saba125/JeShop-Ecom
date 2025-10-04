import { useCurrentUser } from './api/users/info';

interface CheckUserProps {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}
const CheckUser = ({ isLoading, setIsLoading }: CheckUserProps) => {
    const {data,isError,isSuccess} = useCurrentUser();
    if (isSuccess) {
        console.log(`i am success`)
    }
    return <div>CheckUser</div>;
};

export default CheckUser;
