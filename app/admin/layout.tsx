import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import "@/styles/admin.css";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/Header";
import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  const isAdmin = await db
    .select({ isAdmin: usersTable.role })
    .from(usersTable)
    .where(eq(usersTable.id, session?.user?.id))
    .limit(1)
    .then((res) => res[0].isAdmin === "ADMIN");

  if (!isAdmin) redirect("/");

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
