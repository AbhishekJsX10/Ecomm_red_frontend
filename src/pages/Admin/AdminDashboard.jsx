import React from 'react';
import AdminMenu from '../../components/layout/AdminMenu';
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const { auth } = useAuth();

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <AdminMenu />

      {/* Main Content */}
      <div className="md:w-3/4 bg-zinc-900 p-8">
        <h2 className="text-3xl font-bold text-zinc-100 mb-8">Welcome Admin</h2>
        <div className="space-y-4">
          <div className='flex  gap-3'>
            <h3 className="text-xl font-semibold text-zinc-200">Name:</h3>
            <p className="text-zinc-400 text-xl">{auth?.user?.name}</p>
          </div>
          <div className='flex  gap-3'>
            <h3 className="text-xl font-semibold text-zinc-200">Email:</h3>
            <p className="text-zinc-400 text-xl">{auth?.user?.email}</p>
          </div>
          <div className='flex  gap-3'>
            <h3 className="text-xl font-semibold text-zinc-200">Phone:</h3>
            <p className="text-zinc-400 text-xl">{auth?.user?.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
