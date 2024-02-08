import React from 'react';
import Navbar from '../ui/Navbar';
import SideBar from '../ui/SideBar';

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-row h-screen ">
      <div className="hidden md:flex">
        <SideBar />
      </div>

      <div className="flex-4 w-full flex flex-col ">
        <div className="z-10">
        <Navbar />
        </div>
        <div className="m-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </section>
  );
}
