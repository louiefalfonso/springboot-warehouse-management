import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import { Button } from "@/components/ui/button";

import { useGetInventoryById } from "@/services/inventory-services";
import InventoryDetailsList from "./list/list-inventory";

import WarehouseDetailsList from "./list/list-warehouse";
import ProductDetailsList from "./list/list-product";

const InventoryDetails = () => {

  const { id } = useParams();
  const { data: inventoryData, isLoading: isInventoryLoading, error: inventoryError } = useGetInventoryById(id || "");

  // Filter product for the specific inventory
  const inventoryProduct = useMemo(() => {
    if(!inventoryData || !inventoryData.product) return[];
    return inventoryData.product;
  }, [inventoryData]);

  // Filter warehouse for the specific inventory
  const inventoryWarehouse = useMemo(() => {
    if(!inventoryData || !inventoryData.warehouse) return[];
    return inventoryData.warehouse;
  }, [inventoryData]);


  if (isInventoryLoading) {
    return <div>Loading...</div>;
  }

  if (inventoryError) {
    console.error('Error details:', { inventoryError });
    return <div>Error loading data. Please check the console for more details.</div>;
  }

  if (!inventoryData) {
    return <div>No Inventory data found</div>;
  }

  return (
    <MainLayout>
      <Header Title="Inventory Details" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <InventoryDetailsList inventoryData={inventoryData} />
        <ProductDetailsList productData={inventoryProduct}/>
        <WarehouseDetailsList warehouseData={inventoryWarehouse}/>
        <div className="flex">
          <Link to={`/inventories`}>
            <Button className="bg-gray-500 hover:bg-gray-600">Back to Inventory List</Button>
          </Link>
        </div>
      </div>
   </MainLayout>   
  )
}

export default InventoryDetails