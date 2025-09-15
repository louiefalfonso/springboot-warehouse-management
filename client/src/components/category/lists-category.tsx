import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import { useGetAllCategories } from "@/services/category-services";

const CategoryLists = () => {

   // Declare state variables
  const { data, isLoading, refetch } = useGetAllCategories();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handle loading state
  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  interface Category {
    id: string;
    categoryName: string;
    categoryCode: string;
    categoryDescription: string;
    categoryStatus: string; 
  }

  // Filter category based on search query
  const filteredCategories: Category[] = searchQuery
  ? data.filter((category: Category) =>
      category.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.categoryStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.categoryCode.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : data;

  // Pagination
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

   // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between items-center pb-5 space-y-2 md:space-y-0 md:space-x-2">
          <Link to={`/categories/add`}>
            <Button className ="bg-green-500 hover:bg-green-600">Add New Category</Button>
          </Link>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="p-2 border rounded"/>
            <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => { setSearchQuery(""); refetch(); }}> Clear Search</Button>
          </div>
        </div>
        <div className="min-w-full">
          <Table>
            <TableHeader>
              <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Category Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCategories.map((category: Category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.categoryCode}</TableCell>
                  <TableCell>{category.categoryName}</TableCell>
                  <TableCell>{category.categoryStatus}</TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={category.categoryDescription}>
                      {category.categoryDescription}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link to={`/categories/update/${category.id}`}>
                        <Button className="mr-2 bg-orange-600 hover:bg-orange-700">Update</Button>
                    </Link>
                  </TableCell>
                </TableRow>
               ))}
            </TableBody>
          </Table>
          <div className="flex justify-between items-center mt-4">
            <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)}/>
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                        ))}
                        <PaginationItem>
                        <PaginationNext onClick={() => handlePageChange(currentPage + 1)}/>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
          </div>
        </div>
    </div>
  )
}

export default CategoryLists