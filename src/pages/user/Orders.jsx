import React from 'react'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from "../../context/auth";

const Orders = () => {
  const { auth } = useAuth();
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <UserMenu />

      {/* Main Content */}
      <div className="md:w-3/4 bg-zinc-900 p-8">
        <h2 className="text-3xl font-bold text-zinc-100 mb-8">Welcome User, {auth.user.name}</h2>
        <h2 className="text-3xl font-bold text-zinc-100 mb-8">All orders</h2>
      </div>
    </div>
  )
}

export default Orders