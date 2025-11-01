import { CButton } from '@/components/common/custom-button';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

const Sales = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="flex justify-end">
                <CButton
                    onClick={() => setIsOpen(true)}
                    icon={PlusCircle}
                    text="ფასდაკლების დამატება"
                />
            </div>
            {is}
        </>
    );
};

export default Sales;
