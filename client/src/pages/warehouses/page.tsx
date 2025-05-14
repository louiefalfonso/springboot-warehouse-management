import Header from '@/components/layout/header'
import MainLayout from '@/components/layout/layout'
import WarehouseLists from '@/components/warehouses/lists-warehouse'

const WarehouseListPage = () => {
  return (
    <MainLayout>
      <Header Title ="Warehouses"/>
      <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-1">
              <WarehouseLists/>
          </div>
      </div>   
    </MainLayout>
  )
}

export default WarehouseListPage