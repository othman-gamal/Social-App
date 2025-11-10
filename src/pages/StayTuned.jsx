import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@heroui/react";
import { FaRocket, FaBell, FaHeart } from "react-icons/fa";

export default function StayTuned() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Card className="bg-white/10 backdrop-blur-xl border-none text-center p-8 rounded-2xl shadow-2xl max-w-md">
          <CardContent>
            <motion.h1
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              🚀 Stay Tuned!
            </motion.h1>
            <motion.p
              className="text-lg text-white/80 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              We're working hard to bring you some{" "}
              <span className="text-pink-300 font-semibold">
                really cool features
              </span>{" "}
              in the next version.
            </motion.p>

            <motion.div
              className="flex justify-center gap-6 text-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaRocket className="text-yellow-300" />
              <FaBell className="text-blue-300" />
              <FaHeart className="text-red-300" />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
