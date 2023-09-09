import Image from "next/image";
import Link from "next/link";

import { footerLinks } from "@constants";

const Footer = () => (
  <footer className="flex flex-col text-black-100  pt-5 border-t border-slate-600-100 bg-slate-900">
    <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
      <div className="flex flex-col justify-start items-start gap-6">
        <div className="flex justify-center items-center text-slate-400">
          <Image
            src="/logo.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain mr-m-80"
          />
          Wheel World
        </div>
        <p className="text-base text-gray-700 dark:text-slate-400">
          WheelWorld 2023 <br />
          All Rights Reserved &copy;
        </p>
      </div>

      <div className="footer__links">
        {footerLinks.map((item) => (
          <div key={item.title} className="footer__link">
            <h3 className="font-bold dark:text-slate-400">{item.title}</h3>
            <div className="flex flex-col gap-5">
              {item.links.map((link) => (
                <Link
                  key={link.title}
                  href={link.url}
                  className="text-gray-500 dark:text-slate-400"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-100 sm:px-16 px-6 py-10 dark:text-slate-400">
      <p>@2023 WheelWorld. All rights reserved</p>

      <div className="footer__copyrights-link">
        <Link href="/" className="text-gray-500 dark:text-slate-400">
          Privacy & Policy
        </Link>
        <Link href="/" className="text-gray-500 dark:text-slate-400">
          Terms & Condition
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
