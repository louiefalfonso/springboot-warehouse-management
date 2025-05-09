import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import MainLayout from "@/components/layout/layout";
import Header from "@/components/layout/header";
import AddNewSupplierForm from "./form/add-form";
import { useAddNewSupplier } from "@/services/supplier-services";

const SUCCESS_MESSAGE = "Treatment Added Successfully";
const ERROR_MESSAGE = "Failed to Add Treatment.";

const AddNewSupplier = () => {

  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewSupplier();

  // Handle form submission for adding a new treatment
  const handleFormSubmit = (newSupplier) => {
    mutate(newSupplier, {
      onSuccess: () => {
        // Show success message and navigate to supplier list
        toast.success(SUCCESS_MESSAGE);
        navigate("/suppliers");
      },
      onError: (error: unknown) => {
        // Log error and show error message
        console.error("Error Adding Supplier:", error);
        toast.error(ERROR_MESSAGE);
      },
    });
  };

  return (
    <MainLayout>
      <Header Title="Add New Supplier" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <AddNewSupplierForm onSubmit={handleFormSubmit}/>
      </div>
    </MainLayout>
  )
}

export default AddNewSupplier