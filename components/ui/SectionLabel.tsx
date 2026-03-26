export default function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-stone mb-3">
      {children}
    </p>
  );
}
