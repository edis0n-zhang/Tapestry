import { Moon, Sun, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

import { useTheme } from "next-themes";

import { Open_Sans } from "next/font/google";

const sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export function HamburgerMenu() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`ease-in-out duration-300 px-1 bg-opacity-0 hover:bg-gray-100 dark:bg-opacity-0 dark:hover:bg-zinc-800 ${sans.className} dark:border-zinc-700`}
        >
          <Menu className="h-[1.2rem] w-[2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-zinc-50 dark:bg-zinc-900 ease-in-out duration-300 mr-2">
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator className="ease-in-out duration-300" />
        <DropdownMenuGroup>
          <Link href="/mission">
            <DropdownMenuItem>
              <span className="ease-in-out duration-300">Mission</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/about">
            <DropdownMenuItem>
              <span className="ease-in-out duration-300">About</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/team">
            <DropdownMenuItem>
              <span className="ease-in-out duration-300">Team</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="ease-in-out duration-300" />
        <DropdownMenuItem>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 mr-2" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 mr-2" />
          <span className="ease-in-out duration-300">Dark Mode</span>
          <Switch
            className="ml-auto"
            checked={resolvedTheme == "dark"}
            onCheckedChange={toggleTheme}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
