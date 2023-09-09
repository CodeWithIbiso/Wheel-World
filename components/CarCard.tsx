"use client";

import { useState } from "react";
import Image from "next/image";

import { calculateCarRent, generateCarImageUrl } from "@utils";
import { CarProps } from "@types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";
import { motion } from "framer-motion";

interface CarCardProps {
  car: CarProps;
  index: number;
}

const CarCard = ({ car, index }: CarCardProps) => {
  const { city_mpg, year, make, model, transmission, drive } = car;
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const carRent = calculateCarRent(city_mpg, year);
  return (
    <>
      <motion.div
        initial={hasAnimated ? "show" : "hidden"}
        whileInView="show"
        variants={{
          hidden: {
            x: 0,
            y: 100,
            opacity: 0,
          },
          show: {
            x: 0,
            y: 0,
            opacity: 1, // keep showing else will animate when in viewport
            transition: {
              type: "spring",
              delay: index / 3.5,
              duration: 0.5,
              ease: "easeOut",
            },
          },
        }}
        onAnimationComplete={() => setHasAnimated(true)} // Set hasAnimated to true after the first animation
      >
        <div className="car-card group bg-slate-800">
          <div className="car-card__content">
            <h2 className="car-card__content-title dark:text-primary-blue-100">
              {make} {model}
            </h2>
          </div>

          <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold dark:text-blue-300">
            <span className="self-start text-[14px] leading-[17px] font-semibold dark:text-blue-300">
              $
            </span>
            {carRent}
            <span className="self-end text-[14px] leading-[17px] font-medium dark:text-blue-300">
              /day
            </span>
          </p>

          <div className="relative w-full h-40 my-3 object-contain">
            <Image
              src={`/cars/${index + 1}.jpeg`}
              alt="car model"
              fill
              priority
              className="object-cover"
            />
            {/* <Image src={generateCarImageUrl(car)} alt='car model' fill priority className='object-contain' /> */}
          </div>

          <div className="relative flex w-full mt-2">
            <div className="flex group-hover:invisible w-full justify-between text-grey">
              <div className="flex flex-col justify-center items-center gap-2">
                <Image
                  src="/steering-wheel.svg"
                  width={20}
                  height={20}
                  alt="steering wheel"
                />
                <p className="text-[14px] leading-[17px]">
                  {transmission === "a" ? "Automatic" : "Manual"}
                </p>
              </div>
              <div className="car-card__icon">
                <Image src="/tire.svg" width={20} height={20} alt="seat" />
                <p className="car-card__icon-text">{drive.toUpperCase()}</p>
              </div>
              <div className="car-card__icon">
                <Image src="/gas.svg" width={20} height={20} alt="seat" />
                <p className="car-card__icon-text">{city_mpg} MPG</p>
              </div>
            </div>

            <div className="car-card__btn-container">
              <CustomButton
                title="View More"
                containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                textStyles="text-white text-[14px] leading-[17px] font-bold"
                rightIcon="/right-arrow.svg"
                handleClick={() => setIsOpen(true)}
              />
            </div>
          </div>
        </div>
      </motion.div>
      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </>
  );
};

export default CarCard;
