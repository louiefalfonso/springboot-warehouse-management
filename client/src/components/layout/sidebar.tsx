import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ScrollText, BaggageClaim, ShoppingBag } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import MainLogo from '@/assets/lbc-logo.png';


import '../../App.css'; 

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
    {
    title: "Products",
    url: "/products",
    icon: ShoppingBag,
  },
  {
    title: "Suppliers",
    url: "/suppliers",
    icon: ScrollText,
  },
  {
    title: "Warehouses",
    url: "/warehouses",
    icon: BaggageClaim,
  },

  
];

const AppSidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>(location.pathname);

  return (
    <Sidebar>
      <SidebarContent className="sidebar-content">
        <SidebarGroup>
          <SidebarGroupLabel className="sidebar-group-label">
            <img src={MainLogo} alt="Logo" className="main-logo" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                 <SidebarMenuButton
                    asChild
                    className={item.url === activeItem ? 'sidebar-menu-button-active' : ''}
                    onClick={() => setActiveItem(item.url)}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar