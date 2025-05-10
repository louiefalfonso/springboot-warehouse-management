import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Supplier = {
    id?: string; 
    supplierName?: string;
    supplierCode?: string;
    supplierCompany?:string;
    supplierEmail?: string;
    contactInfo?: string;
    status?: string;
    contactAddress?: string;   
}

interface SupplierProps{
  onSubmit: (supplier: Supplier) => void;
}

const AddNewSupplierForm:React.FC<SupplierProps> = ({onSubmit}) => {

  // Group State Variables
  const [supplierData, setSupplierData] = useState({
    supplierName:"",
    supplierCode:"",
    supplierCompany:"",
    supplierEmail:"",
    contactInfo:"",
    status:"",
    contactAddress:""
  })

  // Input handlers to use handleInputChange
  const handleInputChange = (field: keyof typeof supplierData, value: string ) => {
        setSupplierData((prev) => ({ ...prev, [field]: value }));
  };

  const newSupplier = useMemo<Supplier>(
      ()=>({ id: "", ...supplierData }), [supplierData]
  );

  const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            onSubmit(newSupplier);
 }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Add New Supplier Information</h2>
      <div className="grid auto-rows-min md:grid-cols-2">
        <div className="grid w-full items-center gap-4 p-4">
           <Label htmlFor="supplierName">Supplier Name:</Label>
           <Input type="text" id="supplierName" placeholder="Supplier Name" onChange={(e: { target: { value: string; }; }) => handleInputChange("supplierName", e.target.value)}/>
           <Label htmlFor="supplierCode">Supplier Code:</Label>
           <Input type="text" id="supplierCode" placeholder="Supplier Code" onChange={(e: { target: { value: string; }; }) => handleInputChange("supplierCode", e.target.value)}/>
           <Label htmlFor="supplierCompany">Supplier Company:</Label>
           <Input type="text" id="supplierCompany" placeholder="Supplier Company" onChange={(e: { target: { value: string; }; }) => handleInputChange("supplierCompany", e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="supplierEmail">Supplier Email:</Label>
          <Input type="text" id="supplierEmail" placeholder="Supplier Email" onChange={(e: { target: { value: string; }; }) => handleInputChange("supplierEmail", e.target.value)}/>
          <Label htmlFor="contactInfo">Contact Number:</Label>
          <Input type="text" id="contactInfo" placeholder="Contact Number" onChange={(e: { target: { value: string; }; }) => handleInputChange("contactInfo", e.target.value)}/>
          <Label htmlFor="status">Status:</Label>
          <Input type="text" id="status" placeholder="Status" onChange={(e: { target: { value: string; }; }) => handleInputChange("contactInfo", e.target.value)}/>
        </div>
        
      </div>
      <div className="grid auto-rows-min md:grid-cols-1">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="contactAddress">Contact Address:</Label>
          <Textarea id="contactAddress" placeholder="Contact Address" onChange={(e: { target: { value: string; }; }) => handleInputChange("contactAddress", e.target.value)}/>
        </div>
      </div>
       <div className="flex pl-4 mt-4 ">
            <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600">
              Add New Supplier
            </Button>
            <Link to={`/suppliers`}>
              <Button className="bg-gray-500 hover:bg-gray-600">Back</Button>
            </Link>
        </div>
    </form>
  )
}

export default AddNewSupplierForm