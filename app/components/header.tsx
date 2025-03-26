import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/blog", label: "Blog" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header>
      <div className="mx-auto px-4">
        <div className="mx-auto flex items-center justify-between h-[64px] py-4">
          <h1 className="font-bebas text-[24px] md:text-[28px] lg:text-[32px] font-normal leading-none tracking-[0.06em]">
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

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Bars3Icon className="h-6 w-6 text-gray-700" />
                </button>
              </DropdownMenuTrigger>
              {isMenuOpen && (
                <DropdownMenuContent className="w-48 bg-white z-50">
                  <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {navLinks.map((link) => (
                    <DropdownMenuItem key={link.to} asChild>
                      <Link to={link.to}>{link.label}</Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <div className="flex items-center space-x-4 px-2 py-2">
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <UserIcon className="h-6 w-6 text-gray-700" />
                    </button>
                    <button
                      className="p-2 rounded-full hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link to="/cart">
                        <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
                      </Link>
                    </button>
                  </div>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <UserIcon className="h-6 w-6 text-gray-700" />
            </button>
            <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
