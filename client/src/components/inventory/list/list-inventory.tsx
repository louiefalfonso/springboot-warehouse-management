import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const InventoryDetailsList = ({ inventoryData }: { inventoryData: any }) => {
  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0">Inventory Information</h2>
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
            <TableRow key={inventoryData.id}>
              <TableCell>{inventoryData.inventoryCode}</TableCell>
              <TableCell>{inventoryData.product?.productName}</TableCell>
              <TableCell>{inventoryData.quantity}</TableCell>
              <TableCell>{inventoryData.unitCost}</TableCell>
              <TableCell>{inventoryData.value}</TableCell>
              <TableCell>{inventoryData.warehouse?.warehouseName}</TableCell>
            </TableRow>
          </TableBody>
         </Table>
      </div>
    </div>  
  )
}

export default InventoryDetailsList