import Header from '@/components/layout/header'
import MainLayout from '@/components/layout/layout'

const DashboardPage = () => {
  return (
    <MainLayout>
        <Header Title ="Dashboard"/>
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                Dashboard Page
            </div>
         </div>   
    </MainLayout>
  )
}

export default DashboardPage