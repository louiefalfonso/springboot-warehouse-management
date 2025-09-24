import './App.css'
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from '@/components/ui/sonner';

import SupplierListPage from '@/pages/suppliers/page';
import AddNewSupplier from '@/components/suppliers/add-supplier';
import UpdateSupplier from '@/components/suppliers/edit-supplier';
import SupplierDetails from '@/components/suppliers/details-supplier';
import DashboardPage from '@/pages/dashboard/page';
import WarehouseListPage from '@/pages/warehouses/page';
import AddNewWarehouse from './components/warehouses/add-warehouse';
import UpdateWarehouse from './components/warehouses/edit-warehouse';
import WarehouseDetails from './components/warehouses/details-warehouse';
import CategoryListPage from './pages/categories/page';
import AddNewCategory from './components/category/add-category';
import UpdateCategory from './components/category/edit-category';
import ProductListPage from './pages/products/page';
import AddNewProduct from './components/products/add-product';
import UpdateProduct from './components/products/edit-product';
import ProductDetails from './components/products/details-products';
import InventoryListPage from './pages/inventories/page';
import AddNewInventory from './components/inventory/add-inventory';
import UpdateInventory from './components/inventory/edit-inventory';
import InventoryDetails from './components/inventory/details-inventory';
import ProtectedRoute from './services/protected-route';
import LoginPage from './pages/login/page';
import RegisterPage from './pages/register/page';

function App() {

  const token = localStorage.getItem("token");
  
  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} replace/>} /> 
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/" element={<ProtectedRoute token={token}> <DashboardPage /> </ProtectedRoute>} />

      
      
      <Route path="/suppliers" element={<SupplierListPage/>} />
      <Route path="/suppliers/add" element={<AddNewSupplier/>} />
      <Route path="/suppliers/update/:id" element={<UpdateSupplier/>} />
      <Route path="/suppliers/details/:id" element={<SupplierDetails/>} />

      <Route path="/warehouses" element={<WarehouseListPage/>} />
      <Route path="/warehouses/add" element={<AddNewWarehouse/>} />
      <Route path="/warehouses/update/:id" element={<UpdateWarehouse/>} />
      <Route path="/warehouses/details/:id" element={<WarehouseDetails/>} />

      <Route path="/categories" element={<CategoryListPage/>} />
      <Route path="/categories/add" element={<AddNewCategory/>} />
      <Route path="/categories/update/:id" element={<UpdateCategory/>} />

      <Route path="/products" element={<ProductListPage/>} />
      <Route path="/products/add" element={<AddNewProduct/>} />
      <Route path="/products/update/:id" element={<UpdateProduct/>} />
      <Route path="/products/details/:id" element={<ProductDetails/>} />

      <Route path="/inventories" element={<InventoryListPage/>} />
      <Route path="/inventories/add" element={<AddNewInventory/>} />
      <Route path="/inventories/update/:id" element={<UpdateInventory/>} />
      <Route path="/inventories/details/:id" element={<InventoryDetails/>} />
      
    </Routes>
    <Toaster/>
  </>
  )
}

export default App
