import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DeleteCategoryDialog from "../delete-category";

type CategoryFormProps = {
    categoryName: string;
    setCategoryName: (value: string) => void;
    categoryCode: string;
    setCategoryCode: (value: string) => void;
    categoryDescription: string;
    setCategoryDescription: (value: string) => void;
    categoryStatus: string;
    setCategoryStatus: (value: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleDelete: () => void;
    categoryId: string;
}

const UpdateCategoryForm:React.FC<CategoryFormProps> = ({
    categoryName, setCategoryName,
    categoryCode, setCategoryCode,
    categoryDescription, setCategoryDescription,
    categoryStatus, setCategoryStatus,
    handleSubmit,
    handleDelete,
    categoryId
}) => {
  return (
     <form onSubmit={handleSubmit}>
        <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0 m-4">Category Information</h2>
      <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="categoryName">Category Name:</Label>
          <Input type="text" id="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="categoryCode">Category Code:</Label>
          <Input type="text" id="categoryCode" value={categoryCode} onChange={(e) => setCategoryCode(e.target.value)}/>
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="categoryStatus">Category Status:</Label>
          <Input type="text" id="categoryStatus" value={categoryStatus} onChange={(e) => setCategoryStatus(e.target.value)}/>
        </div>
      </div>
      <div className="grid auto-rows-min md:grid-cols-1">
        <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="categoryDescription">Description:</Label>
            <Textarea id="categoryDescription" value={categoryDescription} onChange={(e) => setCategoryDescription(e.target.value)}/>
        </div>
      </div>
      <div className="flex pl-4 mt-4 ">
        <Button type="submit" className="bg-orange-600 hover:bg-orange-700" aria-label="Update Category">Update Category</Button>
          <DeleteCategoryDialog categoryId={categoryId} onDelete={handleDelete} aria-label="Delete Category"/>
          <Link to={`/categories`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back to Categories</Button>  
          </Link>
      </div>
     </form>
  )
}

export default UpdateCategoryForm