import { AppSidebar } from "@/components/shared/app-sidebar";
import {
  Logo,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider >
      <AppSidebar />
      <SidebarInset>
        <header className=" h-[106px] shrink-0 items-center gap-2 transition-[width,height] ease-linear border-2 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-20 bg-[#1E3A8A] flex justify-between ">
          <div className="px-4 ml-8 bg-white rounded-full">
            <SidebarTrigger className="w-8 h-8" />
           
          </div>
          <Logo/>
        </header>     
          
        <div className="bg-gradient-to-br from-[#E3F2FD] via-[#BBDEFB] to-[#E3F2FD] min-h-screen p-0 m-0 ">
          
        {children} 
        </div>
      </SidebarInset>
      
    </SidebarProvider>
  );
}
