import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost" | "pill" | "pill-outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer active:scale-[0.98]",
        {
          "bg-ink text-white rounded-lg px-6 py-3 text-[15px] hover:opacity-85":
            variant === "primary",
          "bg-transparent text-ink border-[0.5px] border-ink rounded-lg px-6 py-3 text-[15px] hover:bg-mist":
            variant === "secondary",
          "bg-transparent text-stone rounded-lg px-4 py-2.5 text-[14px] hover:bg-mist":
            variant === "ghost",
          "bg-ink text-white rounded-pill px-5 py-2 text-[13px] hover:opacity-85":
            variant === "pill",
          "bg-transparent text-white border-[0.5px] border-white rounded-lg px-6 py-3 text-[15px] hover:bg-white/10":
            variant === "pill-outline",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
