import Header from '@/components/layout/header'
import MainLayout from '@/components/layout/layout'
import SupplierLists from '@/components/suppliers/lists-supplier'

const SupplierListPage = () => {
  return (
    <MainLayout>
      <Header Title ="Suppliers"/>
      <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-1">
              <SupplierLists/>
          </div>
      </div>   
    </MainLayout>
  )
}

export default SupplierListPage