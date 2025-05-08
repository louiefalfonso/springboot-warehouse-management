import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from './components/ui/sonner';

import SupplierListPage from './pages/suppliers/page';
import AddNewSupplier from './components/suppliers/add-supplier';
import UpdateSupplier from './components/suppliers/edit-supplier';
import SupplierDetails from './components/suppliers/details-supplier';
import DashboardPage from './pages/dashboard/page';
import WarehouseListPage from './pages/warehouses/page';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashboardPage/>} />
      
      <Route path="/suppliers" element={<SupplierListPage/>} />
      <Route path="/suppliers/add" element={<AddNewSupplier/>} />
      <Route path="/suppliers/update/:id" element={<UpdateSupplier/>} />
      <Route path="/suppliers/details/:id" element={<SupplierDetails/>} />


      <Route path="/warehouses" element={<WarehouseListPage/>} />
    </Routes>
    <Toaster/>
  </BrowserRouter>
  )
}

export default App
