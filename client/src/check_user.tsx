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
      console.log('i am here');
        console.log('useCurrentUser useEffect dispatch',);
      setIsLoading(false);
    }
  }, [isSuccess, isError, setIsLoading]); // ✅ runs only when query finishes once

  return null;
};

export default CheckUser;
