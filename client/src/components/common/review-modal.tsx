import React from 'react'
import CDialog from './custom-dialog'
interface ReviewsModalProps {
isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ReviewsModal = ({isOpen,setIsOpen} : ReviewsModalProps) => {
  return ( 
    <CDialog
    title="შეფასების გაკეთება"
    open={isOpen}
    onOpenChange={setIsOpen}
    children={
        <div>Test</div>
    }
    />
  )
}

export default ReviewsModal
