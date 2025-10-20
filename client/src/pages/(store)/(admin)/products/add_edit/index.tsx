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
import { API_URL } from '@/constants';
import formSchema from '@/schemas/product';
import { type SelectOptions, type Product } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { GeorgianLari, GeorgianLariIcon, SearchIcon, Upload, X } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';
import CSelect from '@/components/common/custom-select';
import { useGetCategories } from '@/api/category/get';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { Textarea } from '@/components/ui/textarea';
interface AddProductProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: Product | null;
}
const AddProduct = ({ isOpen, setIsOpen, data }: AddProductProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const { data: categories } = useGetCategories();
    const [categoryOptions, setCategoryOptions] = useState<SelectOptions[]>([]);
    const [unitOptions, setUnitOptions] = useState<SelectOptions[]>([
        {
            label: 'კილოგრამი',
            value: 1,
        },
        {
            label: 'გრამი',
            value: 2,
        },
    ]);
    useEffect(() => {
        console.log(categories);
        if (categories?.length === 0) {
            return;
        }
        const selectOptions: SelectOptions[] =
            categories?.map((item) => ({
                value: item.uid,
                label: item.name,
            })) || [];
        setCategoryOptions(selectOptions);
    }, [categories]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data?.name || '',
            description: data?.description || '',
            image: `${API_URL}${data?.image}`,
            category_uid: null,
            stock: '',
            weight: '',
        },
    });
    const onFileReject = useCallback((file: File, message: string) => {
        toast(message, {
            description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" has been rejected`,
        });
    }, []);
    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data);
    };
    return (
        <CDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            title={data ? `რედაქტირება '${data.name}'` : 'დაამატეთ ახალი პროდუქტი'}
            children={
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
                            name="category_uid"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>კატეგორია</FormLabel>
                                    <FormControl>
                                        <CSelect
                                            value={String(field.value)}
                                            onChange={field.onChange}
                                            data={categoryOptions}
                                            label="კატეგორია..."
                                            placeholder="აირჩიეთ კატეგორია..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 gap-x-3 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="weight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>წონა</FormLabel>
                                        <FormControl>
                                            <Input min={1} type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="unit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>წონის ერთეული</FormLabel>
                                        <FormControl>
                                            <CSelect
                                                value={field.value}
                                                onChange={field.onChange}
                                                data={unitOptions}
                                                label="წონის ერთეულები"
                                                placeholder="აირჩიეთ ერთეული..."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-x-3 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ფასი</FormLabel>
                                        <FormControl>
                                            <InputGroup>
                                                <InputGroupInput placeholder="0.00..." />
                                                <InputGroupAddon>
                                                    <GeorgianLariIcon />
                                                </InputGroupAddon>
                                              
                                            </InputGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>საწყობში რაოდენობა</FormLabel>
                                        <FormControl>
                                            <Input min={1} type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                          <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>აღწერა</FormLabel>
                                        <FormControl>
                                            <Textarea  placeholder='შეიყვანეთ აღწერა...'/>
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

export default AddProduct;
