import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const WarehouseDetailsList = ({ warehouseData }: { warehouseData: any }) => {
  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
        <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0">Warehouse Information</h2>
        <div className="min-w-full">
        <Table>
          <TableHeader>
              <TableRow>
                  <TableHead>Warehouse Code</TableHead>
                  <TableHead>Warehouse Name</TableHead>
                  <TableHead>Warehouse Manager</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key={warehouseData.id}>
                <TableCell>{warehouseData.warehouseCode}</TableCell>
                <TableCell>{warehouseData.warehouseName}</TableCell>
                <TableCell>{warehouseData.warehouseManager}</TableCell>
                <TableCell>{warehouseData.description}</TableCell>
              </TableRow>
            </TableBody>
        </Table>
        <Table className="mt-5">
          <TableHeader>
              <TableRow>
                  <TableHead>Warehouse Location</TableHead>
                   <TableHead>Warehouse Email</TableHead>
                  <TableHead>Contact Number</TableHead>
                  <TableHead>Office Hours</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key={warehouseData.id}>
                <TableCell>{warehouseData.warehouseLocation}</TableCell>
                <TableCell>{warehouseData.warehouseEmail}</TableCell>
                <TableCell>{warehouseData.contactNumber}</TableCell>
                <TableCell>{warehouseData.officeHours}</TableCell>
              </TableRow>
            </TableBody>  
        </Table>  
        </div>
    </div>
  )
}

export default WarehouseDetailsList