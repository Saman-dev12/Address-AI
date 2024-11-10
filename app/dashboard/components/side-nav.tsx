"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  Home,
  CheckCircle,
  Eye,
  Settings,
  User,
  Menu,
  Barcode,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffectOnce } from "react-use";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SideNav = () => {
  const { data } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const logoutButtonRef = useRef<HTMLButtonElement>(null);

  useEffectOnce(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        logoutButtonRef.current &&
        !logoutButtonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const routes = [
    {
      label: "Overview",
      href: `/dashboard`,
      icon: Home,
    },
    {
      label: "Address Verification",
      href: `/dashboard/address-verifier`,
      icon: CheckCircle,
    },
    {
      label: "OCR Verification",
      href: `/dashboard/ocr-verifier`,
      icon: Eye,
    },
    {
      label: "Barcode Verifier",
      href: `/dashboard/barcode-verifier`,
      icon: Barcode,
    },
    {
      label: "Settings",
      href: `/dashboard/settings`,
      icon: Settings,
    },
  ];

  const Logo = () => (
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
  );

  const NavContent = () => (
    <>
      <div className="flex items-center mb-8">
        <Logo />
        <Link href="/" className="text-2xl font-bold text-purple-400">
          AddressAI
        </Link>
      </div>
      <div className="flex flex-col space-y-4 w-full mb-8">
        {routes.map((route) => (
          <Link
            key={route.label}
            href={route.href}
            className={cn(
              "font-medium text-white/90 w-full p-3 hover:bg-purple-500 hover:text-white duration-150 rounded-xl flex items-center group",
              pathname === route.href && "bg-purple-500 text-white"
            )}
            onClick={() => setIsOpen(false)}
          >
            <route.icon
              className={cn(
                `h-5 w-5 mr-2 text-purple-500 group-hover:text-slate-100`,
                pathname === route.href && "text-white"
              )}
            />
            {route.label}
          </Link>
        ))}
      </div>
      <div className="w-full mt-auto relative">
        <Button
          variant="outline"
          ref={logoutButtonRef}
          className={cn(
            "absolute bottom-16 opacity-0 bg-gradient-to-br from-purple-500 to-purple-600 inset-x-0 translate-y-8 transition bg-transparent border",
            dropdownOpen && "opacity-100 translate-y-0 transition-all"
          )}
        >
          <span
            onClick={() => {
              signOut();
              toast.success("Logged out successfully");
              router.refresh();
            }}
            className="w-full flex items-center justify-center"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </span>
        </Button>
        <Button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-gradient-to-br from-purple-600 to-purple-800 hover:bg-purple-600 hover:opacity-80 py-6 text-base w-full flex items-center justify-center"
        >
          <User className="h-5 w-5 mr-2" /> {data?.user?.name}
        </Button>
      </div>
    </>
  );

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-100 border-b border-gray-200 px-4 py-2 flex justify-between items-center z-50 shadow-sm">
        <div className="flex items-center">
          <Logo />
          <span className="text-xl font-bold text-purple-600">AddressAI</span>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-72 bg-black p-6 overflow-y-auto"
          >
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:hidden h-16"></div>
      <div className="hidden md:flex h-screen fixed inset-y-0 left-0 bg-[#1E1E2D] w-72 flex-col items-start text-white rounded-e-lg px-5 py-6 justify-between overflow-auto">
        <NavContent />
      </div>
    </>
  );
};

export default SideNav;
