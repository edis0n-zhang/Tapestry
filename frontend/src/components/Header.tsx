"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LightSwitch } from "./LightSwitch";
import LightLogo from "../../public/light_logo.svg";
import DarkLogo from "../../public/dark_logo.svg";
import Empty from "../../public/empty.svg";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import { HamburgerMenu } from "./Hamburger";

import { Button } from "@/components/ui/button";

import { CornerUpLeft } from "lucide-react";

import { Open_Sans } from "next/font/google";

const sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

import { IBM_Plex_Mono } from "next/font/google";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
});

const Header = () => {
  const pathname = usePathname();
  const [shadow, setShadow] = useState(false);
  const { resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState(Empty);

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

  useEffect(() => {
    if (resolvedTheme === "dark") {
      setLogoSrc(DarkLogo);
    } else {
      setLogoSrc(LightLogo);
    }
  }, [resolvedTheme]);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 2);

  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, "0");
  const day = String(yesterday.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const isSecondPath = pathname.split("/").length > 2;

  const firstPath = `/${pathname.split("/")[1]}`;

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between px-8 pt-3 md:px-24 lg:px-48 pb-3 border-b dark:border-zinc-700/20 dark:bg-zinc-900 bg-slate-50 ${
        shadow ? "shadow-md dark:shadow-zinc-700/20" : ""
      } duration-300 ease-in-out`}
    >
      <div className="flex items-center">
        <Link
          href={`/${formattedDate}`}
          className="text-sm font-bold md:text-xl"
          prefetch={true}
        >
          <Image src={logoSrc} alt="Logo" className="w-24 h-8 md:w-32" />
        </Link>
        <Link
          href={`/${formattedDate}`}
          className={`mr-2 md:mr-6 text-lg font-bold lg:mr-8 md:text-3xl ${mono.className}`}
          prefetch={true}
        ></Link>
      </div>

      {/* Navigation Links */}
      <div
        className={`text-s mr-auto hidden md:block items-center text-xs md:text-base font-semibold ${sans.className}`}
      >
        <Link
          href="/mission"
          className={
            pathname === "/mission"
              ? "mr-2 lg:mr-4 underline decoration-blue-400 decoration-2 underline-offset-4 hover:opacity-80 dark:decoration-blue-600"
              : "mr-2 lg:mr-4 hover:opacity-80"
          }
          prefetch={true}
        >
          Mission
        </Link>
        <Link
          href="/about"
          className={
            pathname === "/about"
              ? "mr-2 lg:mr-4 underline decoration-blue-400 decoration-2 underline-offset-4 hover:opacity-80 dark:decoration-blue-600"
              : "mr-2 lg:mr-4 hover:opacity-80"
          }
          prefetch={true}
        >
          About
        </Link>
        <Link
          href="/team"
          className={
            pathname === "/team"
              ? "mr-2 lg:mr-4 underline decoration-blue-400 decoration-2 underline-offset-4 hover:opacity-80 dark:decoration-blue-600"
              : "mr-2 lg:mr-4 hover:opacity-80"
          }
          prefetch={true}
        >
          Team
        </Link>
        {/* <Link
          href="/donate"
          className={
            pathname === "/donate"
              ? "mr-2 lg:mr-4 underline decoration-blue-400 decoration-2 underline-offset-4 hover:opacity-80 dark:decoration-blue-600"
              : "mr-2 lg:mr-4 hover:opacity-80"
          }
          prefetch={true}
        >
          Donate
        </Link> */}
      </div>

      {isSecondPath && (
        <Button
          variant="outline"
          size="icon"
          className="ease-in-out duration-300 bg-zinc-50 dark:bg-zinc-900 border dark:border-zinc-700 ml-auto mr-2"
        >
          <Link href={`${firstPath}`} prefetch={true}>
            <CornerUpLeft />
          </Link>
        </Button>
      )}

      <div className="md:hidden">
        <HamburgerMenu />
      </div>

      <div className="hidden md:block">
        <LightSwitch />
      </div>
    </header>
  );
};

export default Header;
