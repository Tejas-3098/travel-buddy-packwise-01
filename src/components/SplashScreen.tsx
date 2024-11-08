import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Luggage } from "lucide-react";

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
      <motion.div className="text-center">
        <motion.div
          initial={{ x: -100, opacity: 1 }}
          animate={{ x: window.innerWidth }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="mb-8"
        >
          <Luggage className="w-24 h-24 text-white" />
        </motion.div>

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
      </motion.div>
    </div>
  );
};

export default SplashScreen;