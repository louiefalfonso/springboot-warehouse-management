import React, { useState, useCallback, useMemo, } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Product = { id: number; productName: string; productNumber: string; }
type Warehouse = { id: number; warehouseName: string; warehouseCode: string; }

type Inventory = {
    id?: string;
    inventoryCode?: string;
    quantity?: number;
    value?: string;
    location?: string;
    reorderPoint?: number;
    unitCost?: number;
    remarks?: string;
    inventoryManager?: string;
    product: Product | null;
    warehouse: Warehouse | null;
}

interface InventoryProps {
    products: Product[];
    warehouses: Warehouse[];
    onSubmit: (inventory: Inventory) => void;
}

const AddNewInventoryForm:React.FC<InventoryProps> = ({onSubmit, products, warehouses}) => {

  const [inventoryCode, setInventoryCode] = useState("");
  const [quantity, setQuantity] = useState<number | null>(null);
  const [value, setValue] = useState("");
  const [location, setLocation] = useState("");
  const [reorderPoint, setReorderPoint] = useState<number | null>(null);
  const [unitCost, setUnitCost] = useState<number | null>(null);
  const [inventoryManager, setInventoryManager] = useState("");
  const [remarks, setRemarks] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);

  const handleProductSelect = useCallback((productId: number) => {
    const product = products.find((product) => product.id === productId) || null;
    setSelectedProduct(product);
  }, [products]);

   const handleWarehouseSelect = useCallback((warehouseId: number) => {
    const warehouse = warehouses.find((warehouse) => warehouse.id === warehouseId) || null;
    setSelectedWarehouse(warehouse);
  }, [warehouses]);

  const newInventory = useMemo<Inventory>(
    () => ({
      inventoryCode,value,location,remarks, inventoryManager,
      quantity: quantity !== null ? quantity : undefined,
      reorderPoint: reorderPoint !== null ? reorderPoint : undefined,
      unitCost: unitCost !== null ? unitCost : undefined,
      product: selectedProduct,
      warehouse: selectedWarehouse
    }),
    [
      inventoryCode, quantity, value, location, reorderPoint, unitCost, 
      remarks, inventoryManager, selectedProduct, selectedWarehouse
    ]
  );

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProduct) { toast.error("Please Select a Product");
      return;
    }

    if (!selectedWarehouse) { toast.error("Please Select a Warehouse");
      return;
    }

    onSubmit(newInventory);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Inventory Information</h2>
      <div className="grid auto-rows-min md:grid-cols-2">
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="product">Product:</Label>
            <Select onValueChange={(value: string) => handleProductSelect(parseInt(value))}>
                <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                        {products?.map((product:Product) => (
                            <SelectItem key={product.id} value={product.id.toString()}>
                                {product.productNumber} - {product.productName}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="warehouse">Warehouse:</Label>
            <Select onValueChange={(value: string) => handleWarehouseSelect(parseInt(value))}>
                <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Warehouse" />
                </SelectTrigger>
                <SelectContent>
                        {warehouses?.map((warehouse:Warehouse) => (
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
            <Input type="text" id="inventoryCode" placeholder="Inventory Code" onChange={(e) => setInventoryCode(e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="quantity">Quantity:</Label>
            <Input type="number" id="quantity" placeholder="Quantity" onChange={(e) => setQuantity(Number(e.target.value))}/>
        </div>   
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="value">Value:</Label>
            <Input type="text" id="value" placeholder="Value" onChange={(e) => setValue(e.target.value)}/>
        </div> 
      </div>
      <div className="grid auto-rows-min md:grid-cols-1">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="location">Location:</Label>
          <Textarea id="location" placeholder="Location" onChange={(e) => setLocation(e.target.value)}/>
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="reorderPoint">Reorder Point:</Label>
            <Input type="number" id="reorderPoint" placeholder="Reorder Point" onChange={(e) => setReorderPoint(Number(e.target.value))}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="unitCost">Unit Cost:</Label>
            <Input type="number" id="unitCost" placeholder="Unit Cost" onChange={(e) => setUnitCost(Number(e.target.value))}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="inventoryManager">Inventory Manager:</Label>
            <Input type="text" id="inventoryManager" placeholder="Inventory Manager" onChange={(e) => setInventoryManager(e.target.value)}/>
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-1">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="remarks">Remarks:</Label>
          <Textarea id="remarks" placeholder="Remarks" onChange={(e) => setRemarks(e.target.value)}/>
        </div>
      </div>
      <div className="flex pl-4 mt-4 ">
            <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600"> Add New Inventory</Button>
            <Link to={`/inventories`}>
                <Button className ="bg-gray-500 hover:bg-gray-600">Back to Inventory Lists</Button>  
            </Link>
      </div>
    </form>
  )
}

export default AddNewInventoryForm