"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import CustomButton from "./CustomButton";

const NavBar = () => (
  <header className="w-full  absolute z-10">
    <motion.div
      initial={{ y: "-350%" }} // Initial position off the screen
      animate={{ y: 0 }} // Animate to the final position
      transition={{ duration: 2 }} // Animation settings
    >
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
        <Link
          href="/"
          className="flex justify-center items-center text-slate-400"
        >
          <Image
            src="/logo.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain mr-m-80"
          />
          Wheel World
        </Link>

        <CustomButton
          title="Sign in"
          btnType="button"
          containerStyles="text-white rounded-full bg-blue-950 min-w-[130px]"
        />
      </nav>
    </motion.div>
  </header>
);

export default NavBar;
