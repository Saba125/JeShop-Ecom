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
import formSchema from '@/schemas/login';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import { CButton } from '@/components/common/custom-button';
import api from '@/api/axios';
const SignIn = () => {
     const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res: any = await api.post("login", {
            email: values.email,
            password: values.password,
        });
        console.log(res)
        if (res?.error) {
            return
        }
        localStorage.setItem('accessToken', res.data.accessToken);
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
                            <Button type="submit" className="block w-full ">
                                შესვლა
                            </Button>
                            <Button type='button' onClick={async() => {
                                const res = await api.post("test");
                            }}  className="block w-full ">
                                Test
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
}

export default SignIn