"use client";
import React, { useState, useEffect } from "react";

export default function AdminDashboardPage() {
  const [catalogCount, setCatalogCount] = useState(14);

  useEffect(() => {
    const fetchCatalogCount = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setCatalogCount(data.length);
          }
        }
      } catch (err) {
        console.error("Failed to fetch active catalog:", err);
      }
    };
    fetchCatalogCount();
  }, []);

  const activities = [
    { id: 1, text: "New order received for Stitch Plush Toy", time: "2 hours ago", type: "order" },
    { id: 2, text: "Enquiry replied from custom gift pack", time: "4 hours ago", type: "enquiry" },
    { id: 3, text: "Product Catalog updated: Added 'Handmade Rose Bouquet'", time: "1 day ago", type: "catalog" },
    { id: 4, text: "Shipment status for ORD-9280 marked as 'Dispatched'", time: "1 day ago", type: "shipping" },
  ];

  return (
    <div className="flex flex-col gap-8 animate-fadeIn text-neutral-100">
      {/* Headings */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight text-white">Dashboard Overview</h1>
        <p className="text-xs text-neutral-400">Monitor boutique performance, order flow, and catalog health.</p>
      </div>

      {/* Premium Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC]">Total Revenue</span>
            <span className="bg-[#A1B399]/15 text-[#B2C4AC] px-2.5 py-0.5 rounded-full text-[9px] font-bold border border-[#A1B399]/10">
              +18.2%
            </span>
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-bold text-white tracking-tight">Rs. 48,500</div>
            <span className="text-[10px] text-neutral-400 mt-1">Gross sales this month</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC]">Total Orders</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#A1B399] animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-bold text-white tracking-tight">32 Orders</div>
            <span className="text-[10px] text-neutral-400 mt-1">5 pending shipment</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC]">Active Catalog</span>
            <span className="text-[10px] text-neutral-400 font-medium">Synced</span>
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-bold text-white tracking-tight">{catalogCount} Gift Items</div>
            <span className="text-[10px] text-neutral-400 mt-1">Available in public storefront</span>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-4">
        <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC] mb-2">⚡ Recent Operations Log</h2>
        <div className="flex flex-col divide-y divide-white/0.03">
          {activities.map((activity) => (
            <div key={activity.id} className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0 hover:bg-white/0.01 transition-colors rounded-lg px-2 -mx-2">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A1B399]/40" />
                <span className="text-xs text-neutral-200 font-medium">{activity.text}</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
