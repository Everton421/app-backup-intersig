"use client"

import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/contexts/AuthContext"
import { LogOut } from "lucide-react"
import Image from "next/image"
import { Separator } from "./ui/separator"

export function NavMain({ items, }: {
  items: {
    title: string
    url: string
    icon?: Icon }[] })

{
  const router = useRouter();

  const { logout } = useAuth();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          
              <a href="/backups">
                 <Image
                         className="rounded-2xl"
                         width={120}
                         height={120}
                         src={'/images/logo2.png'}
                         alt=""
                        />
              </a>
              <Separator/>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <a href={item.url}>
              <SidebarMenuButton tooltip={item.title}   > 
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
              </a>
              <Separator/>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
             <Button variant="default"
            onClick={()=>{
              logout()
              router.push('/login')
            }}
           className=" md:hidden md:text-base text-[10px]  "
          >
           <LogOut /> logout
          </Button> 
         
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
