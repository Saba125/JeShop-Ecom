import AuthForm from '@/components/forms/auth';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import formSchema from '@/schemas/login';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import { CButton } from '@/components/common/custom-button';
import CFlex from '@/components/ui/flex';
import { useLogin } from '@/api/users/login';
import { useCurrentIp } from '@/api/ip_address/get_ip';
import { API_URL, AUTH_TOKEN, CLIENT_ID, REFRESH_TOKEN } from '@/constants';
import { useGoogleLogin } from '@/api/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/userSlice';
import { toast } from 'sonner';
import { useGoogleLogin as useGoogleLoginn } from '@react-oauth/google';
import { Input } from '@/components/ui/input';
const SignIn = () => {
    const { data: currentIp } = useCurrentIp();
    const dispatch = useDispatch();
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
    const { mutate: googleLogin, isPending: googleLoading } = useGoogleLogin();
    const navigate = useNavigate();
    const googleAuth = useGoogleLoginn({
        flow: 'auth-code',
        onSuccess: (codeResponse) => {
            console.log('GOOGLE CODE', codeResponse);

            googleLogin(codeResponse.code, {
                onSuccess: (data) => {
                    console.log('LOGIN SUCCESS');
                    dispatch(setUser(data.user));
                    localStorage.setItem(AUTH_TOKEN, data.accessToken);
                    localStorage.setItem(REFRESH_TOKEN, data.refreshToken);
                    navigate(data.user.user_type === 1 ? '/admin' : '/');
                },
            });
        },
        onError: (err) => {
            console.error('GOOGLE ERROR', err);
            toast.error('Google login failed');
        },
    });
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
                            <CButton
                                type="submit"
                                loading={isPending}
                                className="block w-full"
                                text="შესვლა"
                            />
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
                                    onClick={() => googleAuth()}
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
