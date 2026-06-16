import React from "react";

export default function AdminEnquiriesPage() {
  const mockupEnquiries = [
    {
      id: "ENQ-101",
      name: "Nishadi Fernando",
      email: "nishadi@gmail.com",
      message: "Can I customize the Stitch Plush Toy box with a handwritten birthday note? Please let me know the pricing.",
      status: "New"
    },
    {
      id: "ENQ-102",
      name: "Kasun Perera",
      email: "kasun@gmail.com",
      message: "Do you provide islandwide delivery for the Handmade Rose Bouquet Hamper? Need it by next Friday.",
      status: "Replied"
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-tight text-white">Customer Enquiries</h1>
        <p className="text-xs text-neutral-400">Review and respond to custom design requests and store inquiries.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockupEnquiries.map((enquiry) => (
          <div key={enquiry.id} className="bg-[#0B0E0B]/40 backdrop-blur-md border border-white/0.05 p-6 rounded-2xl flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-white/0.05 pb-3">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B2C4AC]">
                  {enquiry.id}
                </span>
                {enquiry.status === "New" ? (
                  <span className="flex items-center gap-1.5 bg-[#A1B399]/10 text-[#B2C4AC] px-2.5 py-1 rounded-full text-[10px] font-bold border border-[#A1B399]/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A1B399] animate-pulse" />
                    New
                  </span>
                ) : (
                  <span className="bg-white/5 text-neutral-400 px-2.5 py-1 rounded-full text-[10px] font-bold border border-white/0.05">
                    Replied
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">Sender Info</span>
                <span className="text-xs text-neutral-200 font-semibold">{enquiry.name}</span>
                <span className="text-[10px] text-neutral-400 font-medium">{enquiry.email}</span>
              </div>

              <div className="flex flex-col gap-1 mt-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">Message Inquiry</span>
                <p className="text-xs text-neutral-300 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/0.02">
                  "{enquiry.message}"
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button className="text-[10px] font-bold tracking-wider uppercase border border-white/0.05 hover:bg-white/0.05 text-neutral-300 px-4 py-2 rounded-xl transition-all">
                Dismiss
              </button>
              <button className="text-[10px] font-bold tracking-wider uppercase bg-[#A1B399] text-[#0B0E0B] hover:bg-[#B2C4AC] px-4 py-2 rounded-xl transition-all">
                Respond
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
