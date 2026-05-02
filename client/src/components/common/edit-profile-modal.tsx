import React from 'react'
import CDialog from './custom-dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import formSchema from '@/schemas/edit-profile';
import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from '@/types';
interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: User
}
const EditProfileModal = ({isOpen, onClose, data} : EditProfileModalProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            uid: data.uid!,
            email: data.email,
            image: 

        }
    })
  return (
    <CDialog
    open={isOpen}
    onOpenChange={onClose}
    title="პროფილის რედაქტირება"
    children={
        <>
        
        </>
    }
    />
  )
}

export default EditProfileModal
