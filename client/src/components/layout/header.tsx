import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

interface HeaderProps { Title: string;}

const Header = ({ Title }: HeaderProps) => {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3 flex-grow">
            <SidebarTrigger />
            <h1 className="header-title">{Title}</h1>
          </div>
          <Button className="mr-4 bg-rose-500 hover:bg-rose-600" aria-label="Logout">
            <LogOut /> Logout
          </Button>
        </header>
      );
}

export default Header;