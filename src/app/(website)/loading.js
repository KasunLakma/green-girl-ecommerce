export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#050705] text-[#B2C4AC]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#B2C4AC]/20 border-t-[#B2C4AC] rounded-full animate-spin" />
        <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400 animate-pulse">
          Loading Storefront...
        </h2>
      </div>
    </div>
  );
}
