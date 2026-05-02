import React from 'react';
import CDialog from './custom-dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import formSchema from '@/schemas/edit-profile';
import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from '@/types';
import { Input } from '../ui/input';
interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: User;
}
const EditProfileModal = ({ isOpen, onClose, data }: EditProfileModalProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            uid: data.uid!,
            email: data.email,
            phone: data.phone || '',
            username: data.username,
        },
    });
    const handleSubmit = async (values: z.infer<typeof formSchema>) => {};
    return (
        <CDialog
            open={isOpen}
            onOpenChange={onClose}
            title="პროფილის რედაქტირება"
            children={
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>სახელი</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ელ.ფოსტა</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>მობილური</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </>
            }
        />
    );
};

export default EditProfileModal;
