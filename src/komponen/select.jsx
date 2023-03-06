export default function Select({
  label,
  isError,
  textError,
  children,
  ...props
}) {
  return (
    <div className="relative">
      <label htmlFor={label}>{label}</label>
      <select
        {...props}
        className="my-1 border border-gray-300 rounded-md px-4 py-3 w-full focus:outline-none focus:border focus:border-gray-400 text-sm font-medium appearance-none"
        id={label}
      >
        {children}
      </select>{" "}
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4  text-gray-700">
        <svg
          class="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
      {isError && (
        <p className="text-sm text-red-500 italic">{textError}</p>
      )}
    </div>
  );
}
