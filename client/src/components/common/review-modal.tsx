import React, { useState } from 'react';
import CDialog from './custom-dialog';
import { Star } from 'lucide-react';
interface ReviewsModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ReviewsModal = ({ isOpen, setIsOpen }: ReviewsModalProps) => {
    const [selectedStar, setSelectedStar] = useState(0);
    return (
        <CDialog
            title="შეფასების გაკეთება"
            open={isOpen}
            onOpenChange={setIsOpen}
            children={
                <div>
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                onClick={() => {
                                    setSelectedStar(star);
                                }}
                                key={star}
                            />
                        ))}
                    </div>
                </div>
            }
        />
    );
};

export default ReviewsModal;
