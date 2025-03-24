import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline"; // Import icons
import { Link } from "@remix-run/react";

export function Header() {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/blog", label: "Blog" },
  ];

  return (
    <header>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto px-4 flex items-center justify-between h-[64px]">
          <h1 className="font-bebas text-[32px] sm:text-[40px] font-normal leading-[1] tracking-[0.06em]">
            THE ONLINE STORE
          </h1>
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-inter font-normal text-[15px] leading-[20px] tracking-[0%] hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <UserIcon className="h-6 w-6 text-gray-700" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
