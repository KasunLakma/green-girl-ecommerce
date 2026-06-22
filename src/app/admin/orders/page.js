import React from "react";
import { prisma } from "../../../lib/prisma";
import ActiveShipmentRegistry from "./ActiveShipmentRegistry";
import { unstable_noStore as noStore } from "next/cache";

export default async function AdminOrdersPage() {
  noStore();
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });

  const formattedOrders = orders.map((order) => ({
    id: order.id,
    customer: order.name,
    items: "Premium Gift Order",
    total: order.totalAmount,
    status: "Pending"
  }));

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight text-white">Orders Tracking</h1>
        <p className="text-xs text-neutral-400">Monitor and process customer gift package shipments and deliveries.</p>
      </div>

      <ActiveShipmentRegistry initialOrders={formattedOrders} />
    </div>
  );
}
