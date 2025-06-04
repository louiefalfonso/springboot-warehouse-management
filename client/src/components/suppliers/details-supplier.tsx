import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import { Button } from "@/components/ui/button";

import { useGetSupplierById } from "@/services/supplier-services";
import SupplierDetailsList from "./lists/list-supplier";
import ProductsRecordsTable from "./lists/list-products";
import { useGetAllProducts } from "@/services/product-services";

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

const SupplierDetails = () => {

  const { id } = useParams();
  const { data: supplierData, isLoading: isSupplierLoading, error: supplierError } = useGetSupplierById(id || "");
  const { data: productData, isLoading: isProductLoading, error: productError } = useGetAllProducts();

  const supplierProduct = useMemo(() => {
    return productData?.filter((product: Product) => product.supplier.id.toString() === id);
  }, [productData, id]);


  if (isSupplierLoading || isProductLoading) {
    return <div>Loading...</div>;
  }

  if (supplierError || productError) {
    console.error('Error details:', { supplierError, productError });
    return <div>Error loading data. Please check the console for more details.</div>;
  }

  if (!supplierData || !productData) {
    return <div>No data found</div>;
  }

  return (
    <MainLayout>
      <Header Title="Supplier Details" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <SupplierDetailsList supplierData={supplierData}/>
        <ProductsRecordsTable productData={supplierProduct}/>
        <div className="flex">
          <Link to={`/suppliers`}>
            <Button className="bg-gray-600 hover:bg-gray-700">Back to Supplier List</Button>
          </Link>
        </div>   
      </div>
   </MainLayout> 
  )
}

export default SupplierDetails

