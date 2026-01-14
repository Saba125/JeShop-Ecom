import React, { useState } from 'react';
import CDialog from './custom-dialog';
import { Star } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
interface ReviewsModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewsModal = ({ isOpen, setIsOpen }: ReviewsModalProps) => {
    const [rating, setRating] = useState<number>(0);

    const handleStarClick = (starNumber: number) => {
        setRating(starNumber);
    };

    return (
        <CDialog
            title="შეფასების გაკეთება"
            open={isOpen}
            onOpenChange={setIsOpen}
            children={
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((starNumber) => (
                            <Star
                                key={starNumber}
                                className={`cursor-pointer transition-colors ${
                                    starNumber <= rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                }`}
                                onClick={() => handleStarClick(starNumber)}
                            />
                        ))}
                    </div>
            }
        />
    );
};

export default ReviewsModal;
