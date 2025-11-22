import React from "react";
import { motion } from "framer-motion";
// Using a sad face or warning icon for a "not found" page
import { FaceFrownIcon } from "@heroicons/react/24/solid"; // Or ExclamationTriangleIcon, QuestionMarkCircleIcon
import { Link } from "react-router-dom"; // Assuming you use react-router-dom for navigation

const Notfound = () => {
  // Framer Motion variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animation for child elements
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  // Variants for the floating/bouncing 404 text
  const fourOhFourVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -15, 0], // Float up and down slightly
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        delay: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-indigo-950 text-white p-6 text-center"
    >
      {/* Icon */}
      <motion.div variants={itemVariants}>
        <FaceFrownIcon className="size-24 text-red-500 mb-8 animate-pulse" />
      </motion.div>

      {/* 404 Text with floating animation */}
      <motion.h1
        variants={fourOhFourVariants}
        initial="initial"
        animate="animate"
        className="text-9xl md:text-[12rem] font-extrabold text-red-600 drop-shadow-lg"
        style={{ textShadow: "0 0 20px rgba(220, 38, 38, 0.7)" }}
      >
        404
      </motion.h1>

      {/* Main Message */}
      <motion.p
        variants={itemVariants}
        className="text-2xl md:text-3xl font-semibold mt-4 mb-8 text-gray-300"
      >
        Oops! The page you're looking for went on an adventure.
      </motion.p>

      {/* Detailed Message */}
      <motion.p
        variants={itemVariants}
        className="text-lg mb-12 max-w-lg text-gray-400"
      >
        It might have been moved, deleted, or never existed in the first place.
        Don't worry, we'll help you find your way back home.
      </motion.p>

      {/* Go Home Button */}
      <motion.div variants={itemVariants}>
        {/* Use Link from react-router-dom or a regular <a> tag */}
        <Link to="/" className="inline-block">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 16px rgba(129, 140, 248, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full text-lg shadow-lg transition-all duration-300 ease-in-out"
          >
            Go Back Home
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Notfound;
