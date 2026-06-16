import React from "react";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight text-white">Dashboard Overview</h1>
        <p className="text-xs text-neutral-400">Real-time analytics, sales highlights, and boutique performance metrics.</p>
      </div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-2">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC]">Total Revenue</span>
          <div className="text-2xl font-bold text-white tracking-tight">Rs. 142,800</div>
          <span className="text-[10px] text-emerald-400 font-medium">+12.4% from last week</span>
        </div>

        <div className="bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-2">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC]">Active Orders</span>
          <div className="text-2xl font-bold text-white tracking-tight">24 Pending</div>
          <span className="text-[10px] text-neutral-400 font-medium">8 dispatched today</span>
        </div>

        <div className="bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-2">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC]">Conversion Rate</span>
          <div className="text-2xl font-bold text-white tracking-tight">3.48%</div>
          <span className="text-[10px] text-emerald-400 font-medium">+0.8% increase</span>
        </div>

        <div className="bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-2">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC]">Boutique Enquiries</span>
          <div className="text-2xl font-bold text-white tracking-tight">12 Open</div>
          <span className="text-[10px] text-amber-400 font-medium">4 urgent tickets</span>
        </div>
      </div>

      {/* Main Analytics Highlight */}
      <div className="bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-4">
        <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC]">📈 Weekly Performance</h2>
        <div className="h-48 flex items-end justify-between gap-2 pt-6 border-b border-white/0.05">
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-[#A1B399]/20 hover:bg-[#A1B399]/30 rounded-t-lg transition-all" style={{ height: "40%" }} />
            <span className="text-[9px] uppercase tracking-wider text-neutral-400">Mon</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-[#A1B399]/20 hover:bg-[#A1B399]/30 rounded-t-lg transition-all" style={{ height: "55%" }} />
            <span className="text-[9px] uppercase tracking-wider text-neutral-400">Tue</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-[#A1B399]/20 hover:bg-[#A1B399]/30 rounded-t-lg transition-all" style={{ height: "45%" }} />
            <span className="text-[9px] uppercase tracking-wider text-neutral-400">Wed</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-[#A1B399]/40 hover:bg-[#A1B399]/50 rounded-t-lg transition-all" style={{ height: "75%" }} />
            <span className="text-[9px] uppercase tracking-wider text-neutral-400">Thu</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-[#A1B399]/20 hover:bg-[#A1B399]/30 rounded-t-lg transition-all" style={{ height: "60%" }} />
            <span className="text-[9px] uppercase tracking-wider text-neutral-400">Fri</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-[#A1B399]/60 hover:bg-[#A1B399]/70 rounded-t-lg transition-all" style={{ height: "90%" }} />
            <span className="text-[9px] uppercase tracking-wider text-neutral-400">Sat</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-[#A1B399]/80 hover:bg-[#A1B399]/90 rounded-t-lg transition-all" style={{ height: "100%" }} />
            <span className="text-[9px] uppercase tracking-wider text-neutral-400">Sun</span>
          </div>
        </div>
      </div>
    </div>
  );
}
