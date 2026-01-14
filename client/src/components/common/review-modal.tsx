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
import { useForm } from 'react-hook-form';
import formSchema from '@/schemas/reviews';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import type z from 'zod';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
interface ReviewsModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewsModal = ({ isOpen, setIsOpen }: ReviewsModalProps) => {
    const [rating, setRating] = useState<number>(0);
    const user = useSelector((state: RootState) => state.user);
    const handleStarClick = (starNumber: number) => {
        setRating(starNumber);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: user.email || '',
            description: '',
            rating: 0,
            username: user.username,
        },
    });
    const handleSubmit = async (values: z.infer<typeof formSchema>) => {};
    return (
        <CDialog
            title="შეფასების გაკეთება"
            open={isOpen}
            onOpenChange={setIsOpen}
            children={
                <Form {...form}>
                    <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
                        <FormField
                            control={form.control}
                            name="rating"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel></FormLabel>
                                    <FormControl>
                                        <div className="flex items-center">
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
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>სახელი</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="შეიყვანეთ სახელი..." />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>მაილი</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="შეიყვანეთ მაილი..." />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>აღწერა</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="შეიყვანეთ აღწერა..." />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            }
        />
    );
};

export default ReviewsModal;
