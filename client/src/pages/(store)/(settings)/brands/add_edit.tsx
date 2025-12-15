import { useAddBrand } from '@/api/brands/post_';
import { useEditBrand } from '@/api/brands/put_';
import { useAddUnit } from '@/api/units/post_';
import { useEditUnit } from '@/api/units/put_';
import { CButton } from '@/components/common/custom-button';
import CDialog from '@/components/common/custom-dialog';
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadItem,
    FileUploadItemDelete,
    FileUploadItemMetadata,
    FileUploadItemPreview,
    FileUploadList,
    FileUploadTrigger,
} from '@/components/ui/file-upload';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { API_URL } from '@/constants';
import formSchema from '@/schemas/brand';
import type { TGetBrand } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
interface AddEditUnitProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: TGetBrand | null;
}
const AddEditBrand = ({ data, isOpen, setIsOpen }: AddEditUnitProps) => {
    const {isPending: isAddPending, mutate: addBrand} = useAddBrand()
    const {isPending: isEditPending, mutate: editBrand} = useEditBrand()
    const [files, setFiles] = useState<File[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data?.name || '',
            description: data?.description || '',
            image: `${API_URL}${data?.image}`,
        },
    });
    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        if (data?.uid) {
            formData.append("uid", String(data.uid))
        }
        formData.append("name", values.name)
        formData.append("description", values.description || "")
        files.forEach(item => formData.append("image", item));
        if (data) {
            editBrand(formData)
        } else {
            addBrand(formData)
        }
    };
    const onFileReject = useCallback((file: File, message: string) => {
        toast(message, {
            description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
        });
    }, []);
    return (
        <CDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            title={data ? `რედაქტირება '${data.name}'` : 'დაამატეთ ახალი ბრენდი'}
            children={
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ფოტო</FormLabel>
                                        <FormControl>
                                            <FileUpload
                                                maxFiles={1}
                                                maxSize={5 * 1024 * 1024}
                                                className="w-full max-w-md"
                                                value={files}
                                                onValueChange={setFiles}
                                                onFileReject={onFileReject}
                                                disabled={files.length > 0}
                                            >
                                                <FileUploadDropzone>
                                                    <div className="flex flex-col items-center gap-1 text-center">
                                                        <div className="flex items-center justify-center rounded-full border p-2.5">
                                                            <Upload className="size-6 text-muted-foreground" />
                                                        </div>
                                                        <p className="font-medium text-sm">
                                                            Drag & drop files here
                                                        </p>
                                                        <p className="text-muted-foreground text-xs">
                                                            Or click to browse (max 2 files, up to
                                                            5MB each)
                                                        </p>
                                                    </div>
                                                    <FileUploadTrigger asChild>
                                                        <CButton
                                                            variant="outline"
                                                            size="sm"
                                                            className="mt-2 w-fit"
                                                            text="Browse files"
                                                        />
                                                    </FileUploadTrigger>
                                                </FileUploadDropzone>
                                                <FileUploadList>
                                                    {files.map((file, index) => (
                                                        <FileUploadItem key={index} value={file}>
                                                            <FileUploadItemPreview />
                                                            <FileUploadItemMetadata />
                                                            <FileUploadItemDelete asChild>
                                                                <CButton
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="size-7"
                                                                    icon={X}
                                                                />
                                                            </FileUploadItemDelete>
                                                        </FileUploadItem>
                                                    ))}
                                                </FileUploadList>
                                            </FileUpload>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
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

export default AddEditBrand;
