import React from "react";

export default function AdminOrdersPage() {
  const mockupOrders = [
    { id: "ORD-9281", customer: "Hiruni Perera", date: "June 15, 2026", items: "Handmade Cute Diary Pack x1", total: 1800, status: "Processing" },
    { id: "ORD-9280", customer: "Amara Silva", date: "June 14, 2026", items: "Gift Hamper Standard x1", total: 4500, status: "Dispatched" },
    { id: "ORD-9279", customer: "Kasun Jayawardena", date: "June 14, 2026", items: "Teddy Bear Classic x2", total: 3200, status: "Delivered" },
    { id: "ORD-9278", customer: "Nisansala De Silva", date: "June 13, 2026", items: "Flower Bouquet Rose Dream x1", total: 2900, status: "Pending" }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight text-white">Orders Tracking</h1>
        <p className="text-xs text-neutral-400">Manage customer shipments, delivery status, and order fulfillments.</p>
      </div>

      <div className="bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-4 overflow-hidden">
        <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC] mb-2">📦 Active Shipment Registry</h2>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/0.05 text-[10px] font-bold uppercase tracking-wider text-[#B2C4AC] pb-3">
                <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Order ID</th>
                <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Customer</th>
                <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Items Ordered</th>
                <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Total Price</th>
                <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Shipment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/0.02">
              {mockupOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/0.01 transition-colors">
                  <td className="py-3.5 text-xs font-semibold text-neutral-100">{order.id}</td>
                  <td className="py-3.5 text-xs text-neutral-300">
                    <div className="flex flex-col">
                      <span>{order.customer}</span>
                      <span className="text-[9px] text-neutral-500">{order.date}</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-xs text-neutral-300">{order.items}</td>
                  <td className="py-3.5 text-xs font-medium text-neutral-200">Rs. {order.total.toLocaleString()}</td>
                  <td className="py-3.5 text-xs">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      order.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10" :
                      order.status === "Dispatched" ? "bg-blue-500/10 text-blue-400 border-blue-500/10" :
                      order.status === "Processing" ? "bg-amber-500/10 text-amber-400 border-amber-500/10" :
                      "bg-neutral-500/10 text-neutral-400 border-neutral-500/10"
                    }`}>
                      • {order.status}
                    </span>
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
