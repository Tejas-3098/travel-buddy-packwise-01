import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/auth");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      {/* Initial Logo Animation */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.645, 0.045, 0.355, 1.000]
        }}
        className="relative"
      >
        {/* App Logo */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
          className="mb-6"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary via-secondary to-accent shadow-xl flex items-center justify-center">
            <span className="text-4xl text-white">TB</span>
          </div>
        </motion.div>

        {/* App Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Travel Buddy
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Your Smart Packing Assistant
          </p>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="mt-8 h-1 w-48 bg-gradient-to-r from-primary via-secondary to-accent rounded-full mx-auto"
        />

        {/* Fade out overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.3 }}
          className="fixed inset-0 bg-white dark:bg-gray-900"
          style={{ zIndex: 50 }}
        />
      </motion.div>
    </div>
  );
};

export default SplashScreen;