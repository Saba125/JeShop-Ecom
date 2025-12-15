import { useAddUnit } from '@/api/units/post_';
import { useEditUnit } from '@/api/units/put_';
import CDialog from '@/components/common/custom-dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import formSchema from '@/schemas/unit';
import type { TGetUnit } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import type z from 'zod';
interface AddEditUnitProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: TGetUnit | null;
}
const AddEditUnit = ({ data, isOpen, setIsOpen }: AddEditUnitProps) => {
    const { isPending: isAddPending, mutate: addUnit } = useAddUnit();
    const { isPending: isEditPending, mutate: editUnit } = useEditUnit();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data?.name || '',
            description: data?.description || '',
        },
    });
    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        if (data) {
            editUnit({name:values.name, description: values.description, uid: data.uid})
        } else {
            addUnit({ name: values.name, description: values.description });
        }
    };
    return (
        <CDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            title={data ? `რედაქტირება '${data.name}'` : 'დაამატეთ ახალი ერთეული'}
            children={
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>სახელი</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>აღწერა</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="შეიყვანეთ აღწერა..."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </>
            }
            loading={isAddPending || isEditPending}
            onSubmit={form.handleSubmit(handleSubmit)}
        />
    );
};

export default AddEditUnit;
