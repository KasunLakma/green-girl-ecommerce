"use client";

import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  LogOut, 
  User, 
  Package, 
  ShieldCheck, 
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function CustomerProfilePage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!isMounted) return;
      
      let activeUser = currentUser;
      
      if (!activeUser) {
        const stored = sessionStorage.getItem("mockUser");
        if (stored) {
          try {
            activeUser = JSON.parse(stored);
          } catch (e) {
            console.error("Failed to parse mock user:", e);
          }
        }
      }

      if (activeUser) {
        setUser(activeUser);
        document.cookie = `userId=${activeUser.uid || activeUser.id || "mock-uid-12345"}; Path=/; SameSite=Strict; Max-Age=3600`;

        const fetchOrders = async () => {
          setLoadingOrders(true);
          try {
            const res = await fetch('/api/orders', { cache: 'no-store' });
            const data = await res.json();
            if (isMounted) {
              setOrders(data);
            }
          } catch (error) {
            console.error("Error fetching orders:", error);
          } finally {
            if (isMounted) {
              setLoadingOrders(false);
            }
          }
        };

        await fetchOrders();
        if (isMounted) {
          setLoading(false);
        }
      } else {
        setUser(null);
        if (isMounted) {
          router.push("/login");
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("mockUser");
      document.cookie = "userId=; Path=/; Max-Age=0";
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050705] text-[#B2C4AC]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#B2C4AC]/20 border-t-[#B2C4AC] rounded-full animate-spin" />
          <p className="text-[10px] uppercase tracking-[0.25em] font-bold animate-pulse text-neutral-400">
            Securing Connection...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#050705] text-white pt-32 pb-20 px-4 relative overflow-x-hidden">
      {/* Background glowing canvas */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] bg-gradient-to-b from-[#354236]/20 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-8">
        {/* Navigation / Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/0.05 pb-6">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold tracking-[0.3em] text-[#B2C4AC] uppercase">Customer Dashboard</span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white uppercase">Your Profile</h1>
            <p className="text-xs text-neutral-400">Track delivery status, review past purchases, and manage credentials.</p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-rose-500/10 hover:border-rose-500/20 text-xs font-bold tracking-wider text-neutral-300 hover:text-rose-400 transition-all duration-300 self-start md:self-auto cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Sign Out Account
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* User Account Info Details Panel */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="hype-glass p-6 border border-white/0.05 flex flex-col gap-5 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-[#B2C4AC]/5 blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B2C4AC]/10 border border-[#B2C4AC]/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-[#B2C4AC]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold tracking-widest text-[#B2C4AC] uppercase">Logged In As</span>
                  <span className="text-sm font-bold text-white truncate max-w-[180px]">{user?.email}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-3 border-t border-white/0.05 text-xs text-neutral-400">
                <div className="flex items-center justify-between">
                  <span>Security status</span>
                  <span className="text-[#B2C4AC] font-bold flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Member Identity</span>
                  <span className="text-white font-bold uppercase tracking-wider text-[10px]">Customer Profile</span>
                </div>
              </div>
            </div>

            {/* Platform Help Note */}
            <div className="hype-glass p-6 border border-white/0.05 flex flex-col gap-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Need Custom Assistance?</h3>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Our creative directors are available to customize any gift box orders, write custom notes, or schedule special gift hampers.
              </p>
              <a 
                href="mailto:hello@greengirl.luxury" 
                className="text-[10px] font-bold text-[#B2C4AC] hover:text-white transition-colors flex items-center gap-1.5 uppercase mt-1"
              >
                Contact Boutique Support <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Main Order History Panel */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight text-white uppercase flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#B2C4AC]" /> Order History
              </h2>
              <span className="text-[10px] text-neutral-550 uppercase tracking-widest font-semibold font-mono">
                {orders.length} order{orders.length !== 1 && "s"} found
              </span>
            </div>

            {loadingOrders ? (
              <div className="hype-glass p-12 border border-white/0.05 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-2 border-[#B2C4AC]/20 border-t-[#B2C4AC] rounded-full animate-spin" />
                <span className="text-xs text-neutral-450 uppercase tracking-widest font-bold">Fetching Transactions...</span>
              </div>
            ) : (
              <div className="hype-glass p-6 border border-white/0.05 overflow-hidden">
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/0.05 text-[10px] font-bold uppercase tracking-wider text-[#B2C4AC] pb-3">
                        <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Order ID</th>
                        <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Date</th>
                        <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC]">Total Price (Rs.)</th>
                        <th className="pb-3 text-[10px] font-bold tracking-wider uppercase text-[#B2C4AC] text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/0.02">
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-xs text-neutral-400 italic">No orders found in your profile history.</td>
                        </tr>
                      ) : (
                        orders.map((order) => (
                          <tr key={order.id} className="hover:bg-white/0.01 transition-colors">
                            <td className="py-3.5 text-xs font-semibold text-neutral-100 truncate max-w-[120px]" title={order.id}>
                              {order.id}
                            </td>
                            <td className="py-3.5 text-xs text-neutral-300">
                              {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric"
                              }) : "N/A"}
                            </td>
                            <td className="py-3.5 text-xs font-medium text-neutral-200">
                              Rs. {order.totalAmount ? order.totalAmount.toLocaleString() : "0"}
                            </td>
                            <td className="py-3.5 text-xs text-right">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                                order.status === "Delivered" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10" :
                                order.status === "Approved" ? "bg-blue-500/10 text-blue-400 border-blue-500/10" :
                                "bg-amber-500/10 text-amber-400 border-amber-500/10"
                              }`}>
                                • {order.status || "Pending"}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
