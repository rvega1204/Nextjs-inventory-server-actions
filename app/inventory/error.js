"use client";
/**
 * ErrorComponent
 * @param {Object} props - The component props.
 * @param {Error} props.error - The error object.
 * @param {Function} props.reset - The reset function.
 * @returns {JSX.Element} The error component.
 */
const ErrorComponent = ({ error, reset }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-red-700">
      <h2 className="text-xl font-semibold">Something went wrong!</h2>
      <p className="mb-4">{error?.message}</p>
      <button
        onClick={() => reset()}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorComponent;
