import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DeleteInventoryDialog from "../delete-inventory";

type Product = { id: number; productName: string; productNumber: string; }
type Warehouse = { id: number; warehouseName: string; warehouseCode: string; }

type InventoryFormProps ={
    inventoryCode: string;
    setInventoryCode: (value: string) => void;
    quantity: number | null;
    setQuantity: (value: number | null) => void;
    value: string;
    setValue: (value: string) => void;
    location: string;
    setLocation: (value: string) => void;
    reorderPoint: number | null;
    setReorderPoint: (value: number | null) => void;
    unitCost: number | null;
    setUnitCost: (value: number | null) => void;
    remarks: string;
    setRemarks: (value: string) => void;
    inventoryManager: string;
    setInventoryManager: (value: string) => void;
    productId: number | null;
    setProductId: (value: number | null) => void;
    products: Product[] | undefined;
    warehouseId: number | null;
    setWarehouseId: (value: number | null) => void;
    warehouses: Warehouse[] | undefined;
    handleSubmit: (e: React.FormEvent) => void;
    handleDelete: () => void;
    inventoryId: string;
}

const EditInventoryForm:React.FC<InventoryFormProps> = ({
  inventoryCode, setInventoryCode, 
  quantity, setQuantity, 
  value, setValue, 
  location, setLocation, 
  reorderPoint, setReorderPoint, 
  unitCost, setUnitCost, 
  remarks, setRemarks, 
  inventoryManager, setInventoryManager,
  productId, setProductId, products,
  warehouseId, setWarehouseId, warehouses,
  handleSubmit,
  handleDelete,
  inventoryId
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Inventory Information</h2>
      <div className="grid auto-rows-min md:grid-cols-2">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="product">Product:</Label>
          <Select value={productId ? productId.toString() : ""} 
                onValueChange={(value) => { const parsedValue = parseInt(value);
                        if (!isNaN(parsedValue)) {
                            setProductId(parsedValue);
                        }
                        }} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                    {products?.map((product: Product) => (
                      <SelectItem key={product.id} value={product.id.toString()}>
                        {product.productNumber} - {product.productName}
                      </SelectItem>
                    ))}
                </SelectContent>
          </Select>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="warehouse">Warehouse:</Label>
          <Select value={warehouseId ? warehouseId.toString() : ""} 
                onValueChange={(value) => { const parsedValue = parseInt(value);
                        if (!isNaN(parsedValue)) {
                            setWarehouseId(parsedValue);
                        }
                        }} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Warehouse" />
                </SelectTrigger>
                <SelectContent>
                    {warehouses?.map((warehouse: Warehouse) => (
                      <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                        {warehouse.warehouseCode} - {warehouse.warehouseName}
                      </SelectItem>
                    ))}
                </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="inventoryCode">Inventory Code:</Label>
            <Input type="text" id="inventoryCode" value={inventoryCode} onChange={(e) => setInventoryCode(e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="quantity">Quantity:</Label>
            <Input type="number" id="quantity" value={quantity !== null ? quantity : ""} onChange={(e) => setQuantity(Number(e.target.value))}/>
        </div>   
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="value">Value:</Label>
            <Input type="text" id="value" value={value} onChange={(e) => setValue(e.target.value)}/>
        </div> 
      </div>
       <div className="grid auto-rows-min md:grid-cols-1">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="location">Location:</Label>
          <Textarea id="location" value={location} onChange={(e) => setLocation(e.target.value)}/>
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="reorderPoint">Reorder Point:</Label>
            <Input type="number" id="reorderPoint" value={reorderPoint !== null ? reorderPoint : ""} onChange={(e) => setReorderPoint(Number(e.target.value))}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="unitCost">Unit Cost:</Label>
            <Input type="number" id="unitCost" value={unitCost !== null ? unitCost : ""} onChange={(e) => setUnitCost(Number(e.target.value))}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="inventoryManager">Inventory Manager:</Label>
            <Input type="text" id="inventoryManager" value={inventoryManager} onChange={(e) => setInventoryManager(e.target.value)}/>
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-1">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="remarks">Remarks:</Label>
          <Textarea id="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)}/>
        </div>
      </div>
      <div className="flex pl-4 mt-4 ">
          <Button type="submit" className="bg-orange-600 hover:bg-orange-700" aria-label="Update Inventory">Update Inventory</Button>
          <DeleteInventoryDialog inventoryId={inventoryId} onDelete={handleDelete} aria-label="Delete Inventory"/>
          <Link to={`/products`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Cancel</Button>  
          </Link>
      </div>
    </form>   
  )
}

export default EditInventoryForm