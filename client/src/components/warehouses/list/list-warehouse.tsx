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
                  <TableHead>Office Hours</TableHead>
                  <TableHead>Warehouse Email</TableHead>
                  <TableHead>Warehouse Location</TableHead>
                  <TableHead>Warehouse Manager</TableHead>
                  <TableHead>Contact Number</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key={warehouseData.id}>
                <TableCell>{warehouseData.warehouseCode}</TableCell>
              </TableRow>
            </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default WarehouseDetailsList

