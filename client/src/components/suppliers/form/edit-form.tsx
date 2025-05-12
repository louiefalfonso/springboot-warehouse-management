import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DeleteSupplierDialog from "../delete-supplier";

type SupplierFormProps = {
  supplierName: string;
  setSupplierName: (value: string) => void;
  supplierCode: string;
  setSupplierCode: (value: string) => void;
  supplierCompany:string;
  setSupplierCompany: (value: string) => void;
  supplierEmail: string;
  setSupplierEmail: (value: string) => void;
  contactInfo: string;
  setContactInfo: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  contactAddress: string; 
  setContactAddress: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete: () => void;
  supplierId: string;
}

const EditSupplierForm:React.FC<SupplierFormProps> = React.memo(({
  supplierName, setSupplierName,
  supplierCode, setSupplierCode,
  supplierCompany, setSupplierCompany,
  supplierEmail, setSupplierEmail,
  contactInfo, setContactInfo,
  status, setStatus,
  contactAddress, setContactAddress,
  handleSubmit, handleDelete, supplierId
}) => {

  const formFields = [
    { label: "Supplier Name", id: "supplierName", value: supplierName, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSupplierName(e.target.value) },
    { label: "Supplier Code", id: "supplierCode", value: supplierCode, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSupplierCode(e.target.value) },
    { label: "Supplier Company", id: "supplierCompany", value: supplierCompany, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSupplierCompany(e.target.value) },
    { label: "Supplier Email", id: "supplierEmail", value: supplierEmail, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSupplierEmail(e.target.value) },
    { label: "Contact Number", id: "contactInfo", value: contactInfo, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setContactInfo(e.target.value) },
    { label: "Status", id: "status", value: status, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setStatus(e.target.value) }
  ]  
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Update Supplier Information</h2>
      <div className="grid auto-rows-min md:grid-cols-2">
        {formFields.map(({ label, id, value, onChange }) => (
          <div key={id} className="grid w-full items-center gap-4 p-4">
            <Label htmlFor={id}>{label}:</Label>
            <Input type="text" id={id} value={value} onChange={onChange} />
          </div>
        ))}
      </div>
      <div className="grid auto-rows-min md:grid-cols-1">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="contactAddress">Contact Address:</Label>
          <Textarea id="contactAddress" value={contactAddress} onChange={(e) => setContactAddress(e.target.value)}/>    
        </div>
      </div>
      <div className="flex pl-4 mt-4 ">
        <Button type="submit" className=" bg-orange-600 hover:bg-orange-700" aria-label="Update Supplier">Update Supplier</Button>
        <DeleteSupplierDialog supplierId={supplierId} onDelete={handleDelete} aria-label="Delete Supplier"/>
        <Link to={`/suppliers`}>
          <Button className ="bg-gray-500 hover:bg-gray-600">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  )
});

export default EditSupplierForm