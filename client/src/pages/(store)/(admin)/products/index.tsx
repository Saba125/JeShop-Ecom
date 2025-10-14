import { CButton } from '@/components/common/custom-button';
import { CTable } from '@/components/common/custom-table';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

const AdminProducts = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div className="flex mb-3 justify-end">
                <CButton
                    onClick={() => setIsOpen(true)}
                    icon={PlusCircle}
                    text="პროდუქტის დამატება"
                />
            </div>
{/* 
            <CTable
                title="კატეგორიები"
                description="შექმინილი კატეგორიები"
            /> */}
        </>
    );
};

export default AdminProducts;
