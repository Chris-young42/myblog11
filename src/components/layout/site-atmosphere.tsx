export function SiteAtmosphere() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.14),_transparent_32%),radial-gradient(circle_at_85%_15%,_rgba(24,24,27,0.08),_transparent_28%),linear-gradient(180deg,_rgba(250,250,250,0.98),_rgba(244,244,245,0.95))]" />
      <div className="absolute inset-0 opacity-[0.28] [background-image:linear-gradient(rgba(9,9,11,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(9,9,11,0.05)_1px,transparent_1px)] [background-size:80px_80px]" />
      <div className="absolute top-[-8rem] left-[-7rem] h-96 w-96 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="absolute top-[18rem] right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-zinc-900/10 blur-3xl" />
      <div className="absolute bottom-[-10rem] left-[18%] h-80 w-80 rounded-full bg-blue-100/80 blur-3xl" />
    </div>
  );
}
