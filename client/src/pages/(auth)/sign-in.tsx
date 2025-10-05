import AuthForm from '@/components/forms/auth';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import formSchema from '@/schemas/login';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import { CButton } from '@/components/common/custom-button';
import api from '@/api/axios';
import CFlex from '@/components/ui/flex';
import { useLogin } from '@/api/users/login';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { useCurrentIp } from '@/api/ip_address/get_ip';
const SignIn = () => {
    const { data: currentIp } = useCurrentIp();
    const { mutate: loginUser, isPending } = useLogin();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        values.ip_address = currentIp.ip;
        loginUser(values);
    }

    return (
        <AuthForm
            title="მოგესალმებით!"
            subtitle="შეყივანეთ მონაცემები"
            body={
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>პაროლი</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                           <CButton type='submit' loading={isPending} className='block w-full' text='შესვლა' />
                            {/* divider */}
                            <CFlex gap="13px" align="center">
                                <div className="bg-border h-[1px] w-full" />
                                ან
                                <div className="bg-border h-[1px] w-full" />
                            </CFlex>
                            <CFlex align="center" justify="center" gap="15px">
                                <CButton
                                    disabled={isPending}
                                    type="button"
                                    size="lg"
                                    variant="outline"
                                    text="Google"
                                    icon={FcGoogle}
                                />
                                <CButton
                                    disabled={isPending}
                                    type="button"
                                    size="lg"
                                    variant="outline"
                                    text="Github"
                                    icon={FaGithub}
                                />
                            </CFlex>
                        </form>
                    </Form>
                </>
            }
        />
    );
};

export default SignIn;
