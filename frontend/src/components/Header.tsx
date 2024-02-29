import Link from "next/link";
import { LightSwitch } from "./LightSwitch";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <Link href="/" className="mr-4 text-xl font-bold">
          Your Brand
        </Link>
      </div>

      {/* Navigation */}
      <nav className="ml-auto hidden md:block">
        <Link href="/" className="mr-4 hover:text-gray-300">
          Home
        </Link>
        <Link href="/about" className="mr-4 hover:text-gray-300">
          About
        </Link>
        <Link href="/contact" className="mr-4 hover:text-gray-300">
          Contact
        </Link>
        <LightSwitch />
      </nav>

      {/* Mobile menu toggle (replace with your own styling) */}
      <button className="md:hidden">Menu</button>
    </header>
  );
};

export default Header;
