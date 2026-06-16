"use client";
import React, { useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Priyantha Silva",
      email: "priyantha@gmail.com",
      type: "Customer (Auto-Created via Order)",
      status: "Approved",
      spend: 2400
    },
    {
      id: 2,
      name: "Dilini Perera",
      email: "dilini@gmail.com",
      type: "Customer (Auto-Created via Order)",
      status: "Pending Approval",
      spend: 1950
    }
  ]);

  const handleApprove = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Approved" } : u))
    );
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight text-white">User & Role Management</h1>
        <p className="text-xs text-neutral-400">Audit customer accounts, profile creation, and system access rights.</p>
      </div>

      <div className="bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-4 overflow-hidden">
        <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC] mb-2">👤 Active Accounts Registry</h2>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/0.05 text-[10px] font-bold uppercase tracking-wider text-[#B2C4AC] pb-3">
                <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Name</th>
                <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Email</th>
                <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Profile Type</th>
                <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Total Spend</th>
                <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Status</th>
                <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/0.02">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/0.01 transition-colors">
                  <td className="py-3.5 text-xs font-semibold text-neutral-100">{user.name}</td>
                  <td className="py-3.5 text-xs text-neutral-300 font-mono">{user.email}</td>
                  <td className="py-3.5 text-xs text-neutral-400">{user.type}</td>
                  <td className="py-3.5 text-xs font-medium text-neutral-200">Rs. {user.spend.toLocaleString()}</td>
                  <td className="py-3.5 text-xs">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      user.status === "Approved"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/10"
                    }`}>
                      • {user.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-xs text-right">
                    {user.status === "Pending Approval" ? (
                      <button
                        onClick={() => handleApprove(user.id)}
                        className="text-[9px] font-bold tracking-wider uppercase bg-[#A1B399] text-[#0B0E0B] hover:bg-[#B2C4AC] px-3 py-1.5 rounded-xl transition-all"
                      >
                        Approve Account
                      </button>
                    ) : (
                      <span className="text-[10px] text-neutral-500 font-medium italic">No Actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
