import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"
import Header from '../layout/header'
import MainLayout from '../layout/layout'

import EditWarehouseForm from "./form/edit-form";
import { useDeleteWarehouse, useUpdateWarehouse, useGetWarehouseById } from "@/services/warehouse-services";

const UpdateWarehouse = () => {
  
  // get treatement Id from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch treatment data
  const { data, isLoading } = useGetWarehouseById(id || "");
  const { mutate } = useUpdateWarehouse(id || "");
  const { mutate: deleteWarehouse } = useDeleteWarehouse();

  const [warehouseName, setWarehouseName] = useState("");
  const [warehouseCode, setWarehouseCode] = useState("");
  const [officeHours, setOfficeHours] = useState("");
  const [warehouseLocation, setWarehouseLocation] = useState("");
  const [warehouseManager, setWarehouseManager] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [description, setDescription] = useState("")

  // set form values when data is fetched
  useEffect(()=>{
    if(data){
      setWarehouseName(data.warehouseName);
      setWarehouseCode(data.warehouseCode);
      setOfficeHours(data.officeHours);
      setWarehouseLocation(data.warehouseLocation);
      setWarehouseManager(data.warehouseManager);
      setContactNumber(data.contactNumber);
      setDescription(data.description);
    }
  }, [data])

  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  // update warehouse
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(
      !warehouseName || !warehouseCode || !officeHours || !warehouseLocation ||
      !warehouseManager || !contactNumber || !description
    ){
        {
          toast.error("Please fill in all required fields.");
          return;
        }
    }

    const currentWarehouse ={
      id: id || "", 
      warehouseName, warehouseCode, officeHours, warehouseLocation, warehouseManager,contactNumber, description 
    }

    try {
      mutate(currentWarehouse, {
        onSuccess: () => {
          toast.success("Warehouse Updated Successfully");
          navigate("/warehouses");
        },
        onError: (error) => {
          console.error("Error Updating Warehouse:", error);
          toast.error("Error Updating Warehouse");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  // delete warehouse
  const handleDelete = () =>{
    try {
      deleteWarehouse(id || "", {
        onSuccess: () => {
          toast.success("Warehouses Deleted Successfully");
          navigate("/warehouses");
        },
        onError: (error) => {
          console.error("Error Deleting Warehouses:", error);
          toast.error("Failed to Delete Warehouses. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <MainLayout>
      <Header Title="Update Supplier" />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <EditWarehouseForm 
          warehouseName={warehouseName}
          setWarehouseName={setWarehouseName}
          warehouseCode={warehouseCode}
          setWarehouseCode={setWarehouseCode}
          officeHours={officeHours}
          setOfficeHours={setOfficeHours}
          warehouseLocation={warehouseLocation}
          setWarehouseLocation={setWarehouseLocation}
          warehouseManager={warehouseManager}
          setWarehouseManager={setWarehouseManager}
          contactNumber={contactNumber}
          setContactNumber={setContactNumber}
          description={description}
          setDescription={setDescription}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          warehouseId={id || ""}
          />
        </div>
      <Toaster />  
   </MainLayout>     
  )
}

export default UpdateWarehouse