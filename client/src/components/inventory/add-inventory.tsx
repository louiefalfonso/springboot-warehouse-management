import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import MainLayout from '../layout/layout'
import Header from '../layout/header'
import AddNewInventoryForm from './form/add-form'

import { useAddNewInventory } from "@/services/inventory-services";
import { useGetAllProducts } from "@/services/product-services";
import { useGetAllWarehouses } from "@/services/warehouse-services";

const SUCCESS_MESSAGE = "Inventory Added Successfully";
const ERROR_MESSAGE = "Failed to Add Inventory.";

const AddNewInventory = () => {

  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewInventory();
  const { data: products } = useGetAllProducts();
  const { data: warehouses } = useGetAllWarehouses();

    // Handle form submission for adding a new inventory
  const handleFormSubmit = (newInventory) => {
    mutate(newInventory, {
      onSuccess: () => {
        // Show success message and navigate to inventory list
        toast.success(SUCCESS_MESSAGE);
        navigate("/inventories");
      },
      onError: (error: unknown) => {
        // Log error and show error message
        console.error("Error Adding Inventory:", error);
        toast.error(ERROR_MESSAGE);
      },
    });
  };

  return (
     <MainLayout>
      <Header Title="Add New Inventory" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <AddNewInventoryForm
         products={products || []} 
         warehouses={warehouses || []} 
         onSubmit={handleFormSubmit} 
        />
      </div>
      </MainLayout>
  )
}

export default AddNewInventory