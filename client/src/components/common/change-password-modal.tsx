import { useForm } from 'react-hook-form';
import CDialog from './custom-dialog';
import formSchema from '@/schemas/change_password';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import type z from 'zod';
import { Input } from '../ui/input';
import { useChangePassword } from '@/api/users/change_password';
import { useEffect } from 'react';
interface ChangePasswordProps {
    isOpen: boolean;
    onClose: () => void;
}
const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordProps) => {
    const {mutate: changePassword, isSuccess: isChangeSuccess, isPending: isChangePending} = useChangePassword()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: '',
            password: '',
            repeatPassword: '',
        },
    });
    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        changePassword(data)
    };
    useEffect(() => {
        if (isChangeSuccess) {
            onClose();
        }
    }, [isChangeSuccess])
    return (
        <CDialog
        loading={isChangePending}
        title="პაროლის შეცვლა"
            open={isOpen}
            onOpenChange={onClose}
            onSubmit={form.handleSubmit(handleSubmit)}
            children={
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-5'>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ძველი პაროლი</FormLabel>
                                    <FormControl>
                                        <Input type='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ახალი პაროლი</FormLabel>
                                    <FormControl>
                                        <Input type='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="repeatPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>გაიმეორეთ პაროლი</FormLabel>
                                    <FormControl>
                                        <Input type='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            }
        />
    );
};

export default ChangePasswordModal;
