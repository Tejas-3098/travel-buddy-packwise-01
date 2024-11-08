import { motion } from "framer-motion";

const SplashScreen = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
      
      {/* Initial Logo Animation */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.645, 0.045, 0.355, 1.000]
        }}
        className="relative z-10 flex flex-col items-center justify-center"
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
          <div className="w-24 h-24 rounded-full bg-primary shadow-xl flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            <span className="text-4xl text-white font-bold">TB</span>
          </div>
        </motion.div>

        {/* App Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-primary">
            Travel Buddy
          </h1>
          <p className="mt-2 text-primary/70">
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
          className="mt-8 h-1 w-48 bg-primary rounded-full mx-auto relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite] -skew-x-12" />
        </motion.div>

        {/* Fade out overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.3 }}
          className="fixed inset-0 bg-white"
          style={{ zIndex: 50 }}
        />
      </motion.div>
    </div>
  );
};

export default SplashScreen;