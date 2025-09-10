'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export const DarkModeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`
        relative inline-flex items-center justify-center
        w-14 h-8 rounded-full transition-all duration-300 ease-in-out
        ${theme === 'dark'
                    ? 'bg-blue-600 shadow-lg shadow-blue-500/25'
                    : 'bg-gray-200 hover:bg-gray-300'
                }
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-800
      `}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <span
                className={`
          absolute left-1 inline-flex items-center justify-center
          w-6 h-6 rounded-full bg-white shadow-lg transform transition-all duration-300 ease-in-out
          ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}
        `}
            >
                {theme === 'light' ? (
                    <Sun className="w-4 h-4 text-yellow-500" />
                ) : (
                    <Moon className="w-4 h-4 text-blue-600" />
                )}
            </span>
        </button>
    );
};