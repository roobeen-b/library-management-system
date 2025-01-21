import { Session } from "next-auth";

const AdminHeader = ({ session }: { session: Session }) => {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-2xl font-semibold text-dark-400">
          {session?.user?.name}
        </h2>
        <p className="text-base text-slate-500">
          Monitor all your books and users here
        </p>
      </div>
    </header>
  );
};

export default AdminHeader;
