import clsx from "clsx";

type Color = "blue" | "green" | "amber" | "red" | "purple" | "gray";

const colorMap: Record<Color, string> = {
  blue: "bg-[#E6F1FB] text-[#185FA5]",
  green: "bg-[#EAF3DE] text-[#3B6D11]",
  amber: "bg-[#FAEEDA] text-[#854F0B]",
  red: "bg-[#FCEBEB] text-[#A32D2D]",
  purple: "bg-[#EEEDFE] text-[#534AB7]",
  gray: "bg-mist text-slate",
};

export default function Badge({
  label,
  color = "gray",
}: {
  label: string;
  color?: Color;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-pill text-[12px] font-medium",
        colorMap[color]
      )}
    >
      {label}
    </span>
  );
}
