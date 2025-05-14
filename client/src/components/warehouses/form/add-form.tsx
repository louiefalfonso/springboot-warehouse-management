import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Warehouse = {
    id?: string;
    warehouseName?: string;
    warehouseCode?: string;
    officeHours?: string;
    warehouseLocation?: string;
    warehouseManager?: string;
    contactNumber?: string;
    description?: string;
}

interface WarehouseProps{
  onSubmit: (warehouse: Warehouse) => void;
}

const AddNewWarehouseForm:React.FC<WarehouseProps> = ({onSubmit}) => {

  // Group State Variables
  const [warehouseData, setWarehouseData] = useState({
    warehouseName: "",
    warehouseCode: "",
    officeHours: "",
    warehouseLocation: "",
    warehouseManager: "",
    contactNumber: "",
    description: ""
  })

  // Input handlers to use handleInputChange
  const handleInputChange = (field: keyof typeof warehouseData, value: string ) => {
        setWarehouseData((prev) => ({ ...prev, [field]: value }));
  };

  const newWarehouse = useMemo<Warehouse>(
      ()=>({ id: "", ...warehouseData }), [warehouseData]
  );

  const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            onSubmit(newWarehouse);
 }

  return (
    <form onSubmit={handleSubmit}>
        <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Add New Warehouse Information</h2>
        <div className="grid auto-rows-min md:grid-cols-3">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="warehouseName">Warehouse Name:</Label>
                <Input type="text" id="warehouseName" placeholder="Warehouse Name" onChange={(e: { target: { value: string; }; }) => handleInputChange("warehouseName", e.target.value)}/>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="warehouseCode">Warehouse Code:</Label>
                <Input type="text" id="warehouseCode" placeholder="Warehouse Code" onChange={(e: { target: { value: string; }; }) => handleInputChange("warehouseCode", e.target.value)}/>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="officeHours">Office Hours:</Label>
                <Input type="text" id="officeHours" placeholder="Office Hours" onChange={(e: { target: { value: string; }; }) => handleInputChange("officeHours", e.target.value)}/>
            </div>
        </div>
        <div className="grid auto-rows-min md:grid-cols-3">
         <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="warehouseLocation">Warehouse Location:</Label>
              <Input type="text" id="warehouseLocation" placeholder="Warehouse Location" onChange={(e: { target: { value: string; }; }) => handleInputChange("warehouseLocation", e.target.value)}/>
          </div>
          <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="warehouseManager">Warehouse Manager:</Label>
              <Input type="text" id="warehouseManager" placeholder="Warehouse Manager" onChange={(e: { target: { value: string; }; }) => handleInputChange("warehouseManager", e.target.value)}/>
          </div>
          <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="contactNumber">Contact Number:</Label>
              <Input type="text" id="contactNumber" placeholder="Contact Number" onChange={(e: { target: { value: string; }; }) => handleInputChange("contactNumber", e.target.value)}/>
          </div>  
        </div>
        <div className="grid auto-rows-min md:grid-cols-1">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="description">Description:</Label>
                <Textarea id="description" placeholder="Description" onChange={(e: { target: { value: string; }; }) => handleInputChange("description", e.target.value)}/>
            </div>
      </div>
        <div className="flex pl-4 mt-4 ">
            <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600">
              Add New Warehouse
            </Button>
            <Link to={`/warehouses`}>
              <Button className="bg-gray-500 hover:bg-gray-600">Back</Button>
            </Link>
        </div>
    </form>
  )
}

export default AddNewWarehouseForm