"use client";

import Image from "next/image";

import { CustomButton, Three } from "@components";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Hero = () => {
  const [showDiv, setShowDiv] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowDiv(true);
    }, 2000); // 10 seconds
    return () => clearTimeout(timeout);
  }, []);
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      {showDiv && (
        <motion.div
          initial={{ opacity: 0, x: "-50%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="hero h-80">
            <div className="flex-1 pt-36 padding-x">
              <h1 className="hero__title dark:text-white">
                Discover Your Dream Ride!
              </h1>

              <p className="hero__subtitle dark:text-slate-400">
                Experience Automotive Excellence.
              </p>

              <CustomButton
                title="Browse Our Fleet"
                containerStyles="text-white rounded-full bg-blue-950 mt-10 whitespace-nowrap"
                handleClick={handleScroll}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default () => {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <>
      <div className="h-800 w-full relative">
        <Three isMobile={isMobile} setIsMobile={setIsMobile} />
      </div>
      <div
        className={`absolute z-[200000000000] top-0 ${
          isMobile ? "w-full" : "w-1/2"
        }`}
      >
        <Hero />
      </div>
    </>
  );
};
