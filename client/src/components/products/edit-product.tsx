import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import UpdateProductForm from "./form/edit-form";
import { useDeleteProduct, useGetProductById, useUpdateProduct } from "@/services/product-services";
import { useGetAllSuppliers } from "@/services/supplier-services";
import { useGetAllCategories } from "@/services/category-services";

const UpdateProduct = () => {
    // get treatement Id from URL
    const { id } = useParams();
    const navigate = useNavigate();

    // fetch product data
    const { data, isLoading } = useGetProductById(id || "");
    const { mutate } = useUpdateProduct(id || "");
    const { mutate: deleteProduct } = useDeleteProduct();
    const { data: categories } = useGetAllCategories();
    const { data: suppliers } = useGetAllSuppliers();

    const [productName, setProductName] = useState("");
    const [productNumber, setProductNumber] = useState("");
    const [description, setDescription] = useState("");
    const [productBrand, setProductBrand] = useState("");
    const [sku, setSku] = useState("");
    const [quantity, setQuantity] = useState<number | null>(null);
    const [price, setPrice] = useState<number | null>(null);

    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [supplierId, setSupplierId] = useState<number | null>(null);

    useEffect(()=>{
    if(data){
      setProductName(data.productName);
      setProductNumber(data.productNumber);
      setDescription(data.description);
      setProductBrand(data.productBrand);
      setSku(data.sku);
      setQuantity(data.quantity);
      setPrice(data.price);
      setCategoryId(data.category?.id ?? null);
      setSupplierId(data.supplier?.id ?? null);
    }
  }, [data]);

    if (isLoading) { return <div>Loading...</div>;}
    if (!data) { return <div>No data found</div>;}

    // update product
    const handleSubmit = (e:React.FormEvent)=>{
         e.preventDefault();

            if (!categoryId) {
              toast.error("Please select a category.");
              return;
            }
            if (!supplierId) {
              toast.error("Please select a supplier.");
              return;
            }
            if (
              !productName ||
              !productNumber ||
              !description ||
              !productBrand ||
              !sku ||
              quantity === null || isNaN(quantity) ||
              price === null || isNaN(price) ||
              !categoryId ||
              !supplierId
            ) {
                {
                toast.error("Please fill in all required fields.");
                return;
              }
            }

            const currentProduct = {
                  id: id || "",
                  productName,
                  productNumber,
                  description,
                  productBrand,
                  sku,
                  quantity,
                  price,
                  category: { id: categoryId },
                  supplier: { id: supplierId },
            };
            try {
                mutate(currentProduct, {
                    onSuccess: () => {
                        toast.success("Product Updated Successfully");
                        navigate("/products");
                    },
                    onError: (error) => {
                        console.error("Error Updating Product:", error);
                        toast.error("Error Updating Product");
                    },
                });
            }
            catch (error) {
                console.error("Unexpected error:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
    }

    // delete product
    const handleDelete = () =>{
      try {
        deleteProduct(id || "", {
          onSuccess: () => {
            toast.success("Product Deleted successfully");
            navigate("/products");
          },
          onError: (error) => {
            console.error("Error Deleting Product:", error);
            toast.error("Failed to Delete Product. Please try again.");
          },
        });
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } 

  return (
    <MainLayout>
      <Header Title="Update Product" />
        <div className="flex flex-1 flex-col gap-4 p-4">
            <UpdateProductForm 
                productName={productName} 
                setProductName={setProductName}
                productNumber={productNumber} 
                setProductNumber={setProductNumber}
                description={description} 
                setDescription={setDescription}
                productBrand={productBrand} 
                setProductBrand={setProductBrand}
                sku={sku} 
                setSku={setSku}
                quantity={quantity} 
                setQuantity={setQuantity}
                price={price} 
                setPrice={setPrice}
                categoryId={categoryId} 
                setCategoryId={setCategoryId}
                categories={categories}
                supplierId={supplierId} 
                setSupplierId={setSupplierId}
                suppliers={suppliers}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
                productId={id || ""}
            />
        </div>
        <Toaster />  
    </MainLayout>    
  )
}

export default UpdateProduct