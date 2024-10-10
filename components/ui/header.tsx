import Link from "next/link";
import { Button } from "./button";
import { useMedia } from "react-use";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const isMobile = useMedia("(max-width: 1024px)", false);
  const [isOpen, setIsOpen] = useState(false);

  const mobileNav = (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Button
          size={"sm"}
          variant={"outline"}
          className="w-full lg:w-auto justify-between bg-white/10 text-white font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none focus:bg-white/30 transition"
        >
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="px-2 bg-black text-white">
        <nav className="pt-7 flex flex-col">
          {["Home", "Features", "Pricing", "Documentation"].map(
            (route, index) => (
              <Button
                key={index}
                className="justify-start py-8 text-base bg-black border-b border-gray-700/40"
              >
                {route}
              </Button>
            )
          )}
        </nav>
        <Button
          variant="outline"
          className="bg-gradient-to-br mt-8 w-full from-purple-500 to-purple-700 text-gray-200 hover:opacity-80 hover:text-gray-200 transition-colors duration-300 border-none rounded-xl py-5"
        >
          <Link href="/sign-in">Login</Link>
        </Button>
      </SheetContent>
    </Sheet>
  );

  const desktopNav = (
    <nav>
      <ul className="flex space-x-6">
        {["Home", "Features", "Pricing", "Documentation"].map((item) => (
          <li key={item}>
            <Link
              href={`/${item.toLowerCase()}`}
              className="opacity-60 hover:bg-white/5 hover:opacity-100 transition-colors duration-300"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-950/20">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <svg
            className="h-8 w-8 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="#A855F7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="#A855F7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="#A855F7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Link href="/" className="text-2xl font-bold text-purple-400">
            AddressAI
          </Link>
        </div>
        {isMobile ? mobileNav : desktopNav}
        {isMobile ? null : (
          <Button
            variant="outline"
            className="bg-gradient-to-br from-purple-500 to-purple-700 text-gray-200 hover:opacity-80 hover:text-gray-200 transition-colors duration-300 border-none"
          >
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
