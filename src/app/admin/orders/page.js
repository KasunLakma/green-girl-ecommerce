import React from "react";

export default function AdminOrdersPage() {
  const mockupOrders = [
    { id: "ORD-9240", customer: "Priyantha Silva", items: "1x Stitch Cute Plush Toy", total: 2400, status: "Delivered" },
    { id: "ORD-9241", customer: "Dilini Perera", items: "1x Customized Ceramic Mug + Gift Box", total: 1950, status: "Pending" },
    { id: "ORD-9242", customer: "Kavindi Alwis", items: "1x Handmade Rose Bouquet Hamper", total: 4500, status: "Pending" }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight text-white">Orders Tracking</h1>
        <p className="text-xs text-neutral-400">Monitor and process customer gift package shipments and deliveries.</p>
      </div>

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
              </tr>
            </thead>
            <tbody className="divide-y divide-white/0.02">
              {mockupOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/0.01 transition-colors">
                  <td className="py-3.5 text-xs font-semibold text-neutral-100">{order.id}</td>
                  <td className="py-3.5 text-xs text-neutral-300">{order.customer}</td>
                  <td className="py-3.5 text-xs text-neutral-300">{order.items}</td>
                  <td className="py-3.5 text-xs font-medium text-neutral-200">Rs. {order.total.toLocaleString()}</td>
                  <td className="py-3.5 text-xs">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      order.status === "Delivered"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/10"
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
