'use client';
import { Github, Menu, Search, Terminal, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { DarkModeToggle } from '../theme/DarkModeToggle';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <Terminal className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                            <span className="ml-2 text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
                                TapsTechie
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/about"
                            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                        >
                            About
                        </Link>
                        <a
                            href="https://github.com/tarunsha009"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 flex items-center transition-colors duration-200"
                        >
                            <Github className="mr-1" size={18} />
                            GitHub
                        </a>
                    </div>

                    {/* Search & Dark Mode Toggle */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search posts..."
                                className="w-64 px-4 py-1 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 placeholder-gray-500 dark:placeholder-gray-400"
                            />
                            <Search className="absolute right-3 top-1.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        </div>
                        <DarkModeToggle />
                    </div>

                    {/* Mobile menu button & Dark Mode */}
                    <div className="md:hidden flex items-center space-x-2">
                        <DarkModeToggle />
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300">
                    <div className="px-2 py-3 space-y-1">
                        <Link
                            href="/"
                            className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/about"
                            className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>
                        <a
                            href="https://github.com/tarunsha009"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                        >
                            <Github className="mr-2" size={18} />
                            GitHub
                        </a>
                        {/* Mobile Search */}
                        <div className="px-3 py-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search posts..."
                                    className="w-full px-4 py-2 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 placeholder-gray-500 dark:placeholder-gray-400"
                                />
                                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;