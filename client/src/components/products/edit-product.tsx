import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import UpdateProductForm from "./form/edit-form";
import { useDeleteProduct, useGetProductById, useUpdateProduct } from "@/services/product-services";

const UpdateProduct = () => {
    // get treatement Id from URL
    const { id } = useParams();
    const navigate = useNavigate();

    // fetch product data
    const { data, isLoading } = useGetProductById(id || "");
    const { mutate } = useUpdateProduct(id || "");
    const { mutate: deleteProduct } = useDeleteProduct();


  return (
    <MainLayout>
      <Header Title="Update Treatment" />
        <div className="flex flex-1 flex-col gap-4 p-4">
            
        </div>
    </MainLayout>    
  )
}

export default UpdateProduct