import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import { useGetAllProducts } from "@/services/product-services";

const ProductLists = () => {
    // Declare state variables
    const { data, isLoading, refetch } = useGetAllProducts();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Handle loading state
    if (isLoading) { return <div>Loading...</div>;}
    if (!data) { return <div>No data found</div>;}

    interface Product {
        id: string; 
        productName: string;
        productNumber: string;
        description: string;
        productBrand:string;
        quantity: number;
        sku: string;
        price: number;
        supplier: { supplierName: string; supplierCode: string; } | null;
        category: { categoryName: string; categoryCode: string; } | null;     
    }

  // Filter product based on search query
  const filteredProducts: Product[] = searchQuery
  ? data.filter((product: Product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productBrand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.supplier?.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : data;

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
        <div className="flex flex-col md:flex-row justify-between items-center pb-5 space-y-2 md:space-y-0 md:space-x-2">
          <Link to={`/products/add`}>
            <Button className ="bg-green-500 hover:bg-green-600">Add New Product</Button>
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
                        <TableHead>Product Code</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>SKU</TableHead>
                    </TableRow>
                </TableHeader>
                 <TableBody>
                  {paginatedProducts.map((product: Product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.productNumber}</TableCell>
                      <TableCell>{product.productName}</TableCell>
                      <TableCell>{product.category?.categoryName}</TableCell>
                      <TableCell>{product.supplier?.supplierName}</TableCell>
                      <TableCell>{product.sku}</TableCell> 
                      <TableCell>
                            <Link to={`/products/details/${product.id}`}>
                                <Button className="mr-2 bg-sky-800 hover:bg-sky-950">View</Button>
                            </Link>
                            <Link to={`/products/update/${product.id}`}>
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

export default ProductLists