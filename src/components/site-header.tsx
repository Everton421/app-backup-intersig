import { useAuth } from "@/app/contexts/AuthContext";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useRouter } from "next/navigation";
import ThemeSwitcher from "./theme-switcher";
import { LogOut } from "lucide-react";

export function SiteHeader({ pageName  }: {pageName? :string }) {
    const { user , logout} = useAuth();
    const router = useRouter();
  
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center   px-4  gap-2 md:lg:px-6 ">
        <SidebarTrigger className="ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 "
        />

        <h1 className="text-base font-medium text-[15px]"> { pageName ? pageName : 'Documents'}</h1>
          <div className=" ml-auto  flex items-center md:gap-2    ">
            <div className="flex ml-6">
            <Button variant="ghost" asChild size="sm" className="sm:flex">
                <span>
                  { user && user && user.nome}
                </span>
              </Button>
              <ThemeSwitcher/>
          </div>
          <Button variant="default"
            onClick={()=>{
              logout()
              router.push('/login')
            }}
           className="  max-md:hidden max-w-[45px] md:max-w-65 md:text-[15px] text-[10px]"
          >
            logout <LogOut /> 
          </Button> 

        </div>
      </div>
    </header>
  )
}
