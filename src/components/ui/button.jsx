// ✅ default export
export default function Button({ children, className = "", ...props }) {
    return (
      <button
        className={`bg-lime-600 hover:bg-lime-700 text-white font-semibold px-6 py-2 rounded-2xl transition duration-200 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  