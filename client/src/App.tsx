import './App.css'
import { Route, Routes } from "react-router-dom";
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

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/" element={<DashboardPage/>} />
      
      <Route path="/suppliers" element={<SupplierListPage/>} />
      <Route path="/suppliers/add" element={<AddNewSupplier/>} />
      <Route path="/suppliers/update/:id" element={<UpdateSupplier/>} />
      <Route path="/suppliers/details/:id" element={<SupplierDetails/>} />

      <Route path="/warehouses" element={<WarehouseListPage/>} />
      <Route path="/warehouses/add" element={<AddNewWarehouse/>} />
      <Route path="/warehouses/update/:id" element={<UpdateWarehouse/>} />
      <Route path="/warehouses/details/:id" element={<WarehouseDetails/>} />

    </Routes>
    <Toaster/>
  </>
  )
}

export default App
