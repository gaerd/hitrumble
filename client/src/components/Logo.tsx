interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-12",
  md: "h-16",
  lg: "h-24",
  xl: "h-48",
};

export default function Logo({ className = "", size = "lg" }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="Logo"
      className={`w-auto ${sizeClasses[size]} ${className}`}
    />
  );
}
