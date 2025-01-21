import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import "@/styles/admin.css";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/Header";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  return (
    <main className="flex flex-row w-full min-h-screen">
      <AdminSidebar session={session} />
      <div className="admin-container">
        <AdminHeader session={session} />
        {children}
      </div>
    </main>
  );
};

export default Layout;
