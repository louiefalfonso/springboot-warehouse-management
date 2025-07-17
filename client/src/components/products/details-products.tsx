import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import { Button } from "@/components/ui/button";

import { useGetProductById } from "@/services/product-services";
import ProductDetailsList from "./list/list-product"
import SupplierDetailTable from "./list/list-supplier";

const ProductDetails = () => {

    const { id } = useParams();
    const { data: productData, isLoading: isProductLoading, error: productError } = useGetProductById(id || "");
    
   // Filter supplier for the specific product
    const productSupplier = useMemo(() => {
        if(!productData || !productData.supplier) return [];
        return productData.supplier;
    }, [productData]);


    if (isProductLoading) {
        return <div>Loading...</div>;
    }

    if (productError) {
        console.error('Error details:', { productError});
        return <div>Error loading data. Please check the console for more details.</div>;
    }

    if (!productData) {
        return <div>No Product data found</div>;
    }
  
    return (
    <MainLayout>
      <Header Title="Product Details" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <ProductDetailsList productData={productData} />
        <SupplierDetailTable supplierData={productSupplier} />
        <div className="flex">
          <Link to={`/products`}>
            <Button className="bg-gray-500 hover:bg-gray-600">Back to Product List</Button>
          </Link>
        </div>
      </div>
   </MainLayout>   
  )
}

export default ProductDetails