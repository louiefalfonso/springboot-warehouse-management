import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import { Button } from "@/components/ui/button";

import { useGetSupplierById } from "@/services/supplier-services";
import SupplierDetailsList from "./lists/list-supplier";

const SupplierDetails = () => {

  const { id } = useParams();
  const { data: supplierData, isLoading: isSupplierLoading, error: supplierError } = useGetSupplierById(id || "");

  if (isSupplierLoading) {
    return <div>Loading...</div>;
  }

  if (supplierError) {
    console.error('Error details:', { supplierError });
    return <div>Error loading data. Please check the console for more details.</div>;
  }

  if (!supplierData) {
    return <div>No doctor data found</div>;
  }

  return (
    <MainLayout>
      <Header Title="Supplier Details" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <SupplierDetailsList supplierData={supplierData}/>
        <div className="flex">
          <Link to={`/suppliers`}>
            <Button className="bg-gray-500 hover:bg-gray-600">Back to Supplier List</Button>
          </Link>
        </div>   
      </div>
   </MainLayout> 
  )
}

export default SupplierDetails

