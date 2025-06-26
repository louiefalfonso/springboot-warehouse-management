import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import UpdateInventoryForm from "./form/edit-form";
import { useDeleteInventory, useGetInventoryById, useUpdateInventory } from "@/services/inventory-services";
import { useGetAllProducts } from "@/services/product-services";
import { useGetAllWarehouses } from "@/services/warehouse-services";

const UpdateInventory = () => {

   // get treatement Id from URL
  const { id } = useParams();
  const navigate = useNavigate();

   // fetch product data
    const { data, isLoading } = useGetInventoryById(id || "");
    const { mutate } = useUpdateInventory(id || "");
    const { mutate: deleteProduct } = useDeleteInventory();
    const { data: products } = useGetAllProducts();
    const { data: warehouses } = useGetAllWarehouses();

    const [inventoryCode, setInventoryCode] = useState("");
    const [quantity, setQuantity] = useState<number | null>(null);
    const [value, setValue] = useState("");
    const [location, setLocation] = useState("");
    const [reorderPoint, setReorderPoint] = useState<number | null>(null);
    const [unitCost, setUnitCost] = useState<number | null>(null);
    const [remarks, setRemarks] = useState("");
    const [inventoryManager, setInventoryManager] = useState("");
    
    const [productId, setProductId] = useState<number | null>(null);
    const [warehouseId, setWarehouseId] = useState<number | null>(null);
    useEffect(()=>{
      if(data){
        setInventoryCode(data.inventoryCode);
        setQuantity(data.quantity);
        setValue(data.value);
        setLocation(data.location);
        setReorderPoint(data.reorderPoint);
        setUnitCost(data.unitCost);
        setRemarks(data.remarks);
        setInventoryManager(data.inventoryManager);
        setProductId(data.product?.id ?? null);
        setWarehouseId(data.warehouse?.id ?? null);
      }
    }, [data]);

     if (isLoading) { return <div>Loading...</div>;}
     if (!data) { return <div>No data found</div>;}

     // update product
    const handleSubmit = (e:React.FormEvent)=>{
         e.preventDefault();

            if (!productId) {
              toast.error("Please select a product.");
              return;
            }
            if (!warehouseId) {
              toast.error("Please select a warehouse.");
              return;
            }

            if (
              !inventoryCode ||
              quantity === null ||
              !value ||
              !location ||
              reorderPoint === null ||
              unitCost === null ||
              !inventoryManager|| 
              !remarks||
              !productId ||
              !warehouseId 
            ) {
             {
                toast.error("Please fill in all required fields.");
                return;
              }
            }
            

            const currentInventory = {
                  id: id || "",
                  inventoryCode,
                  quantity,
                  value,
                  location,
                  reorderPoint,
                  unitCost,
                  remarks,
                  inventoryManager,
                  product:{ id: productId },
                  warehouse: { id: warehouseId },
            };
            try {
              mutate(currentInventory, {
                onSuccess: () => {
                  toast.success("Inventory Updated successfully");
                  navigate("/inventories");
                },
                onError: (error) => {
                  console.error("Error Updating Inventory:", error);
                  toast.error("Failed to Update Inventory. Please try again.");
                },
              });
            } catch (error) {
              console.error("Unexpected error:", error);
              toast.error("An unexpected error occurred. Please try again."); 
    }

     // delete inventory
    const handleDelete = () =>{
      try {
        deleteProduct(id || "", {
          onSuccess: () => {
            toast.success("Inventory Deleted successfully");
            navigate("/inventories");
          },
          onError: (error) => {
            console.error("Error Deleting Inventory:", error);
            toast.error("Failed to Delete Inventory. Please try again.");
          },
        });
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } 
  return (
   <MainLayout>
      <Header Title="Update Inventory" />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <UpdateInventoryForm
          inventoryCode= {inventoryCode}
          setInventoryCode={setInventoryCode}
          quantity={quantity}
          setQuantity={setQuantity}
          value={value}
          setValue={setValue} 
          location={location}
          setLocation={setLocation}
          reorderPoint={reorderPoint}
          setReorderPoint={setReorderPoint}
          unitCost={unitCost}
          setUnitCost={setUnitCost}
          remarks={remarks}
          setRemarks={setRemarks}
          inventoryManager={inventoryManager}
          setInventoryManager={setInventoryManager}
          productId={productId}
          setProductId={setProductId}
          products={products}
          warehouseId={warehouseId}
          setWarehouseId={setWarehouseId}
          warehouses={warehouses}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          inventoryId={id || ""}
          />
        </div>
   </MainLayout>     
  )
}

export default UpdateInventory