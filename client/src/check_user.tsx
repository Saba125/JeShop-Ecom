import { useCurrentUser } from './api/users/info';

interface CheckUserProps {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}
const CheckUser = ({ setIsLoading }: CheckUserProps) => {
    const { isError, isSuccess } = useCurrentUser();
    if (isSuccess || isError) {
        setIsLoading(false);
    }

    return null;
};

export default CheckUser;
