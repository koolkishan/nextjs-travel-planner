import Sidebar from "@/components/admin/sidebar/sidebar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="bg-[#f5f5fe] flex">
      <Sidebar />
      <section className="flex-1 flex flex-col">
        <div className="h-48 bg-[#0E1428] text-white flex justify-center flex-col px-10 gap-3">
          <h1 className="text-5xl">Hotels</h1>
          <p>All the info about scrapped hotels.</p>
        </div>
        {children}
      </section>
    </section>
  );
};

export default AdminLayout;
