import { ButtonHTMLAttributes, ReactNode } from "react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function LoadingButton({ isLoading, className = "", children, ...props }: LoadingButtonProps) {
  return (
    <button
      className={`bg-black text-white font-black uppercase text-xs tracking-widest px-6 py-3 border-2 border-black rounded-none transition-colors duration-150 hover:bg-swiss-accent hover:border-swiss-accent disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
      disabled={isLoading || props.disabled}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="animate-spin border-2 border-white border-t-transparent w-4 h-4 rounded-full"></span>
          <span>PROCESSING...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
