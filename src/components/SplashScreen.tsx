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
        <div className="mb-8 relative w-[300px] h-[300px]">
          {/* Suitcase */}
          <motion.svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-1/2 bottom-1/2 transform -translate-x-1/2"
            initial={{ y: 0, scale: 1 }}
            animate={{ 
              y: [-10, -100],
              scale: [1, 0.6],
              opacity: [1, 0.8]
            }}
            transition={{ 
              duration: 2,
              ease: "easeOut",
              times: [0, 1]
            }}
          >
            <rect x="4" y="7" width="16" height="13" rx="2" stroke="white" strokeWidth="2" fill="none" />
            <path d="M8 7V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V7" stroke="white" strokeWidth="2" />
            <path d="M7 11H17M7 15H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </motion.svg>

          {/* Airplane */}
          <motion.svg
            width="120"
            height="120"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-0 bottom-1/2"
            initial={{ 
              x: -50,
              y: 50,
              scale: 0.5,
              opacity: 0,
              rotate: 15
            }}
            animate={{ 
              x: 300,
              y: -100,
              scale: 1,
              opacity: [0, 1, 1, 0],
              rotate: 15
            }}
            transition={{ 
              duration: 2.5,
              delay: 0.3,
              ease: "easeOut",
              opacity: { times: [0, 0.2, 0.8, 1] }
            }}
          >
            <path
              d="M3 8L7 12M7 12L3 16M7 12H21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 8L18 6L21 9L19 11M16 16L18 18L21 15L19 13"
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