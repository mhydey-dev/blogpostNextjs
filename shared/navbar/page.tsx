"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { PiSignInThin } from "react-icons/pi";
const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      setIsAuthenticated(!!storedUser);
    }
  }, []);

  return (
    <div className="flex items-center justify-between bg-white py-5 px-35">
      <div className="flex items-center gap-6">
        <div className="px-1.5 py-1.5 items-center rounded-[8px] bg-gradient-to-r from-blue-500 to-purple-600">
          <MdOutlineLibraryBooks size={"30px"} color="#fff" />
        </div>
        <div>
          <h1 className="text-[25px] font-semibold">The Modern Blog</h1>
          <p className="text-[15px] font-extralight">Your daily inspiration</p>
        </div>
      </div>
      <div className="flex gap-8 items-center">
        <p>Home</p>
        <p>Categories</p>
        <p>About</p>
        {isAuthenticated ? (
          <Link href="/dashboard">
            <button className="px-[20px] py-[8px] border rounded-[10px] text-[#fff] bg-gradient-to-r from-blue-500 to-purple-600 flex items-center gap-2">
              <MdOutlineDashboard size={"20px"} color="#fff" />
              Dashboard
            </button>
          </Link>
        ) : (
          <Link href="/login">
            <button className="px-[20px] py-[8px] border rounded-[10px] text-[#fff] bg-gradient-to-r from-blue-500 to-purple-600 flex gap-[10px] items-center ">
              <PiSignInThin />
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;
