import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import { Button } from "@/components/ui/button";

const SupplierDetails = () => {
  return (
    <MainLayout>
      <Header Title="Supplier Details" />
      <div className="flex flex-1 flex-col gap-4 p-4">

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