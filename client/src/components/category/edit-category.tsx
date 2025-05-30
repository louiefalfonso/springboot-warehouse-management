import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"

import Header from '../layout/header'
import MainLayout from '../layout/layout'

import UpdateCategoryForm from "./form/update-form";
import { useDeleteCategory, useGetCategoryById, useUpdateCategory } from "@/services/category-services";

const UpdateCategory = () => {
   // get treatement Id from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch product data
 const { data, isLoading } = useGetCategoryById(id || "");
 const { mutate } = useUpdateCategory(id || "");
 const { mutate: deleteCategory } = useDeleteCategory();

 const [categoryName, setCategoryName] = useState("");
 const [categoryCode, setCategoryCode] = useState("");
 const [categoryDescription, setCategoryDescription] = useState("");
 const [categoryStatus, setCategoryStatus] = useState("");

  useEffect(()=>{
    if(data){
      setCategoryName(data.categoryName);
      setCategoryCode(data.categoryCode);
      setCategoryDescription(data.categoryDescription);
      setCategoryStatus(data.categoryStatus);
    }}, [data]);

  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  // update category
  const handleSubmit = (e:React.FormEvent)=>{
       e.preventDefault();

       const currentCategory = {
          id: id || "",
          categoryName, categoryCode, categoryDescription,categoryStatus
       }

       try {
            mutate(currentCategory, {
              onSuccess: () => {
                  toast.success("Category Updated Successfully");
                  navigate("/categories");
              },
              onError: (error) => {
                  console.error("Error Updating Category:", error);
                  toast.error("Error Updating Category");
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
      deleteCategory(id || "", {
        onSuccess: () => {
          toast.success("Category Deleted successfully");
          navigate("/categories");
        },
        onError: (error) => {
          console.error("Error Deleting Category:", error);
          toast.error("Failed to Delete Category. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
    } 

  return (
    <MainLayout>
      <Header Title="Update Category" />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <UpdateCategoryForm 
            categoryName={categoryName} 
            setCategoryName={setCategoryName}
            categoryCode={categoryCode} 
            setCategoryCode={setCategoryCode}
            categoryDescription={categoryDescription} 
            setCategoryDescription={setCategoryDescription}
            categoryStatus={categoryStatus} 
            setCategoryStatus={setCategoryStatus}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            categoryId={id || ""}
          />
        </div>
        <Toaster />  
   </MainLayout>       
  )
}

export default UpdateCategory