import { useThemeStore } from "@/store/useThemeStore";

const Setting = ({ onClose }) => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-[#222] p-6 rounded-lg shadow-xl">
        <h2 className="text-lg font-bold mb-4 text-black dark:text-white">Settings</h2>
        <div className="flex items-center justify-between">
          <span className="text-black dark:text-white">Theme: {theme}</span>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={toggleTheme}
          >
            Toggle Theme
          </button>
        </div>
        <button className="mt-6 text-sm text-gray-600" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Setting;
