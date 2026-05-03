import React, { useEffect, useState } from 'react';
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
import z from 'zod';
import formSchema from '@/schemas/edit-profile';
import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from '@/types';
import { Input } from '../ui/input';
import { useEditUser } from '@/api/users/edit';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/userSlice';
interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: User;
}
const EditProfileModal = ({ isOpen, onClose, data }: EditProfileModalProps) => {
    const {mutate: editUser, isPending: isEditPending, isSuccess: isEditSuccess}  = useEditUser()
    const [submittedValues, setSubmittedValues] = useState<z.infer<typeof formSchema> | null>(null);
    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            uid: data.uid!,
            email: data.email,
            phone: data.phone || '',
            username: data.username,
        },
    });
    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setSubmittedValues(values)
        editUser({
            email: values.email,
            phone: values.phone,
            user_type: String(data.user_type),
            username: values.username,
            uid: data.uid!
        })
    };
    useEffect(() => {
        if (!submittedValues) return;
        if (isEditSuccess) {
            dispatch(setUser({
                ...data,
                email: submittedValues.email,
                phone: submittedValues.phone,
                username: submittedValues.username
            }))
            onClose();
        }
    }, [isEditSuccess])
    return (
        <CDialog
            open={isOpen}
            onOpenChange={onClose}
            title="პროფილის რედაქტირება"
            onSubmit={form.handleSubmit(handleSubmit)}
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
