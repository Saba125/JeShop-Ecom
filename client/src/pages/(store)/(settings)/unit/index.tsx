import { CButton } from '@/components/common/custom-button';
import { PlusCircle } from 'lucide-react';
import React, { useState } from 'react';
import AddEditUnit from './add_edit';

const UnitSettings = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="flex justify-end">
                <CButton
                    icon={PlusCircle}
                    text="ერთეულის დამატება"
                    onClick={() => setIsOpen(true)}
                />
            </div>
            {isOpen && (
                <AddEditUnit data={null} isOpen={isOpen} setIsOpen={() => setIsOpen(false)} />
            )}
        </>
    );
};

export default UnitSettings;
