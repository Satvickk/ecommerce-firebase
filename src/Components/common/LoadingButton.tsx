import { ButtonHTMLAttributes, ReactNode } from "react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  className?: string;
  children?: ReactNode;
}

export default function LoadingButton({ isLoading, className = "", children, ...props }: LoadingButtonProps) {
  return (
    <button
      className={`btn btn-primary ${isLoading ? 'btn-disabled' : ''} ${className}`}
      {...props}
      disabled={isLoading || props.disabled}
    >
      {isLoading ? (
        <>
          <span className="loading loading-spinner"></span>
          Loading
        </>
      ) : (
        children
      )}
    </button>
  );
}
