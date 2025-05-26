import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Category = {
    id: string;
    categoryName?: string;
    categoryCode?: string;
    categoryDescription?: string;
    categoryStatus?:string;
}

interface CategoryProps {
    onSubmit: (category: Category) => void;
}

const AddNewCategoryForm:React.FC<CategoryProps> = ({onSubmit}) => {
  
   // Group State Variables
   const [categoryData, setCategoryData] = useState({
    categoryName: "",
    categoryCode: "",
    categoryDescription:"",
    categoryStatus: ""
   })

  // Input handlers to use handleInputChange
 const handleInputChange = (field: keyof typeof categoryData, value: string ) => {
        setCategoryData((prev) => ({ ...prev, [field]: value }));
  };

  const newCategory = useMemo<Category>(
      ()=>({ id: "", ...categoryData }), [categoryData]
  );

    const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            onSubmit(newCategory);
 }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Add New Category</h2>
      <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="categoryName">Category Name:</Label>
          <Input type="text" id="categoryName" placeholder="Category Name" onChange={(e: { target: { value: string; }; }) => handleInputChange("categoryName", e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="categoryCode">Category Code:</Label>
          <Input type="text" id="categoryCode" placeholder="Category Code" onChange={(e: { target: { value: string; }; }) => handleInputChange("categoryCode", e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="categoryStatus">Category Status:</Label>
          <Input type="text" id="categoryStatus" placeholder="Category Status" onChange={(e: { target: { value: string; }; }) => handleInputChange("categoryStatus", e.target.value)}/>
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-1">
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="categoryDescription">Description:</Label>
            <Textarea id="categoryDescription" placeholder="Category Description" onChange={(e: { target: { value: string; }; }) => handleInputChange("categoryDescription", e.target.value)}/>
        </div>
      </div>
      <div className="flex pl-4 mt-4 ">
            <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600">
              Add New Category
            </Button>
            <Link to={`/categories`}>
              <Button className="bg-gray-500 hover:bg-gray-600">Back</Button>
            </Link>
        </div>
    </form>
  )
}

export default AddNewCategoryForm