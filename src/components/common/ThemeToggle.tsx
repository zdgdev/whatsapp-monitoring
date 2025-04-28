import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-whatsapp-dark-secondary"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-gray-600 dark:text-gray-300" />
      ) : (
        <Moon size={20} className="text-gray-600" />
      )}
    </button>
  );
};

export default ThemeToggle;