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
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import formSchema from '@/schemas/register';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import { CButton } from '@/components/common/custom-button';
import api from '@/api/axios';
const SignUp = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            phone: ''
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await api.post("register", {
            username: values.username,
            email: values.email,
            password: values.password,
            phone: values.phone || ""
        });
        console.log(values);
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
                                            <Input type='number' {...field} />
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
                            <Button type="submit" className="block w-full ">
                                რეგისტრაცია
                            </Button>
                            {/* divider */}
                            <div className="flex gap-x-3  items-center">
                                <div className="bg-border h-[1px] w-3 w-full" />
                                ან
                                <div className="bg-border h-[1px] w-3 w-full" />
                            </div>
                            <div className="flex justify-center items-center gap-x-5">
                                <CButton type='button'  size="lg" variant="outline" text="Google" icon={FcGoogle} />
                                <CButton type='button'  size="lg" variant="outline" text="Github" icon={FaGithub} />
                            </div>
                        </form>
                    </Form>
                </>
            }
        />
    );
};

export default SignUp;
