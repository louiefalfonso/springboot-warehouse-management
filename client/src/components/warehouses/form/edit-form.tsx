import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DeleteWarehouseDialog from "../delete-warehouse";

type WarehouseFormProps = {
    warehouseName: string;
    setWarehouseName: (value: string) => void;
    warehouseCode: string;
    setWarehouseCode: (value: string) => void;
    officeHours: string;
    setOfficeHours: (value: string) => void;
    warehouseEmail:string;
    setWarehouseEmail: (value: string) => void;
    warehouseLocation: string;
    setWarehouseLocation: (value: string) => void;
    warehouseManager: string;
    setWarehouseManager: (value: string) => void;
    contactNumber: string;
    setContactNumber: (value: string) => void;
    description: string;
    setDescription: (value: string) => void; 
    handleSubmit: (e: React.FormEvent) => void;
    handleDelete: () => void;
    warehouseId: string; 
}

const EditWarehouseForm:React.FC<WarehouseFormProps> = React.memo(({
        warehouseName, setWarehouseName,
        warehouseCode, setWarehouseCode,
        officeHours, setOfficeHours,
        warehouseEmail, setWarehouseEmail,
        warehouseLocation, setWarehouseLocation,
        warehouseManager, setWarehouseManager,
        contactNumber, setContactNumber,
        description, setDescription,
        handleSubmit, handleDelete, warehouseId
    }) => {

    const formFields = [
        { label: "Warehouse Name", id: "warehouseName", value: warehouseName, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setWarehouseName(e.target.value) },
        { label: "Warehouse Code", id: "warehouseCode", value: warehouseCode, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setWarehouseCode(e.target.value) },
        { label: "Office Hours", id: "officeHours", value: officeHours, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setOfficeHours(e.target.value) },
        { label: "Warehouse Email", id: "warehouseEmail", value: warehouseEmail, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setWarehouseEmail(e.target.value) },
        { label: "Warehouse Manager", id: "warehouseManager", value: warehouseManager, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setWarehouseManager(e.target.value) },
        { label: "Contact Number", id: "contactNumber", value: contactNumber, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setContactNumber(e.target.value) }
    ]
  return (
    <form onSubmit={handleSubmit}>
        <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Warehouse Information</h2>
        <div className="grid auto-rows-min md:grid-cols-3">
          {formFields.map(({ label, id, value, onChange }) => (
            <div key={id} className="grid w-full items-center gap-4 p-4">
              <Label htmlFor={id}>{label}:</Label>
              <Input type="text" id={id} value={value} onChange={onChange} />
            </div>
          ))}
        </div>
        
        <div className="grid auto-rows-min md:grid-cols-2">
            <div className="grid w-full items-center gap-4 p-4">
             <Label htmlFor="warehouseLocation">Warehouse Location:</Label>
              <Textarea id="warehouseLocation" value={warehouseLocation} onChange={(e) => setWarehouseLocation(e.target.value)}/>     
            </div>
            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="description">Description:</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>    
            </div>
        </div>
        <div className="flex pl-4 mt-4 ">
            <Button type="submit" className=" bg-orange-600 hover:bg-orange-700" aria-label="Update Warehouse">Update Warehouse</Button>
            <DeleteWarehouseDialog warehouseId={warehouseId} onDelete={handleDelete} aria-label="Delete Warehouse"/>
            <Link to={`/warehouses`}>
            <Button className ="bg-gray-600 hover:bg-gray-700">Cancel</Button>
            </Link>
      </div>
    </form>    
  )

});

export default EditWarehouseForm