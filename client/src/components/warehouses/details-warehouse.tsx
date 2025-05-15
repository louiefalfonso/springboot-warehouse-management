import { useParams, Link } from "react-router-dom";
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import { Button } from "@/components/ui/button";

import { useGetWarehouseById } from "@/services/warehouse-services";
import WarehouseDetailsList from "./list/list-warehouse";

const WarehouseDetails = () => {

  const { id } = useParams();
  const { data: warehouseData, isLoading: isWarehouseLoading, error: warehouseError } = useGetWarehouseById(id || "");

  if (isWarehouseLoading) {
    return <div>Loading...</div>;
  }

  if (warehouseError) {
    console.error('Error details:', { warehouseError });
    return <div>Error loading data. Please check the console for more details.</div>;
  }

  if (!warehouseData) {
    return <div>No warehouse data found</div>;
  }

  return (
    <MainLayout>
      <Header Title="Warehouse Details"/>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <WarehouseDetailsList warehouseData={warehouseData}/>
        <div className="flex">
          <Link to={`/warehouses`}>
            <Button className="bg-gray-500 hover:bg-gray-600">Back to Warehouse List</Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}

export default WarehouseDetails