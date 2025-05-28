import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DeleteProductDialog from "../delete-product";

type Supplier = { id: number; supplierName: string; supplierCode: string;}
type Category = { id: number; categoryName: string; categoryCode: string; }

type ProductFormProps = {
    productName: string;
    setProductName: (value: string) => void;
    productNumber: string;
    setProductNumber: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    productBrand: string;
    setProductBrand: (value: string) => void;
    sku: string;
    setSku: (value: string) => void;
    quantity: number | null;
    setQuantity: (value: number | null) => void;
    price: number | null;
    setPrice: (value: number | null) => void;
    categoryId: number | null;
    setCategoryId: (value: number | null) => void;
    categories: Category[] | undefined;
    supplierId: number | null;
    setSupplierId: (value: number | null) => void;
    suppliers: Supplier[] | undefined;
    handleSubmit: (e: React.FormEvent) => void;
    handleDelete: () => void;
    productId: string;
}
const UpdateProductForm:React.FC<ProductFormProps> = ({
    productName, setProductName, 
    productNumber, setProductNumber, 
    description, setDescription, 
    productBrand, setProductBrand, 
    sku, setSku, 
    quantity, setQuantity, 
    price, setPrice, 
    categoryId, setCategoryId, 
    categories, 
    supplierId, setSupplierId, 
    suppliers,
    handleSubmit,
    handleDelete,
    productId
}) => {
  return (
    <form onSubmit={handleSubmit}>
        <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Product Information</h2>
        <div className="grid auto-rows-min md:grid-cols-1">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="productName">Product Name:</Label>
                <Input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)}/>
            </div>
        </div>
        <div className="grid auto-rows-min md:grid-cols-1">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="description">Product Description:</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
        </div>
        <div className="grid auto-rows-min md:grid-cols-2">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="productNumber">Product Number:</Label>
                <Input type="text" id="productNumber" value={productNumber} onChange={(e) => setProductNumber(e.target.value)}/>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="productBrand">Product Brand:</Label>
                <Input type="text" id="productBrand" value={productBrand} onChange={(e) => setProductBrand(e.target.value)}/>
            </div>
        </div>
        <div className="grid auto-rows-min md:grid-cols-3">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="sku">SKU:</Label>
                <Input type="text" id="sku" value={sku} onChange={(e) => setSku(e.target.value)}/>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="quantity">Quantity:</Label>
                <Input type="number" id="quantity" value={ quantity !== null ? quantity : ''} onChange={(e) => setQuantity(Number(e.target.value))}/>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="price">Price:</Label>
                <Input type="number" id="price" value={ price !== null ? price : ''} onChange={(e) => setPrice(Number(e.target.value))}/>
            </div>
            
        </div>
        <div className="grid auto-rows-min md:grid-cols-2">
                <div className="grid w-full items-center gap-4 p-4">
                    <Label htmlFor="category">Category:</Label>
                    <Select value={categoryId ? categoryId.toString() : undefined} onValueChange={(value) => {
                        const parsedValue = parseInt(value);
                        if (!isNaN(parsedValue)) {
                            setCategoryId(parsedValue);
                            }
                        }}
                    >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories?.map((category: Category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                                {category.categoryName} - {category.categoryCode}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid w-full items-center gap-4 p-4">
                    <Label htmlFor="supplier">Supplier:</Label>
                    <Select value={supplierId ? supplierId.toString() : undefined} onValueChange={(value) => {
                        const parsedValue = parseInt(value);
                        if (!isNaN(parsedValue)) {
                            setSupplierId(parsedValue);
                            }
                        }}
                    >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Supplier" />
                    </SelectTrigger>
                    <SelectContent>
                        {suppliers?.map((supplier: Supplier) => (
                            <SelectItem key={supplier.id} value={supplier.id.toString()}>
                                {supplier.supplierName} - {supplier.supplierCode}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select> 
                </div>
            </div>
        <div className="flex pl-4 mt-4 ">
          <Button type="submit" className="bg-orange-600 hover:bg-orange-700" aria-label="Update Product">Update Product</Button>
          <DeleteProductDialog productId={productId} onDelete={handleDelete} aria-label="Delete Product"/>
          <Link to={`/products`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back to Products</Button>  
          </Link>
      </div>
    </form>
  )
}

export default UpdateProductForm