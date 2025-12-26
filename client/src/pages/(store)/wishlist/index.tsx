import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const Wishlist = () => {
    const wishlist = useSelector((state: RootState) => state.wishlist.products);

    return <div></div>;
};

export default Wishlist;
