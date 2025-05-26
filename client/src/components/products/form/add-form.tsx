import React, { useState, useCallback, useMemo, } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Supplier = { id: number; supplierName: string; supplierCode: string;}
type Category = { id: number; categoryName: string; categoryCode: string; }

type Product = {
    id?: string; 
    productName?: string;
    productNumber?: string;
    description?: string;
    productBrand?:string;
    quantity?: number;
    sku?: string;
    price?: number;
    supplier: Supplier | null;
    category: Category | null;    
}

interface ProductProps {
    categories: Category[];
    suppliers: Supplier[];
    onSubmit: (product: Product) => void;
}

const AddNewProductForm:React.FC<ProductProps> = ({onSubmit, categories, suppliers}) => {

  const [productName, setProductName] = useState("");
  const [productNumber, setProductNumber] = useState("");
  const [description, setDescription] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const handleSupplierSelect = useCallback((supplierId: number) => {
    const supplier = suppliers.find((supplier) => supplier.id === supplierId) || null;
    setSelectedSupplier(supplier);
  }, [suppliers]);

  const handleCategorySelect = useCallback((categoryId: number) => {
    const category = categories.find((category) => category.id === categoryId) || null;
    setSelectedCategory(category);
  }, [categories]);

  const newProduct = useMemo<Product> (
    () => ({
        productName, productNumber, productBrand, description, sku, 
        quantity: quantity !== null ? quantity : undefined, 
        price: price !== null ? price : undefined,
        supplier: selectedSupplier,
        category: selectedCategory
    }),
    [productName, productNumber, productBrand, description, sku, quantity, price, selectedSupplier, selectedCategory]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedSupplier) {
      toast.error("Please Select a Supplier");
      return;
    }

    if (!selectedCategory) {
      toast.error("Please Select a Category");
      return;
    }

    onSubmit(newProduct);
  };


  return (
    <form onSubmit={handleSubmit}>
        <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Product Information</h2>
        <div className="grid auto-rows-min md:grid-cols-1">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="productName">Product Name:</Label>
                <Input type="text" id="productName" placeholder="Product Name" onChange={(e) => setProductName(e.target.value)}/>
            </div>
        </div>
        <div className="grid auto-rows-min md:grid-cols-1">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="description">Product Description:</Label>
                <Textarea id="description" placeholder="Description" onChange={(e) => setDescription(e.target.value)}/>
            </div>
        </div>
        <div className="grid auto-rows-min md:grid-cols-2">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="productNumber">Product Number:</Label>
                <Input type="text" id="productNumber" placeholder="Product Number" onChange={(e) => setProductNumber(e.target.value)}/>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="productBrand">Product Brand:</Label>
                <Input type="text" id="productBrand" placeholder="Product Brand" onChange={(e) => setProductBrand(e.target.value)}/>
            </div>
        </div>
        <div className="grid auto-rows-min md:grid-cols-3">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="sku">SKU:</Label>
                <Input type="text" id="sku" placeholder="SKU" onChange={(e) => setSku(e.target.value)}/>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="quantity">Quantity:</Label>
                <Input type="number" id="quantity" placeholder="Quantity" onChange={(e) => setQuantity(Number(e.target.value))}/>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="price">Price:</Label>
                <Input type="number" id="price" placeholder="Price" onChange={(e) => setPrice(Number(e.target.value))}/>
            </div>
        </div>
        <div className="grid auto-rows-min md:grid-cols-2">
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="category">Category:</Label>
                <Select onValueChange={(value: string) => handleCategorySelect(parseInt(value))}>
                    <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories?.map((category:Category) => (
                            <SelectItem key={category.id} value={category.id.toString()}>
                                {category.categoryName} - {category.categoryCode}
                            </SelectItem>
                        ))}
                        </SelectContent>
                </Select>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
                <Label htmlFor="supplier">Supplier:</Label>
                <Select onValueChange={(value: string) => handleSupplierSelect(parseInt(value))}>
                    <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Supplier" />
                    </SelectTrigger>
                    <SelectContent>
                        {suppliers?.map((supplier:Supplier) => (
                            <SelectItem key={supplier.id} value={supplier.id.toString()}>
                                {supplier.supplierName} - {supplier.supplierName}
                            </SelectItem>
                        ))}
                        </SelectContent>
                </Select>
            </div>
        </div>
        <div className="flex pl-4 mt-4 ">
            <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600"> Add New Product</Button>
            <Link to={`/products`}>
                <Button className ="bg-gray-500 hover:bg-gray-600">Back to Product Lists</Button>  
            </Link>
        </div>
    </form>
  )
}

export default AddNewProductForm