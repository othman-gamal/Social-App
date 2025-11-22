import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
// Example Heroicon for the 'flare' or 'great' theme
import { SparklesIcon } from "@heroicons/react/24/solid";

const StayTuned = () => {
  // 1. Text to type
  const text = "Stay tuned for version 2 and great features!";
  const characters = text.split("");

  // 2. Framer Motion state for the typing effect
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const displayText = useTransform(rounded, (latest) =>
    characters.slice(0, latest).join("")
  );

  // 3. Animation for the typing effect
  useEffect(() => {
    const controls = animate(count, characters.length, {
      type: "tween",
      duration: 3, // Adjust duration for typing speed
      ease: "linear",
      repeat: Infinity, // Optional: Repeat the typing
      repeatType: "reverse", // Optional: Type backwards after finishing
      repeatDelay: 1, // Pause before repeating
    });
    return controls.stop;
  }, [characters.length, count]);

  // Framer Motion variants for staggered word/character animation (optional)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Stagger animation for each element
        delayChildren: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center p-8 bg-gray-900 min-h-screen text-white"
    >
      {/* Flare/Fire Glow Element */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 m-auto size-96 rounded-full opacity-30 blur-2xl animate-glow-pulse"
        style={{
          // Use a radial gradient for a flare/fire look
          background:
            "radial-gradient(circle, #FF4500 0%, #FF8C00 50%, transparent 70%)",
        }}
      />

      {/* Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center space-y-6"
      >
        <SparklesIcon className="mx-auto size-16 text-yellow-400 mb-4 animate-bounce" />

        <h1
          className="text-6xl md:text-8xl font-extrabold"
          style={{ lineHeight: "1.2" }}
        >
          {/* Animated Gradient Text (requires tailwind.config.js setup) */}
          <span className="inline-block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-transparent bg-clip-text bg-300% animate-gradient">
            STAY TUNED
          </span>
        </h1>

        <p className="text-xl md:text-2xl font-mono min-h-[3rem]">
          {/* Typing Effect Display */}
          <motion.span>{displayText}</motion.span>
          {/* Blinking Cursor */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 0,
              ease: "easeInOut",
            }}
            className="inline-block w-1 bg-white h-full align-text-top ml-1"
          />
        </p>
      </motion.div>
    </motion.div>
  );
};

export default StayTuned;
