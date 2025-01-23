import { auth } from "@/auth";
import Header from "@/components/Header";
import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  after(async () => {
    if (!session?.user?.id) return;

    //get the user and check if the last activity date is today
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, session?.user?.id))
      .limit(1);

    if (user[0]?.lastActivityDate === new Date().toISOString().slice(0, 10)) {
      return;
    }

    await db
      .update(usersTable)
      .set({
        lastActivityDate: new Date().toISOString().slice(0, 10),
      })
      .where(eq(usersTable.id, session?.user?.id));
  });

  return (
    <main className="root-container">
      <div className="max-w-7xl mx-auto">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
