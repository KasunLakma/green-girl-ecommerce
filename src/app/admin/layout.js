"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      let activeUser = currentUser;

      if (!activeUser) {
        const stored = sessionStorage.getItem("mockAdmin");
        if (stored) {
          try {
            activeUser = JSON.parse(stored);
          } catch (e) {
            console.error("Failed to parse mock admin:", e);
          }
        }
      }

      if (!isLoginPage) {
        if (!activeUser) {
          router.replace("/admin/login");
        } else if (!activeUser.email || !activeUser.email.endsWith("@greengirl.com")) {
          await signOut(auth);
          sessionStorage.removeItem("mockAdmin");
          router.replace("/admin/login");
        } else {
          setUser(activeUser);
          setLoading(false);
        }
      } else {
        if (activeUser && activeUser.email && activeUser.email.endsWith("@greengirl.com")) {
          router.replace("/admin/dashboard");
        } else {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, [pathname, isLoginPage, router]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050705] text-[#B2C4AC]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#B2C4AC]/20 border-t-[#B2C4AC] rounded-full animate-spin" />
          <p className="text-[10px] uppercase tracking-[0.25em] font-bold animate-pulse text-neutral-400">
            Verifying Credentials...
          </p>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return <div className="min-h-screen w-full bg-[#0D110D]">{children}</div>;
  }

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Products", href: "/admin" },
    { name: "Orders", href: "/admin/orders" },
    { name: "Categories", href: "/admin/categories" },
    { name: "Users", href: "/admin/users" },
  ];

  return (
    <div className="min-h-screen w-full flex bg-[#0D110D] text-neutral-100 select-none overflow-hidden">
      {/* High-Contrast Fixed Sidebar Layout */}
      <aside className="w-64 min-h-screen bg-[#0B0E0B]/80 backdrop-blur-md border-r border-white/0.05 p-6 flex flex-col justify-between z-20">
        <div className="flex flex-col gap-8">
          <div className="px-4 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A1B399] animate-pulse" />
            <h1 className="text-xs font-bold tracking-[0.2em] uppercase text-[#B2C4AC]">
              Green Girl Admin
            </h1>
          </div>

          {/* User Profile / Security Configuration Element */}
          <div className="mx-2 p-4 rounded-xl bg-white/0.02 border border-white/0.05 flex flex-col gap-2.5">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">Security Profile</span>
              <div className="text-xs font-bold text-white tracking-wider truncate">
                {user?.email || "Greengirl Admin"}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A1B399] animate-pulse" />
              <span className="text-[9px] font-bold tracking-widest uppercase text-[#B2C4AC]">Role: Super Admin</span>
            </div>

            <div className="text-[9px] text-neutral-500 font-medium leading-relaxed border-t border-white/0.03 pt-2">
              Top-Tier Access • Full Control (Inventory, Orders, Support & System Configuration)
            </div>
          </div>

          <nav className="flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href} className="w-full block">
                  <button
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold tracking-wider transition-all duration-200 ${
                      isActive
                        ? "bg-[#A1B399]/20 text-[#B2C4AC] border border-[#A1B399]/30 shadow-[0_0_15px_rgba(161,179,153,0.05)]"
                        : "text-neutral-200 hover:bg-white/0.05 hover:text-white border border-transparent"
                    }`}
                  >
                    {item.name}
                  </button>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex flex-col gap-3 px-2 py-4 border-t border-white/0.05">
          <button
            onClick={async () => {
              await signOut(auth);
              sessionStorage.removeItem("mockAdmin");
              router.replace("/admin/login");
            }}
            className="w-full text-left px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase text-rose-400 hover:bg-rose-500/10 transition-all duration-200 border border-transparent hover:border-rose-500/20"
          >
            Sign Out
          </button>
          <div className="px-4 text-[9px] text-neutral-500 font-bold tracking-widest uppercase">
            System Live • v1.0
          </div>
        </div>
      </aside>

      {/* Main Framework Content Area wrapper with high contrast global adjustments */}
      <main className="flex-1 min-h-screen p-8 lg:p-12 overflow-y-auto relative z-10 bg-gradient-to-b from-[#111612]/30 to-transparent">
        {/* Injecting dynamic styling targeting inner text issues globally */}
        <style jsx global>{`
          th {
            color: #B2C4AC !important;
            font-weight: 700 !important;
            letter-spacing: 0.1em !important;
          }
          label {
            color: #E5E5E5 !important;
          }
        `}</style>
        {children}
      </main>
    </div>
  );
}
