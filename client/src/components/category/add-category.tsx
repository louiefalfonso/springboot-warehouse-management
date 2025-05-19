import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import MainLayout from "@/components/layout/layout";
import Header from "@/components/layout/header";
import AddNewCategoryForm from "./form/add-form";
import { useAddNewCategory } from "@/services/category-services";

const SUCCESS_MESSAGE = "Category Added Successfully";
const ERROR_MESSAGE = "Failed to Add Category.";

const AddNewCategory = () => {

  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewCategory();

  // Handle form submission for adding a new category
  const handleFormSubmit = (newCategory) => {
    mutate(newCategory, {
      onSuccess: () => {
        // Show success message and navigate to categorylist
        toast.success(SUCCESS_MESSAGE);
        navigate("/categories");
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
        <AddNewCategoryForm onSubmit={handleFormSubmit}/>
      </div>
    </MainLayout>
  )
}

export default AddNewCategory