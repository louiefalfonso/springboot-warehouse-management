import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"

import { useGetAllSuppliers } from "@/services/supplier-services";

const SupplierLists = () => {

    // Declare state variables
    const { data, isLoading, refetch } = useGetAllSuppliers();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Handle loading state
    if (isLoading) { return <div>Loading...</div>;}
    if (!data) { return <div>No data found</div>;}

    interface Supplier {
        id: string; 
        supplierName: string;
        supplierCode: string;
        supplierCompany:string;
        supplierEmail: string;
        contactInfo: string;
        status: string;
        contactAddress: string;   
    }

 // Filter treatment based on search query
  const filteredSuppliers: Supplier[] = searchQuery
  ? data.filter((supplier: Supplier) =>
      supplier.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.supplierCode.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : data;

   // Pagination
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
  const paginatedSuppliers = filteredSuppliers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

   // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
        <div className="flex flex-col md:flex-row justify-between items-center pb-5 space-y-2 md:space-y-0 md:space-x-2">
          <Link to={`/suppliers/add`}>
            <Button className ="bg-green-500 hover:bg-green-600">Add New Supplier</Button>
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
                        <TableHead>Supplier Code</TableHead>
                        <TableHead>Supplier Name</TableHead>
                        <TableHead>Supplier Company</TableHead>
                        <TableHead>Supplier Address</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                   {paginatedSuppliers.map((supplier: Supplier) => (
                    <TableRow key={supplier.id}>
                        <TableCell>{supplier.supplierCode}</TableCell>
                        <TableCell>{supplier.supplierName}</TableCell>
                        <TableCell>{supplier.supplierCompany}</TableCell>
                        <TableCell>{supplier.contactAddress}</TableCell>
                        <TableCell>{supplier.status}</TableCell>
                        <TableCell>
                            <Link to={`/suppliers/details/${supplier.id}`}>
                                <Button className="mr-2 bg-sky-800 hover:bg-sky-950">View</Button>
                            </Link>
                            <Link to={`/suppliers/update/${supplier.id}`}>
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

export default SupplierLists