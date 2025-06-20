import React, { useState, useCallback, useMemo, } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Product = { id: number; productName: string; productCode: string; }
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
  const [remarks, setRemarks] = useState("");
  const [inventoryManager, setInventoryManager] = useState("");;
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
    
    if (!selectedProduct) {
      toast.error("Please Select a Product");
      return;
    }

    if (!selectedWarehouse) {
      toast.error("Please Select a Warehouse");
      return;
    }

    onSubmit(newInventory);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Inventory Information</h2>
    </form>
  )
}

export default AddNewInventoryForm