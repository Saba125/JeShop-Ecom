import { useEffect } from 'react';
import { useCurrentUser } from './api/users/info';

interface CheckUserProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const CheckUser = ({ setIsLoading }: CheckUserProps) => {
  const { isError, isSuccess } = useCurrentUser();

  useEffect(() => {
    if (isSuccess || isError) {
      setIsLoading(false);
    }
  }, [isSuccess, isError, setIsLoading]);

  return null;
};

export default CheckUser;
