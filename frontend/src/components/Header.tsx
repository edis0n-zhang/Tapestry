"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LightSwitch } from "./LightSwitch";
import LightLogo from "../../public/light_logo.svg";
import DarkLogo from "../../public/dark_logo.svg";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";

import { IBM_Plex_Mono } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

const Header = () => {
  const pathname = usePathname();
  const [shadow, setShadow] = useState(false);
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      // Set shadow true if scrolled more than 50 pixels
      setShadow(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day = String(yesterday.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between px-8 pt-3 md:px-48 pb-3 border-b dark:border-zinc-700/20 dark:bg-zinc-900 bg-slate-50 ${
        shadow
          ? "shadow-md dark:shadow-zinc-700/20 transition-shadow"
          : "transition-shadow"
      }`}
    >
      <div className="flex items-center">
        <Link
          href={`/${formattedDate}`}
          className="text-sm font-bold md:text-xl"
          prefetch={true}
        >
          <Image
            src={
              theme === "dark" || (theme == "system" && systemTheme === "dark")
                ? DarkLogo
                : LightLogo
            }
            alt="Logo"
            className="w-8 h-8 md:w-12 md:h-10 mr-2"
          />
        </Link>
        <Link
          href={`/${formattedDate}`}
          className={`mr-3 text-lg font-bold md:mr-8 md:text-2xl ${mono.className}`}
          prefetch={true}
        >
          TAPESTRY
        </Link>
      </div>

      {/* Navigation (currently commented out) */}
      <div className="text-s mr-auto block items-center text-xs md:text-base">
        {/* Navigation links can be uncommented and used here */}
      </div>

      <LightSwitch />
    </header>
  );
};

export default Header;
