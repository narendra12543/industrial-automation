"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface ProfileMenuProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export default function ProfileMenu({
  isAuthenticated,
  isAdmin,
}: ProfileMenuProps) {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = async () => {
    await signOut({
    redirect: false,
    });

    setOpen(false);

    router.push("/");
    router.refresh();
    };


  return (
    <div
      ref={menuRef}
      className="relative"
    >
      {/* Profile Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-[#0F2747]
          text-white
          transition
          hover:scale-105
        "
      >
        👤
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className="
            absolute
            right-0
            top-12
            w-56
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-xl
            z-50
          "
        >
          {/* Guest Menu */}
          {!isAuthenticated && (
            <>
              <Link
                href="/login"
                className="
                  block
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  transition
                  hover:bg-slate-50
                "
                onClick={() => setOpen(false)}
              >
                Login
              </Link>

              <Link
                href="/register"
                className="
                  block
                  border-t
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  transition
                  hover:bg-slate-50
                "
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            </>
          )}

          {/* User Menu */}
          {isAuthenticated && !isAdmin && (
            <>
              <Link
                href="/dashboard/enquiries"
                className="
                  block
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  transition
                  hover:bg-slate-50
                "
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="
                  block
                  w-full
                  border-t
                  px-4
                  py-3
                  text-left
                  text-sm
                  text-red-600
                  transition
                  hover:bg-red-50
                "
              >
                Logout
              </button>
            </>
          )}

          {/* Admin Menu */}
          {isAuthenticated && isAdmin && (
            <>
              <Link
                href="/dashboard/enquiries"
                className="
                  block
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  transition
                  hover:bg-slate-50
                "
                onClick={() => setOpen(false)}
              >
                User Dashboard
              </Link>

              <Link
                href="/admin"
                className="
                  block
                  border-t
                  px-4
                  py-3
                  text-sm
                  text-slate-700
                  transition
                  hover:bg-slate-50
                "
                onClick={() => setOpen(false)}
              >
                Admin Panel
              </Link>

              <button
                onClick={handleLogout}
                className="
                  block
                  w-full
                  border-t
                  px-4
                  py-3
                  text-left
                  text-sm
                  text-red-600
                  transition
                  hover:bg-red-50
                "
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}