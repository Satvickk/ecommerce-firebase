export default function LoadingButton({ isLoading, className, children, ...props }) {
    return (
      <button
        className={`btn btn-primary ${isLoading ? 'btn-disabled' : ''} ${className}`}
        {...props}
        disabled={isLoading}
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
  