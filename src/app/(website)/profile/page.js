"use client";

import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  LogOut, 
  User, 
  Package, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Truck,
  ArrowRight,
  ExternalLink
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
      
      // Sandbox fallback: use session storage mock user if firebase user is null
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
        await fetchUserOrders(activeUser);
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

  const fetchUserOrders = async (currentUser) => {
    setLoadingOrders(true);
    try {
      // Query by userId or by customerEmail to be extremely robust
      const ordersRef = collection(db, "orders");
      const q1 = query(ordersRef, where("userId", "==", currentUser.uid));
      const q2 = query(ordersRef, where("customerEmail", "==", currentUser.email));

      const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
      
      const ordersMap = new Map();
      
      snap1.forEach((doc) => {
        ordersMap.set(doc.id, { id: doc.id, ...doc.data() });
      });
      snap2.forEach((doc) => {
        ordersMap.set(doc.id, { id: doc.id, ...doc.data() });
      });

      // Sort orders by createdAt descending
      const sortedOrders = Array.from(ordersMap.values()).sort((a, b) => {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      });

      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("mockUser");
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
                Contact Boutique Support <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Main Order History Panel */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight text-white uppercase flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#B2C4AC]" /> Order History
              </h2>
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">
                {orders.length} order{orders.length !== 1 && "s"} found
              </span>
            </div>

            {loadingOrders ? (
              <div className="hype-glass p-12 border border-white/0.05 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-2 border-[#B2C4AC]/20 border-t-[#B2C4AC] rounded-full animate-spin" />
                <span className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Fetching Transactions...</span>
              </div>
            ) : orders.length === 0 ? (
              <div className="hype-glass p-12 border border-white/0.05 text-center flex flex-col items-center gap-4">
                <Package className="w-10 h-10 text-neutral-500" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-bold text-white uppercase">No Orders Found</h3>
                  <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
                    You haven't placed any boutique luxury purchases yet. Complete a checkout transaction to generate dynamic order tracking logs.
                  </p>
                </div>
                <Link 
                  href="/"
                  className="px-6 py-2.5 bg-[#B2C4AC] hover:bg-[#A1B399] text-[#0D110D] rounded-full font-bold text-[10px] uppercase tracking-widest transition-all duration-300 mt-2"
                >
                  Browse Storefront
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {orders.map((order) => {
                  const statusColors = {
                    "Pending Approval": "bg-amber-500/10 border-amber-500/20 text-amber-400",
                    "Shipped": "bg-blue-500/10 border-blue-500/20 text-blue-400",
                    "Delivered": "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  };

                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="hype-glass p-5 sm:p-6 border border-white/0.05 flex flex-col gap-5 hover:border-white/10 transition-all duration-300"
                    >
                      {/* Order Header Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/0.05 pb-4">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-white tracking-wider">{order.orderId || `ORD-${order.id.slice(0, 6)}`}</span>
                            <span className="text-[10px] text-neutral-550">•</span>
                            <span className="text-[10px] text-neutral-400 font-medium">
                              {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric"
                              }) : "Date N/A"}
                            </span>
                          </div>
                          <span className="text-[9px] text-neutral-400">Payment: <strong className="text-white uppercase font-bold text-[8px]">{order.paymentMethod || "COD"}</strong></span>
                        </div>

                        {/* Real-time Tracking Badge */}
                        <div className={`px-3 py-1 rounded-full border text-[9px] font-black tracking-widest uppercase self-start sm:self-auto flex items-center gap-1.5 ${statusColors[order.shippingStatus] || statusColors["Pending Approval"]}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          {order.shippingStatus || "Pending Approval"}
                        </div>
                      </div>

                      {/* Items Ordered */}
                      <div className="flex flex-col gap-3">
                        {order.items && order.items.map((item, index) => (
                          <div key={item.id || index} className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/35 border border-white/0.05 flex-shrink-0">
                              <img 
                                src={item.image || "/images/stitch_toy.png"} 
                                alt={item.name} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[8px] font-bold tracking-widest text-[#B2C4AC] uppercase">{item.category || "Boutique"}</span>
                              <h4 className="text-[11px] font-bold text-white truncate">{item.name}</h4>
                              <span className="text-[9px] text-neutral-400">Qty: {item.qty || 1}</span>
                            </div>
                            <span className="text-xs font-bold text-white">
                              Rs. {(typeof item.price === "number" ? item.price : parseInt(String(item.price).replace(/[^0-9]/g, "")) || 0).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer summary */}
                      <div className="flex items-center justify-between border-t border-white/0.05 pt-4 text-xs">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Shipping To</span>
                          <span className="text-[10px] text-neutral-300 font-medium truncate max-w-[200px]" title={order.customerAddress}>
                            {order.customerAddress || "Colombo, Sri Lanka"}
                          </span>
                        </div>

                        <div className="flex flex-col items-end gap-0.5">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Amount Paid</span>
                          <span className="text-sm font-black text-[#B2C4AC]">Rs. {order.totalAmount ? order.totalAmount.toLocaleString() : "0"}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
