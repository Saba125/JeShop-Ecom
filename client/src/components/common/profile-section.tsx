import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import CFlex from '../ui/flex';
import { User } from 'lucide-react';
import { CAvatar } from './custom-avatar';
import { useNavigate } from 'react-router-dom';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { useCurrentIp } from '@/api/ip_address/get_ip';
import { useLogin } from '@/api/users/login';
import formSchema from '@/schemas/login';
import type z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CButton } from './custom-button';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const ProfileSection = () => {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
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

    return user.uid ? (
        <CFlex className="cursor-pointer" align="center" gap="10px">
            {user.uid ? (
                <CAvatar />
            ) : (
                <>
                    <User className="w-7 h-7" strokeWidth={1.5} />
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500">პროფილი</span>
                        <button
                            onClick={() => navigate('/auth/login')}
                            className=" cursor-pointer text-sm font-semibold hover:text-[#006FEAFF] text-left"
                        >
                            ავტორიზაცია
                        </button>
                    </div>
                </>
            )}
        </CFlex>
    ) : (
        <HoverCard openDelay={200}>
            <HoverCardTrigger>
                <CFlex className="cursor-pointer" align="center" gap="10px">
                    {user.uid ? (
                        <CAvatar />
                    ) : (
                        <>
                            <User className="w-7 h-7" strokeWidth={1.5} />
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500">პროფილი</span>
                                <button
                                    onClick={() => navigate('/auth/login')}
                                    className=" cursor-pointer text-sm font-semibold hover:text-[#006FEAFF] text-left"
                                >
                                    ავტორიზაცია
                                </button>
                            </div>
                        </>
                    )}
                </CFlex>
            </HoverCardTrigger>
            <HoverCardContent className="w-[360px]" side="bottom" align="end">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                        <div className=" text-sm flex justify-end">
                            <span>
                                არ გაქვთ ანგარიში?{' '}
                                <Link className="font-bold hover:underline text-[#006FEAFF]">
                                    რეგისტრაცია
                                </Link>
                            </span>
                        </div>
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
            </HoverCardContent>
        </HoverCard>
    );
};

export default ProfileSection;
