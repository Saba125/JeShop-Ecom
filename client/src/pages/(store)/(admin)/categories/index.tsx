import { CButton } from '@/components/common/custom-button';
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import CFlex from '@/components/ui/flex';
import AddCategory from './add_';

const AdminCategories = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <CFlex justify="end">
                <CButton
                    onClick={() => setIsOpen(true)}
                    icon={PlusCircle}
                    text="კატეგორიის დამატება"
                />
            </CFlex>
            {isOpen && <AddCategory isOpen={isOpen} setIsOpen={setIsOpen} />}
        </>
    );
};

export default AdminCategories;
