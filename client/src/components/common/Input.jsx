import React from 'react';

const Input = React.forwardRef(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        ref={ref}
        className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
          error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error.message || error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
