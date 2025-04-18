import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    const displayname = 'John Doe';
    const email = 'john@example.com';

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-[#0d0d0d] px-6 py-4 relative z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="text-xl font-bold text-white">
                    MyApp
                </Link>

                <div className="flex items-center space-x-6 text-gray-300">
                    <nav className="flex space-x-6">
                        <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
                        <Link to="/deploy" className="hover:text-white transition">Deploy</Link>
                    </nav>

                    {/* Profile Button */}
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            ref={buttonRef}
                            className="text-white rounded-full flex items-center justify-center w-12 h-12 hover:scale-110 transition-transform duration-300 ease-in-out"
                        >
                            <img
                                src="https://placehold.co/40x40?text=P"
                                alt="Profile"
                                className="w-12 h-12 rounded-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                            />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div
                                ref={dropdownRef}
                                className="absolute right-0 mt-2 w-56 bg-black border border-gray-800 rounded-lg shadow-lg"
                            >
                                <div className="flex flex-col text-white p-4">
                                    <div className="border-b border-gray-700 pb-2 text-center">
                                        <span className="text-lg font-semibold block">{displayname}</span>
                                        <span className="text-xs text-gray-400 block">{email}</span>
                                    </div>

                                    <Link to="/dashboard" className="mt-4 text-sm text-gray-400 hover:text-white text-center">
                                        Dashboard
                                    </Link>

                                    <Link to="/account-settings" className="mt-2 text-sm text-gray-400 hover:text-white text-center">
                                        Account Settings
                                    </Link>

                                    <button className="mt-4 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm transition duration-200 ease-in-out">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
