import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ProductDetailsList = ({ productData }: { productData: any }) => {
  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <h2 className="font-heading scroll-m-20 border-b pb-4 text-xl font-semibold tracking-tight first:mt-0">Product Information</h2>
      <div className="min-w-full">
         <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Product Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key={productData.id}>
                <TableCell>{productData.productName}</TableCell>
                <TableCell className="whitespace-normal" >{productData.description}</TableCell>
              </TableRow>
            </TableBody>
         </Table> 
         <Table className="mt-5">
          <TableHeader>
              <TableRow>
                  <TableHead>Product Number</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                   <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Supplier</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
                  <TableRow key={productData.id}>
                    <TableCell>{productData.productNumber}</TableCell>
                    <TableCell>{productData.productBrand}</TableCell>
                    <TableCell>{productData.quantity} pieces</TableCell>
                    <TableCell>£ {productData.price.toFixed(2)}</TableCell>
                    <TableCell>{productData.sku}</TableCell>
                    <TableCell>{productData.category?.categoryName}</TableCell>
                    <TableCell>{productData.supplier?.supplierName}</TableCell>
                  </TableRow>
          </TableBody>        
        </Table>  
      </div>
    </div>
  )
}

export default ProductDetailsList