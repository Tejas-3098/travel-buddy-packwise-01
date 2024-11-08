import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mb-8 relative w-[200px] h-[200px]">
          {/* Suitcase */}
          <motion.svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 bottom-0"
            initial={{ x: 0, y: 0 }}
            animate={{ x: 100, y: -100 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <rect x="4" y="7" width="16" height="13" stroke="white" strokeWidth="2" fill="none" />
            <path d="M8 7V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V7" stroke="white" strokeWidth="2" />
          </motion.svg>

          {/* Airplane */}
          <motion.svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 bottom-0"
            initial={{ x: -50, y: 50, rotate: 0, opacity: 0 }}
            animate={{ x: 200, y: -100, rotate: 45, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          >
            <path
              d="M4 19L17 6M17 6H8M17 6V15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold text-white mb-4"
        >
          Travel Buddy
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-white/80 italic"
        >
          Pack Smart, Travel Light, Adventure Right
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 space-y-2"
        >
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto" />
          <div className="w-8 h-1 bg-white/40 rounded-full mx-auto" />
          <div className="w-4 h-1 bg-white/60 rounded-full mx-auto" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;