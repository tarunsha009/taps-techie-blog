'use client';
import { Github, Menu, Search, Terminal, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <Terminal className="h-8 w-8 text-blue-500" />
                            <span className="ml-2 text-2xl font-bold text-gray-800">
                                TapsTechie
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className="text-gray-600 hover:text-blue-500"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/about"
                            className="text-gray-600 hover:text-blue-500"
                        >
                            About
                        </Link>
                        <a
                            href="https://github.com/tarunsha009"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-blue-500 flex items-center"
                        >
                            <Github className="mr-1" size={18} />
                            GitHub
                        </a>
                    </div>

                    {/* Search */}
                    <div className="hidden md:flex items-center">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search posts..."
                                className="w-64 px-4 py-1 text-gray-800 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="absolute right-3 top-1.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-600 hover:text-blue-500"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-200">
                    <div className="px-2 py-3 space-y-1">
                        <Link
                            href="/"
                            className="block px-3 py-2 text-gray-600 hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/about"
                            className="block px-3 py-2 text-gray-600 hover:bg-gray-100"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>
                        <a
                            href="https://github.com/tarunsha009"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100"
                        >
                            <Github className="mr-2" size={18} />
                            GitHub
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;