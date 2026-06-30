"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  X,
  Home,
  Info,
  Package,
  Phone,
  LogOut,
  LogIn,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;

    categories: {
    id: string;
    name: string;
    products: {
      id: string;
      name: string;
      slug: string;
    }[];
  }[];
}

export default function MobileNavigation({
  open,
  onClose,
  isAuthenticated,
  isAdmin,
  categories,
}: MobileNavigationProps) {
  const router = useRouter();
  const [productsOpen, setProductsOpen] =
    useState(false);

  const [openCategory, setOpenCategory] =
    useState<string | null>(null);

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });

    router.refresh();
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      />

      {/* Drawer */}

      <div
        className="
          fixed
          right-0
          top-1
          z-[60]
          flex
          h-90
          w-[250px]
          flex-col
          bg-white/60
          shadow-2xl
          rounded-2xl
        "
      >
       
        {/* Navigation */}

        <div className="flex-1 overflow-y-auto p-2">
          <div className="mb-0 flex justify-end">
            <button
              onClick={onClose}
              className="
                rounded-lg
                p-2
                text-slate-700
                transition
                hover:bg-slate-100
                hover:text-[#0F2747]
              "
            >
              <X size={18} />
            </button>
          </div>
          <nav className="space-y-2">
            <Link
              href="/"
              onClick={onClose}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                px-4
                py-1
                font-medium
                text-slate-700
                transition
                hover:bg-slate-100
                hover:text-[#0F2747]
              "
            >
              <Home size={18} />
              Home
            </Link>

            <Link
              href="/about"
              onClick={onClose}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                px-4
                py-1
                font-medium
                text-slate-700
                transition
                hover:bg-slate-100
                hover:text-[#0F2747]
              "
            >
              <Info size={18} />
              About
            </Link>

            <div >

              <button
                onClick={() =>
                  setProductsOpen(!productsOpen)
                }
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  px-4
                  py-3
                  font-medium
                  text-slate-700
                "
              >
                <div className="flex items-center gap-2">
                  <Package size={18} />
                  Products
                </div>

                {productsOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              {productsOpen && (
                <div>

                  {categories.map((category) => (
                    <div key={category.id}>

                      <button
                        onClick={() =>
                          setOpenCategory(
                            openCategory === category.id
                              ? null
                              : category.id
                          )
                        }
                        className="
                          flex
                          w-full
                          items-center
                          justify-between
                          px-5
                          py-1
                          text-left
                          text-sm
                          font-semibold
                          text-black
                        "
                      >
                        {category.name}

                        {openCategory === category.id ? (
                          <ChevronUp size={15}/>
                        ) : (
                          <ChevronDown size={15}/>
                        )}
                      </button>

                      {openCategory === category.id && (
                        <div className="">

                          {category.products.map(
                            (product) => (
                              <Link
                                key={product.id}
                                href={`/products/${product.slug}`}
                                onClick={onClose}
                                className="
                                  block
                                  px-8
                                  text-sm
                                  text-slate-700
                                  hover:text-[#0F2747]
                                "
                              >
                                <span
                                  className="
                                    block
                                    overflow-hidden
                                    text-ellipsis
                                    whitespace-nowrap
                                  "
                                >
                                  - {product.name}
                                </span>
                              </Link>
                            )
                          )}

                        </div>
                      )}

                    </div>
                  ))}

                </div>
              )}

            </div>

            <Link
              href="/contact"
              onClick={onClose}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                px-4
                py-1
                font-medium
                text-slate-700
                transition
                hover:bg-slate-100
                hover:text-[#0F2747]
              "
            >
              <Phone size={18} />
              Contact
            </Link>

            {isAuthenticated && (
              <>
                <div />

                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={onClose}
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      px-4
                      py-1
                      font-medium
                      text-slate-700
                      transition
                      hover:bg-slate-100
                      hover:text-[#0F2747]
                    "
                  >
                    Admin Panel
                  </Link>
                )}
              </>
            )}
          </nav>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="
                flex
                w-full
                gap-2
                rounded-xl
                px-4
                py-3
                font-medium
                text-red-700
                transition
              "                                                       
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="
                flex
                gap-2
                rounded-xl
                px-4
                py-3
                font-medium
                text-slate-700
                transition
               
              "
            >
              <LogIn size={18} />
              Login
            </Link>
          )}
        </div>

      </div>
    </>
  );
}