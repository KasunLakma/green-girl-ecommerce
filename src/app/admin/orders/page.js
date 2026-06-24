"use client";

import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  CreditCard, 
  Package, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Tag, 
  HelpCircle,
  Clock
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        await fetchOrders();
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleStock = async (id, currentStockAvailable) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, stockAvailable: !currentStockAvailable })
      });
      if (res.ok) {
        await fetchOrders();
      }
    } catch (err) {
      console.error("Failed to toggle stock status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn text-white">
      {/* Top Title/Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/0.05 pb-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold tracking-tight text-white uppercase">Admin Orders Management</h1>
          <p className="text-xs text-neutral-400">Monitor billing summaries, fulfillment status, and update product stock configurations.</p>
        </div>
        <button 
          onClick={() => { setLoading(true); fetchOrders(); }}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-[#B2C4AC] rounded-xl transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-emerald-400" : ""}`} /> Refresh Registry
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-4 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC]">📦 Active Shipment Registry ({orders.length})</h2>
          {updatingId && (
            <span className="text-[9px] font-bold text-emerald-450 uppercase animate-pulse">Syncing change...</span>
          )}
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-white/0.05 text-[10px] font-bold uppercase tracking-wider text-[#B2C4AC] pb-3">
                <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Order & Reference</th>
                <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Customer Info (Who)</th>
                <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Items Ordered (What)</th>
                <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Payment Details</th>
                <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC] text-center">Stock Status</th>
                <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC] text-right">Fulfillment Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/0.02">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-[#B2C4AC] italic animate-pulse">
                    Retrieving orders transaction logs...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-neutral-500 italic">
                    No order transactions found in PostgreSQL database.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const orderPrice = order.totalPrice || order.totalAmount || 0;
                  return (
                    <tr key={order.id} className="hover:bg-white/[0.01] transition-colors border-b border-white/0.03">
                      {/* Column 1: Order Reference ID & Date */}
                      <td className="py-4 text-xs font-semibold text-neutral-100 max-w-[150px]">
                        <div className="flex flex-col gap-1">
                          <span className="font-mono text-white text-[11px]" title={order.id}>
                            {order.id.slice(0, 8)}...{order.id.slice(-4)}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-normal">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            }) : "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Column 2: Customer Details (Who) */}
                      <td className="py-4 text-xs">
                        <div className="flex flex-col gap-1 text-neutral-300">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <User className="w-3 h-3 text-[#B2C4AC]" /> {order.customerName || order.name || "N/A"}
                          </span>
                          <span className="text-[10px] text-neutral-450 flex items-center gap-1.5 hover:text-white transition-colors">
                            <Mail className="w-3 h-3" /> {order.email}
                          </span>
                          <span className="text-[10px] text-neutral-400 flex items-center gap-1.5">
                            <MapPin className="w-3 h-3" /> {order.city || order.district || "N/A"}
                          </span>
                        </div>
                      </td>

                      {/* Column 3: What was ordered */}
                      <td className="py-4 text-xs">
                        <div className="flex flex-col gap-1.5 max-w-[280px]">
                          {order.items && order.items.length > 0 ? (
                            order.items.map((item) => (
                              <div key={item.id} className="bg-white/5 border border-white/0.05 rounded-lg p-2 flex flex-col gap-0.5 text-[11px]">
                                <div className="flex justify-between items-center font-medium">
                                  <span className="text-white truncate max-w-[180px]" title={item.name}>{item.name}</span>
                                  <span className="text-neutral-400 text-[10px]">x{item.quantity}</span>
                                </div>
                                <div className="flex justify-between items-center text-[9px] text-[#B2C4AC]">
                                  <span>Rs. {item.price.toLocaleString()} ea</span>
                                  <span>Total: Rs. {(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                                {(item.color || item.size) && (
                                  <div className="flex gap-2 mt-1 text-[8px] text-neutral-400 uppercase tracking-wider font-bold">
                                    {item.color && <span className="bg-white/5 px-1.5 py-0.5 rounded">Color: {item.color}</span>}
                                    {item.size && <span className="bg-white/5 px-1.5 py-0.5 rounded">Size: {item.size}</span>}
                                  </div>
                                )}
                              </div>
                            ))
                          ) : (
                            <span className="text-neutral-500 italic text-[10px]">Legacy details format</span>
                          )}
                        </div>
                      </td>

                      {/* Column 4: Payment Details */}
                      <td className="py-4 text-xs">
                        <div className="flex flex-col gap-1">
                          <span className="text-white font-bold">Rs. {orderPrice.toLocaleString()}</span>
                          <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider text-emerald-450 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10 self-start">
                            <CreditCard className="w-2.5 h-2.5" /> {order.paymentMethod || "COD"}
                          </span>
                        </div>
                      </td>

                      {/* Column 5: Stock Status */}
                      <td className="py-4 text-xs text-center">
                        <button
                          onClick={() => handleToggleStock(order.id, order.stockAvailable)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all duration-300 cursor-pointer ${
                            order.stockAvailable 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20" 
                              : "bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20"
                          }`}
                        >
                          {order.stockAvailable ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>In Stock</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Out of Stock</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Column 6: Fulfillment Action Selector */}
                      <td className="py-4 text-xs text-right">
                        <div className="flex flex-col gap-2 items-end">
                          <div className="relative">
                            <select
                              value={order.status || "PENDING"}
                              onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                              className="appearance-none px-3.5 py-2 pr-8 rounded-xl bg-black/45 border border-white/10 text-xs font-semibold text-white focus:outline-none focus:border-[#B2C4AC] focus:ring-1 focus:ring-[#B2C4AC] cursor-pointer transition-all hover:bg-black/60"
                            >
                              <option value="PENDING">Pending</option>
                              <option value="PROCESSING">Processing</option>
                              <option value="SHIPPED">Out for Delivery</option>
                              <option value="DELIVERED">Delivered</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-400">
                              <Clock className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          {/* Quick Badge indicator */}
                          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                            order.status === "DELIVERED" ? "bg-emerald-500/20 text-emerald-400" :
                            order.status === "SHIPPED" ? "bg-blue-500/20 text-blue-400" :
                            order.status === "PROCESSING" ? "bg-amber-500/20 text-amber-400" :
                            "bg-purple-500/20 text-purple-400"
                          }`}>
                            {order.status || "PENDING"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
