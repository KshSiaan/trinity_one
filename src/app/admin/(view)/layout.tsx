import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin-sidebar";
import { BellIcon, SearchIcon } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/ui/logout-button";
import HeaderProfSection from "@/components/core/header-profile-section";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return redirect("/admin/login");
  }

  return (
    <SidebarProvider className=" rounded-r-2xl border-0">
      <AppSidebar />
      <SidebarInset className="bg-gradient-to-tl from-[#17a14c41] to-[#8d37e434]">
        <header className="shadow border bg-background rounded-xl flex h-24 mb-4! m-6 shrink-0 pr-4 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center w-full justify-between gap-2 px-4">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">Dashboard Overview</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-row justify-between items-center px-2 rounded-md border">
                <SearchIcon className="text-muted-foreground" />
                <Input
                  className="border-0! shadow-none! bg-transparent! ring-0! outline-0!"
                  placeholder="Search.."
                />
              </div>
              <Button size={"icon"} variant={"ghost"}>
                <BellIcon />
              </Button>
              <HeaderProfSection />
              <LogoutButton />
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-6 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
