export function SiteAtmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.14),_transparent_32%),radial-gradient(circle_at_85%_15%,_rgba(14,165,233,0.12),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.96),_rgba(250,250,250,0.92))]" />
      <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute top-[-8rem] left-[-7rem] h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="absolute top-[18rem] right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-sky-300/20 blur-3xl" />
      <div className="absolute bottom-[-10rem] left-[18%] h-80 w-80 rounded-full bg-zinc-900/5 blur-3xl" />
    </div>
  );
}
