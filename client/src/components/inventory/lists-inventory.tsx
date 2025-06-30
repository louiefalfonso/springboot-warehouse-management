import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { useGetAllInventories } from "@/services/inventory-services";
const InventoryLists = () => {
  
  // Declare state variables
  const { data, isLoading, refetch } = useGetAllInventories();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Handle loading state
  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  interface Inventory {
    id: string;
    inventoryCode: string;
    quantity: number;
    value: string;
    location: string;
    reorderPoint: number;
    unitCost: number;
    remarks: string;
    inventoryManager: string;
    product: { productName: string; productNumber: string; } | null;
    warehouse: { warehouseName: string; warehouseCode: string; } | null;
  }

  // Filter inventory based on search query
  const filteredInventory : Inventory[] = searchQuery
  ? data.filter((inventory: Inventory)=>
    inventory.inventoryCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inventory.product?.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inventory.warehouse?.warehouseName.toLowerCase().includes(searchQuery.toLowerCase())
  )
  : data;

  // Pagination
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const paginatedInventory = filteredInventory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between items-center pb-5 space-y-2 md:space-y-0 md:space-x-2">
          <Link to={`/inventories/add`}>
            <Button className ="bg-green-500 hover:bg-green-600">Add New Inventory</Button>
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
                        <TableHead>Inventory Code</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Cost</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Warehouse</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                   {paginatedInventory.map((inventory: Inventory) => (
                    <TableRow key={inventory.id}>
                      <TableCell>{inventory.inventoryCode}</TableCell>
                      <TableCell>{inventory.product?.productName}</TableCell>
                      <TableCell>{inventory.quantity}</TableCell>
                      <TableCell>{inventory.unitCost}</TableCell>
                      <TableCell>{inventory.value}</TableCell>
                      <TableCell>{inventory.warehouse?.warehouseName}</TableCell>
                      <TableCell>
                            <Link to={`/inventories/details/${inventory.id}`}>
                                <Button className="mr-2 bg-gray-600 hover:bg-gray-700">View</Button>
                            </Link>
                            <Link to={`/inventories/update/${inventory.id}`}>
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

export default InventoryLists