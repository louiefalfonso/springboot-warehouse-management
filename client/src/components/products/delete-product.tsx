import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';


interface DeleteProductDialogProps {
  productId: string;
  onDelete: () => void;
}

const DeleteProductDialog:React.FC<DeleteProductDialogProps> = ({productId, onDelete}) => {
  
    // Validate the product prop
  if (!productId) {
      console.error("Invalid Product ID");
      return null;
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button className="ml-2 mr-2 bg-rose-600 hover:bg-rose-700">Delete Product</Button>
      </DialogTrigger>
          <DialogContent>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to fully delete this product's information? This action cannot be undone.
            </DialogDescription>
            <DialogFooter>
              <Button onClick={onDelete} className="bg-red-500 hover:bg-red-600">
                Confirm
              </Button>
            </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteProductDialog