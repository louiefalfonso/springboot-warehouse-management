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
      <Route path="/dashboard" element={<ProtectedRoute token={token}><DashboardPage /> </ProtectedRoute>}/>

      <Route path="/suppliers" element={<ProtectedRoute token={token}><SupplierListPage/></ProtectedRoute>}/>
      <Route path="/suppliers/add" element={<ProtectedRoute token={token}><AddNewSupplier/></ProtectedRoute>}/>
      <Route path="/suppliers/update/:id" element={<ProtectedRoute token={token}><UpdateSupplier/></ProtectedRoute>}/>
      <Route path="/suppliers/details/:id" element={<ProtectedRoute token={token}><SupplierDetails/></ProtectedRoute>}/>

      <Route path="/warehouses" element={<ProtectedRoute token={token}><WarehouseListPage/></ProtectedRoute>}/>
      <Route path="/warehouses/add" element={<ProtectedRoute token={token}><AddNewWarehouse/></ProtectedRoute>}/>
      <Route path="/warehouses/update/:id" element={<ProtectedRoute token={token}><UpdateWarehouse/></ProtectedRoute>}/>
      <Route path="/warehouses/details/:id" element={<ProtectedRoute token={token}><WarehouseDetails/></ProtectedRoute>}/>

      <Route path="/categories" element={<ProtectedRoute token={token}><CategoryListPage/></ProtectedRoute>}/>
      <Route path="/categories/add" element={<ProtectedRoute token={token}><AddNewCategory/></ProtectedRoute>}/>
      <Route path="/categories/update/:id" element={<ProtectedRoute token={token}><UpdateCategory/></ProtectedRoute>}/>

      <Route path="/products" element={<ProtectedRoute token={token}><ProductListPage/></ProtectedRoute>}/>
      <Route path="/products/add" element={<ProtectedRoute token={token}><AddNewProduct/></ProtectedRoute>}/>
      <Route path="/products/update/:id" element={<ProtectedRoute token={token}><UpdateProduct/></ProtectedRoute>}/>
      <Route path="/products/details/:id" element={<ProtectedRoute token={token}><ProductDetails/></ProtectedRoute>}/>

      <Route path="/inventories" element={<ProtectedRoute token={token}><InventoryListPage/></ProtectedRoute>} />
      <Route path="/inventories/add" element={<ProtectedRoute token={token}><AddNewInventory/></ProtectedRoute>} />
      <Route path="/inventories/update/:id" element={<ProtectedRoute token={token}><UpdateInventory/></ProtectedRoute>} />
      <Route path="/inventories/details/:id" element={<ProtectedRoute token={token}><InventoryDetails/></ProtectedRoute>} />
      
    </Routes>
    <Toaster/>
  </>
  )
}

export default App
