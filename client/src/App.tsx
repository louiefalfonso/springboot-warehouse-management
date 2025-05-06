import './App.css'
import { Route, Routes } from "react-router-dom";
import { Toaster } from './components/ui/sonner';

import SupplierListPage from './pages/suppliers/page';
import AddNewSupplier from './components/suppliers/add-supplier';
import UpdateSupplier from './components/suppliers/edit-supplier';
import SupplierDetails from './components/suppliers/details-supplier';

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/suppliers" element={<SupplierListPage/>} />
        <Route path="/suppliers/add" element={<AddNewSupplier/>} />
        <Route path="/suppliers/update/:id" element={<UpdateSupplier/>} />
        <Route path="/suppliers/details/:id" element={<SupplierDetails/>} />
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
