import { CButton } from '@/components/common/custom-button';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import AddEditSale from './add_edit';

const Sales = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="flex justify-end mb-3">
                <CButton
                    onClick={() => setIsOpen(true)}
                    icon={PlusCircle}
                    text="ფასდაკლების დამატება"
                />
            </div>
            {isOpen && <AddEditSale data={null} isOpen={isOpen} setIsOpen={setIsOpen} />}
        </>
    );
};

export default Sales;
