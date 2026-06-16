import React from "react";

export default function AdminEnquiriesPage() {
  const mockupEnquiries = [
    { id: "ENQ-491", name: "Suresh Perera", email: "suresh@example.com", subject: "Customized Gift Packaging", message: "Hi, I wanted to ask if you can do a custom wooden box packaging with engraved initials for the Hamper Standard?", status: "New" },
    { id: "ENQ-490", name: "Dilini Fernando", email: "dilini.f@example.com", subject: "Bulk Order Discount", message: "Hello! We are looking to order 50 packs of the Handmade Cute Diary Pack for an upcoming corporate event. Do you offer corporate pricing?", status: "Pending" },
    { id: "ENQ-489", name: "Ruwan Wijesinghe", email: "ruwanw@example.com", subject: "Delivery Location Inquiry", message: "Do you deliver to Galle? The checkout page wasn't loading the shipping options properly.", status: "Resolved" }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight text-white">Customer Enquiries</h1>
        <p className="text-xs text-neutral-400">Review customer support tickets, customizations, and contact requests.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockupEnquiries.map((enquiry) => (
          <div key={enquiry.id} className="bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/0.05 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC]">{enquiry.id}</span>
                <span className="text-xs font-semibold text-white">{enquiry.subject}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                enquiry.status === "New" ? "bg-rose-500/10 text-rose-400 border-rose-500/10" :
                enquiry.status === "Pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/10" :
                "bg-emerald-500/10 text-emerald-400 border-emerald-500/10"
              }`}>
                • {enquiry.status}
              </span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">From</span>
              <span className="text-xs text-neutral-200">{enquiry.name} ({enquiry.email})</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">Message</span>
              <p className="text-xs text-neutral-300 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/0.02">{enquiry.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
