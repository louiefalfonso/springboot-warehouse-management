import Header from '@/components/layout/header'
import MainLayout from '@/components/layout/layout'

const WarehouseListPage = () => {
  return (
    <MainLayout>
      <Header Title ="Warehouses"/>
      <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-1">
              Warehouse Page
          </div>
      </div>   
    </MainLayout>
  )
}

export default WarehouseListPage