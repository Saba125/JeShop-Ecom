import { useEditUser } from '@/api/users/edit';
import CDialog from '@/components/common/custom-dialog';
import CSelect from '@/components/common/custom-select';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import formSchema from '@/schemas/user';
import type { User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type z from 'zod';

interface EditUserProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: User | null;
}
const statusOptions = [
    {
        label: 'დაბლოკილი',
        value: 0,
    },
    {
        label: 'აქტიური',
        value: 1,
    },
];
const userTypeOptions = [
    {
        label: 'მომხარებელი',
        value: 2,
    },
    {
        label: 'ადმინი',
        value: 1,
    },
];
const EditUser = ({ isOpen, setIsOpen, data }: EditUserProps) => {
    const { mutate: editUser, isSuccess } = useEditUser();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: data?.email || '',
            username: data?.username || '',
            phone: data?.phone || '',
            status: String(data?.is_active) || '',
            user_type: String(data?.user_type) || '',
        },
    });
    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        editUser({ ...values, uid: data?.uid! });
    };
    if (isSuccess) {
        setIsOpen(false);
    }
    return (
        <CDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            title={`რედაქტირება '${data?.username}'`}
            onSubmit={form.handleSubmit(handleSubmit)}
            children={
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                                        <FormLabel>მაილი</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ნომერი</FormLabel>
                                    <FormControl>
                                        <InputGroup>
                                            <InputGroupInput {...field} placeholder="შეიყვანეთ ნომერი" />
                                            <InputGroupAddon>+995</InputGroupAddon>
                                        </InputGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>სტატუსი </FormLabel>
                                        <FormControl>
                                            <CSelect
                                                value={field.value}
                                                onChange={field.onChange}
                                                data={statusOptions}
                                                label="სტატუსი..."
                                                placeholder="აირჩიეთ სტატუსი..."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="user_type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>როლი</FormLabel>
                                        <FormControl>
                                            <CSelect
                                                value={field.value}
                                                onChange={field.onChange}
                                                data={userTypeOptions}
                                                label="როლი..."
                                                placeholder="აირჩიეთ როლი..."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            }
        />
    );
};

export default EditUser;
