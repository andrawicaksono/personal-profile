import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-lg dark:shadow-gray-900/50 transition-all duration-200 z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <SunIcon className="w-6 h-6 text-yellow-500 transition-colors duration-200" />
      ) : (
        <MoonIcon className="w-6 h-6 text-blue-600 transition-colors duration-200" />
      )}
    </motion.button>
  );
}
