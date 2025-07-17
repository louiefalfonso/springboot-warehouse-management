import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SupplierDetailTable = ({ supplierData }: { supplierData: any }) => {
  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0">Supplier Information</h2>
      <div className="min-w-full">
        <Table>
          <TableHeader>
            <TableRow>
                  <TableHead>Supplier Code</TableHead>
                  <TableHead>Supplier Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Supplier Company</TableHead>
                  <TableHead>Email Address</TableHead>
                  <TableHead>Contact Number</TableHead>
                  <TableHead>Supplier Address</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
               <TableRow key={supplierData.id}>
                <TableCell>{supplierData.supplierCode}</TableCell>
                <TableCell>{supplierData.supplierName}</TableCell>
                <TableCell>{supplierData.status}</TableCell>
                <TableCell>{supplierData.supplierCompany}</TableCell>
                <TableCell>{supplierData.supplierEmail}</TableCell>
                <TableCell>{supplierData.contactInfo}</TableCell>
                <TableCell>{supplierData.contactAddress}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default SupplierDetailTable