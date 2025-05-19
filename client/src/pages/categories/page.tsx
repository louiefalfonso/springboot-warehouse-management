import CategoryLists from '@/components/category/lists-category'
import Header from '@/components/layout/header'
import MainLayout from '@/components/layout/layout'

const CategoryListPage = () => {
  return (
    <MainLayout>
      <Header Title ="Suppliers"/>
      <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-1">
              <CategoryLists/>
          </div>
      </div>   
    </MainLayout>
  )
}

export default CategoryListPage