import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import { Button } from "@/components/ui/button";

import { useGetInventoryById } from "@/services/inventory-services";
import InventoryDetailsList from "./list/list-inventory";
import { useGetAllProducts } from "@/services/product-services";
import { useGetAllWarehouses } from "@/services/warehouse-services";
import WarehouseDetailsList from "./list/list-warehouse";
import ProductDetailsList from "./list/list-product";

type Product = {
    id: string; 
    productName: string;
    productNumber: string;
    description: string;
    productBrand:string;
    quantity: number;
    sku: string;
    price: number;
    supplier: { id: number;}
    category: { id: number;} 
}

type Warehouse = {
    id: string;
    warehouseName: string;
    warehouseCode: string;
    officeHours: string;
    warehouseEmail:string;
    warehouseLocation: string;
    warehouseManager: string;
    contactNumber: string;
    description: string;
}



const InventoryDetails = () => {

  const { id } = useParams();
  const { data: inventoryData, isLoading: isInventoryLoading, error: inventoryError } = useGetInventoryById(id || "");
  const { data: productData, isLoading: isProductLoading, error: productError } = useGetAllProducts()
  const { data: warehouseData, isLoading: isWarehouseLoading, error: warehouseError } = useGetAllWarehouses();
  
   const inventoryProduct = useMemo(() => {
    return productData?.filter((product: Product) => product.supplier.id.toString() === id);
  }, [productData, id]);

  const inventoryWarehouse = useMemo(() => {
    return warehouseData?.filter((warehouse: Warehouse) => warehouse.id.toString() === id);
  }, [warehouseData, id]);

  if (isInventoryLoading || isProductLoading || isWarehouseLoading) {
    return <div>Loading...</div>;
  }

  if (inventoryError || productError || warehouseError) {
    console.error('Error details:', { inventoryError });
    return <div>Error loading data. Please check the console for more details.</div>;
  }

  if (!inventoryData || !productData || !warehouseData) {
    return <div>No Inventory data found</div>;
  }

  return (
    <MainLayout>
      <Header Title="Inventory Details" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <InventoryDetailsList inventoryData={inventoryData} />
        <WarehouseDetailsList warehouseData={inventoryWarehouse}/>
        <ProductDetailsList productData={inventoryProduct}/>
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