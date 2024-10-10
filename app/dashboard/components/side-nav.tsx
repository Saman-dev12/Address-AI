// "use client";
import Link from "next/link";
import { Home, CheckCircle, Eye, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import getCurrentUser from "@/actions/getCurrentUser";

const SideNav = async () => {
  // const { data } = useSession();
  const user = await getCurrentUser();
  const iconClassName =
    "h-5 w-5 mr-2 text-purple-500 group-hover:text-slate-100";
  const routes = [
    {
      label: "Overview",
      href: `/dashboard`,
      icon: <Home className={iconClassName} />,
    },
    {
      label: "Address Verification",
      href: `/dashboard/address-verifier`,
      icon: <CheckCircle className={iconClassName} />,
    },
    {
      label: "OCR Verification Page",
      href: `/dashboard/ocr-verifier`,
      icon: <Eye className={iconClassName} />,
    },
    {
      label: "Settings",
      href: `/dashboard/settings`,
      icon: <Settings className={iconClassName} />,
    },
  ];

  return (
    <div className="h-screen fixed inset-y-0 left-0 bg-black w-72 flex flex-col items-start text-white rounded-e-lg px-5 py-6 justify-between">
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
      <div className="flex flex-col -mt-28 space-y-4 w-full">
        {routes.map((route) => (
          <Link
            key={route.label}
            href={route.href}
            className="font-medium text-white/90 w-full p-3 hover:bg-purple-500 hover:text-white duration-150 rounded-xl flex items-center group"
          >
            {route.icon}
            {route.label}
          </Link>
        ))}
      </div>
      <div className="w-full">
        <Button className="bg-purple-600 hover:bg-purple-600 hover:opacity-80 py-6 text-base w-full flex items-center justify-center">
          <User className="h-5 w-5 mr-2" /> {user?.name}
        </Button>
      </div>
    </div>
  );
};

export default SideNav;
