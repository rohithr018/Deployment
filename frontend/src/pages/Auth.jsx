import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiLogIn, FiUserPlus } from 'react-icons/fi';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleMode = () => setIsLogin(!isLogin);

    const leftVariants = {
        initial: { opacity: 0, x: 80 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -80 }
    };

    const rightVariants = {
        initial: { opacity: 0, x: -80 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 80 }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] p-4">
            <div className="w-full max-w-5xl bg-[#0e0e0e] rounded-3xl shadow-2xl border border-gray-800 overflow-hidden flex flex-col md:flex-row transition-all duration-700" style={{ minHeight: '550px' }}>

                {/* Left Panel */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-10 text-white bg-[#111111]">
                    <AnimatePresence mode="wait">
                        {isLogin ? (
                            <motion.div
                                key="login"
                                initial={leftVariants.initial}
                                animate={leftVariants.animate}
                                exit={rightVariants.exit}
                                transition={{ duration: 0.75, ease: 'easeInOut' }}
                                className="w-full"
                            >
                                <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                                    <FiLogIn size={28} />
                                    Login
                                </h2>

                                <form className="space-y-4 w-full max-w-sm mx-auto">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
                                    />
                                    <button className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                                        Login
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.img
                                key="login-img"
                                initial={leftVariants.initial}
                                animate={leftVariants.animate}
                                exit={rightVariants.exit}
                                transition={{ duration: 0.75 }}
                                src="https://placehold.co/400x400?text=Login"
                                alt="Login Illustration"
                                className="rounded-lg max-h-100 object-cover shadow-xl border border-gray-700"
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* Toggle Button Panel */}
                <div className="relative w-16 flex flex-col items-center justify-center bg-[#111111]">
                    <div className="h-full w-px bg-gray-700 absolute top-0 left-1/2 transform -translate-x-1/2"></div>

                    <div
                        onClick={toggleMode}
                        className="z-10 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-gray-700 rounded-full px-3 py-3 cursor-pointer transition"
                    >
                        <AnimatePresence mode="wait">
                            {isLogin ? (
                                <motion.div
                                    key="toggle-login"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col items-center"
                                >
                                    <FiChevronRight size={20} />
                                    <span className="text-xs font-medium">Register</span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="toggle-register"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col items-center"
                                >
                                    <FiChevronLeft size={20} />
                                    <span className="text-xs font-medium">Login</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-10 text-white bg-[#111111]">
                    <AnimatePresence mode="wait">
                        {!isLogin ? (
                            <motion.div
                                key="register"
                                initial={rightVariants.initial}
                                animate={rightVariants.animate}
                                exit={leftVariants.exit}
                                transition={{ duration: 0.75, ease: 'easeInOut' }}
                                className="w-full"
                            >
                                <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                                    <FiUserPlus size={28} />
                                    Create an Account
                                </h2>

                                <form className="space-y-4 w-full max-w-sm mx-auto">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
                                    />
                                    <input
                                        type="password"
                                        placeholder="Create a Password"
                                        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
                                    />
                                    <input
                                        type="url"
                                        placeholder="GitHub Profile URL"
                                        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm"
                                    />
                                    <button className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                                        Register
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.img
                                key="register-img"
                                initial={rightVariants.initial}
                                animate={rightVariants.animate}
                                exit={leftVariants.exit}
                                transition={{ duration: 0.75 }}
                                src="https://placehold.co/400x400?text=Register"
                                alt="Register Illustration"
                                className="rounded-lg max-h-100 object-cover shadow-xl border border-gray-700"
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Auth;
