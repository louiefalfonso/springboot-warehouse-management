import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import MainLayout from "@/components/layout/layout";
import Header from "@/components/layout/header";

import AddNewWarehouseForm from "./form/add-form";
import { useAddNewWarehouse } from "@/services/warehouse-services";

const SUCCESS_MESSAGE = "Supplier Added Successfully";
const ERROR_MESSAGE = "Failed to Add Supplier.";

const AddNewWarehouse = () => {
   // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewWarehouse();

  // Handle form submission for adding a new warehouse
  const handleFormSubmit = (newWarehouse) => {
    mutate(newWarehouse, {
      onSuccess: () => {
        // Show success message and navigate to warehouse list
        toast.success(SUCCESS_MESSAGE);
        navigate("/warehouses");
      },
      onError: (error: unknown) => {
        // Log error and show error message
        console.error("Error Adding Warehouse:", error);
        toast.error(ERROR_MESSAGE);
      },
    });
  };

  return (
    <MainLayout>
      <Header Title="Add New Warehouse" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <AddNewWarehouseForm onSubmit={handleFormSubmit}/>
      </div>
    </MainLayout>
  )
}

export default AddNewWarehouse