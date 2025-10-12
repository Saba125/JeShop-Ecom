import { useAddCategory } from '@/api/category/post';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import formSchema from '@/schemas/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
interface AddCategoryProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddCategory = ({ isOpen, setIsOpen }: AddCategoryProps) => {
    const { mutate: addCategory, isSuccess } = useAddCategory();
    const [files, setFiles] = useState<File[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            image: '',
        },
    });
    const onFileReject = useCallback((file: File, message: string) => {
        toast(message, {
            description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
        });
    }, []);
    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description || '');
        files.forEach((file) => {
            formData.append('image', file);
        });
        addCategory(formData);
    };
    if (isSuccess) {
        setIsOpen(false)
    }
    return (
        <CDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            title="დაამატეთ ახალი კატეგორია"
            children={
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>სახელი</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            maxFiles={2}
                                            maxSize={5 * 1024 * 1024}
                                            className="w-full max-w-md"
                                            value={files}
                                            onValueChange={setFiles}
                                            onFileReject={onFileReject}
                                            multiple
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
                                                        Or click to browse (max 2 files, up to 5MB
                                                        each)
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
                                    <FormMessage />
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
                                    <FormMessage />
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
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            }
            onSubmit={form.handleSubmit(handleSubmit)}
        />
    );
};

export default AddCategory;
