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
import formSchema from '@/schemas/register';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa';

import { CButton } from '@/components/common/custom-button';
import api from '@/api/axios';
import CFlex from '@/components/ui/flex';
import { useRegister } from '@/api/users/register';
const SignUp = () => {
    const { mutate: registerUser, isPending } = useRegister();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            phone: '',
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        registerUser(values);
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
                            <CButton
                                loading={isPending}
                                type="submit"
                                className="block w-full "
                                text="რეგისტრაცია"
                            />

                            <CFlex gap="13px" align="center">
                                <div className="bg-border h-[1px] w-full" />
                                ან
                                <div className="bg-border h-[1px] w-full" />
                            </CFlex>
                            <CFlex align="center" justify="center" gap="15px">
                                <CButton
                                    type="button"
                                    size="lg"
                                    variant="outline"
                                    text="Google"
                                    icon={FcGoogle}
                                />
                                <CButton
                                    type="button"
                                    size="lg"
                                    variant="outline"
                                    text="Facebook"
                                    icon={FaFacebook}
                                />
                            </CFlex>
                        </form>
                    </Form>
                </>
            }
        />
    );
};

export default SignUp;
