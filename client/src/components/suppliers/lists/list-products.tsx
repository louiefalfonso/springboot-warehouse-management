import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Product = {
    id: string; 
    productName: string;
    productNumber: string;
    description: string;
    productBrand:string;
    quantity: number;
    sku: string;
    price: number;
    supplier: { id: number;}
    category: { id: number; categoryName: string;} 
}

const ProductsRecordsTable = ({ productData }: { productData: Product[] | undefined }) => {
  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
          <div className="min-w-full">
            <h1 className="scroll-m-20 text-xl font-bold tracking-tight mb-5">Listed Products:</h1>
            <div className="min-w-full">
              <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product Number</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Price</TableHead> 
                        <TableHead>Quantity</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                  {productData && productData.length > 0 ? (
                      productData.map((product: Product) => (
                          <TableRow key={product.id}>
                            <TableCell>{product.productNumber}</TableCell>
                            <TableCell>{product.productName}</TableCell>
                            <TableCell>{product.productBrand}</TableCell>
                            <TableCell>{product.sku}</TableCell>
                            <TableCell>{product.category.categoryName}</TableCell>
                            <TableCell>£ {product.price.toFixed(2)}</TableCell>
                            <TableCell>{product.quantity} pieces</TableCell>
                          </TableRow>
                      ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={5}>No Product Records Found Yet</TableCell>
                    </TableRow>
                    )}
                </TableBody>
              </Table> 
            </div>
          </div>
    </div>        
  )
}

export default ProductsRecordsTable