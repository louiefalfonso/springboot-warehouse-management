import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import EditSupplierForm from "./form/edit-form";
import { useDeleteSupplier, useUpdateSupplier, useGetSupplierById } from "@/services/supplier-services";

const UpdateSupplier = () => {

  // get treatement Id from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch treatment data
  const { data, isLoading } = useGetSupplierById(id || "");
  const { mutate } = useUpdateSupplier(id || "");
  const { mutate: deleteSupplier } = useDeleteSupplier();

  const [supplierName, setSupplierName] = useState("");
  const [supplierCode, setSupplierCode] = useState("");
  const [supplierCompany, setSupplierCompany] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [status, setStatus] = useState("");
  const [contactAddress, setContactAddress] = useState("");

 // set form values when data is fetched
 useEffect (()=>{
  if(data){
    setSupplierName(data.supplierName);
    setSupplierCode(data.supplierCode);
    setSupplierCompany(data.supplierCompany);
    setSupplierEmail(data.supplierEmail);
    setContactInfo(data.contactInfo);
    setStatus(data.status);
    setContactAddress(data.contactAddress)
  }
 },[data])

  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  // update supplier
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(
      !supplierName || !supplierCode || !supplierCompany || !supplierEmail ||
      !contactInfo|| !status || !contactAddress){
         {
          toast.error("Please fill in all required fields.");
          return;
        }
      }
    
      const currentSupplier ={
      id: id || "",
      supplierName, supplierCode, supplierCompany, supplierEmail, contactInfo, status, contactAddress
    }

    try {
      mutate(currentSupplier, {
        onSuccess: () => {
          toast.success("Supplier Updated Successfully");
          navigate("/suppliers");
        },
        onError: (error) => {
          console.error("Error Updating Supplier:", error);
          toast.error("Error Updating Supplier");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  // delete supplier
  const handleDelete = () =>{
    try {
      deleteSupplier(id || "", {
        onSuccess: () => {
          toast.success("Supplier Deleted successfully");
          navigate("/suppliers");
        },
        onError: (error) => {
          console.error("Error Deleting Supplier:", error);
          toast.error("Failed to Delete Supplier. Please try again.");
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
          <EditSupplierForm
          supplierName={supplierName}
          setSupplierName={setSupplierName}
          supplierCode={supplierCode}
          setSupplierCode={setSupplierCode}
          supplierCompany={supplierCompany}
          setSupplierCompany={setSupplierCompany}
          supplierEmail={supplierEmail}
          setSupplierEmail={setSupplierEmail}
          contactInfo={contactInfo}
          setContactInfo={setContactInfo}
          status={status}
          setStatus={setStatus}
          contactAddress={contactAddress}
          setContactAddress={setContactAddress}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          supplierId={id || ""}
          />
        </div>
       <Toaster />  
    </MainLayout>    
  )
}

export default UpdateSupplier