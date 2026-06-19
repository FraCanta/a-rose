export function Eyebrow({
  children,
  light = false,
  centered = false,
}: {
  children: React.ReactNode;
  light?: boolean;
  centered?: boolean;
}) {
  return (
    <p
      className={`mb-6 flex items-center gap-3 text-[10px] lg:text-[11px] font-extrabold uppercase tracking-[0.2em] ${
        light ? "text-[#e9a5b2]" : "text-wine"
      } ${centered ? "justify-center" : ""}`}
    >
      <span className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}
