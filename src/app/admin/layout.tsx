import { AppSidebar } from "@/components/modules/adminDashboard/app-sidebar";
import {
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
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear border-2 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-20">
          <div className="px-4 ">
            <SidebarTrigger className="w-8 h-8" />
          </div>
        </header>       
        <div className="min-h-screen p-0 m-0 ">
          
        {children} 
        </div>
      </SidebarInset>
      
    </SidebarProvider>
  );
}
