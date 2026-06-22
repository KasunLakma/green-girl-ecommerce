"use client";
import React, { useState } from "react";

export default function ActiveShipmentRegistry({ initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);

  const handleApprove = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: "Approved" } : order
      )
    );
  };

  const handleShip = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: "Delivered" } : order
      )
    );
  };

  return (
    <div className="bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-4 overflow-hidden">
      <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC] mb-2">📦 Active Shipment Registry</h2>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/0.05 text-[10px] font-bold uppercase tracking-wider text-[#B2C4AC] pb-3">
              <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Order ID</th>
              <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Customer Name</th>
              <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Items Purchased</th>
              <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Total Amount</th>
              <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Status</th>
              <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/0.02">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-xs text-neutral-400 italic">No orders found.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/0.01 transition-colors">
                  <td className="py-3.5 text-xs font-semibold text-neutral-100 truncate max-w-[120px]" title={order.id}>{order.id}</td>
                  <td className="py-3.5 text-xs text-neutral-300">{order.customer}</td>
                  <td className="py-3.5 text-xs text-neutral-300">{order.items}</td>
                  <td className="py-3.5 text-xs font-medium text-neutral-200">Rs. {order.total.toLocaleString()}</td>
                  <td className="py-3.5 text-xs">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      order.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10" :
                      order.status === "Approved" ? "bg-blue-500/10 text-blue-400 border-blue-500/10" :
                      "bg-amber-500/10 text-amber-400 border-amber-500/10"
                    }`}>
                      • {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-xs text-right">
                    {order.status === "Delivered" ? (
                      <span className="text-[10px] text-neutral-400 font-bold tracking-widest uppercase inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Completed
                      </span>
                    ) : (
                      <div className="inline-flex items-center gap-2">
                        {order.status === "Pending" && (
                          <button
                            onClick={() => handleApprove(order.id)}
                            className="text-[9px] font-bold tracking-wider uppercase border border-[#A1B399]/30 hover:bg-[#A1B399]/10 text-[#B2C4AC] px-3 py-1.5 rounded-xl transition-all"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => handleShip(order.id)}
                          className="text-[9px] font-bold tracking-wider uppercase bg-white/5 border border-white/0.05 hover:bg-white/10 text-neutral-200 px-3 py-1.5 rounded-xl transition-all"
                        >
                          Ship
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
