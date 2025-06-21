import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"
import Header from '@/components/layout/header'
import MainLayout from '@/components/layout/layout';
import { useDeleteInventory, useGetInventoryById, useUpdateInventory } from "@/services/inventory-services";

const EditInventoryForm = () => {

  // get treatement Id from URL
  const { id } = useParams();
  const navigate = useNavigate();
  
  // fetch product data
  const { data, isLoading } = useGetInventoryById(id || "");
  const { mutate } = useUpdateInventory(id || "");
  const { mutate: deleteInventory } = useDeleteInventory();

  return (
    <MainLayout>
      <Header Title="Update Product" />
        <div className="flex flex-1 flex-col gap-4 p-4">
        </div>
      <Toaster />    
   </MainLayout>     
  )
}

export default EditInventoryForm