import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import MainLayout from "@/components/layout/layout";
import Header from "@/components/layout/header";
import AddNewProductForm from "./form/add-form";

import { useAddNewProduct } from "@/services/product-services";
import { useGetAllCategories } from "@/services/category-services";
import { useGetAllSuppliers } from "@/services/supplier-services";

const SUCCESS_MESSAGE = "Product Added Successfully";
const ERROR_MESSAGE = "Failed to Add Product.";

const AddNewProduct = () => {
  
  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewProduct();
  const { data: categories } = useGetAllCategories();
  const { data: suppliers } = useGetAllSuppliers();

  // Handle form submission for adding a new product
  const handleFormSubmit = (newProduct) => {
    mutate(newProduct, {
      onSuccess: () => {
        // Show success message and navigate to product list
        toast.success(SUCCESS_MESSAGE);
        navigate("/products");
      },
      onError: (error: unknown) => {
        // Log error and show error message
        console.error("Error Adding Product:", error);
        toast.error(ERROR_MESSAGE);
      },
    });
  };

  return (
    <MainLayout>
      <Header Title="Add New Supplier" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <AddNewProductForm 
        categories={categories || []} 
        suppliers={suppliers || []} 
        onSubmit={handleFormSubmit} 
        />
      </div>
    </MainLayout>
  )
}

export default AddNewProduct