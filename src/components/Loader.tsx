import { useThemeStore } from "../store/useThemeStore";

const Loader = () => {
  const { theme } = useThemeStore();

  return (
    <div
      className={
        theme === "light"
          ? "flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200"
          : "flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"
      }
    >
      <div className="relative">
        <div
          className={
            theme === "light"
              ? "w-20 h-20 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
              : "w-20 h-20 border-4 border-gray-600 border-t-blue-400 rounded-full animate-spin"
          }
        ></div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className={
              theme === "light"
                ? "w-12 h-12 bg-blue-100 rounded-full animate-pulse"
                : "w-12 h-12 bg-blue-900/30 rounded-full animate-pulse"
            }
          ></div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p
          className={
            theme === "light"
              ? "text-gray-800 text-lg font-semibold animate-pulse"
              : "text-white text-lg font-semibold animate-pulse"
          }
        >
          Loading Portfolio
        </p>
        <p
          className={
            theme === "light"
              ? "text-gray-600 text-sm mt-2"
              : "text-gray-300 text-sm mt-2"
          }
        >
          Fetching data from blockchain...
        </p>
      </div>
    </div>
  );
};

export default Loader;
