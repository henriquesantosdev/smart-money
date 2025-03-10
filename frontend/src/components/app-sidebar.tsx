import { TrendingUp, Landmark, CreditCard, TrendingDown, Home, LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Bank Accounts",
    url: "#",
    icon: Landmark,
  },
  {
    title: "Cards",
    url: "#",
    icon: CreditCard,
  },
  {
    title: "Incomes",
    url: "#",
    icon: TrendingUp,
  },
  {
    title: "Expenses",
    url: "dashboard/expenses",
    icon: TrendingDown,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="floating" className="bg-black-1050">
      <SidebarHeader>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <img src="/logo.png" alt="logo" className="size-7" />
              </div>
              <div className="ms-2 flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Smart Money</span>
                <span className="">Finance manager</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>App Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="p-5 transition-all text-red-50 bg-red-950 border-[1px] border-red-900 hover:bg-red-950/70 hover:text-red-100 cursor-pointer"
            >
              <LogOut />
              <span className="">Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

      </SidebarFooter>
    </Sidebar >
  )
}
