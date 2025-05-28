import { useParams, Link } from "react-router-dom";
import Header from '../layout/header'
import MainLayout from '../layout/layout'
import { Button } from "@/components/ui/button";

import { useGetProductById } from "@/services/product-services";
import ProductDetailsList from "./list/list-product"

const ProductDetails = () => {

    const { id } = useParams();
    const { data: productData, isLoading: isProductLoading, error: productError } = useGetProductById(id || "");

    if (isProductLoading) {
        return <div>Loading...</div>;
    }

    if (productError) {
        console.error('Error details:', { productError });
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