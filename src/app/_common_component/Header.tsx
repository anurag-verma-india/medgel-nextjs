"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

// Define types for menu items
interface SubMenuItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  href: string;
  subItems?: SubMenuItem[];
}

// Define the menu structure
const menuItems: MenuItem[] = [
  { label: "Home", href: "/home" },
  {
    label: "About Us",
    href: "#",
    subItems: [
      { label: "About Medgel", href: "/about/about-medgel" },
      { label: "Life At Medgel", href: "/about/life-at-medgel" },
      { label: "Life At Medgel Old", href: "/about/life-at-medgel-old" },
      { label: "Awards & Accreditation", href: "/about/awards_" },
      { label: "Awards & Accreditation All", href: "/about/awardsviewall" },
    ],
  },
  {
    label: "Products",
    href: "/#",
    subItems: [
      { label: "Products At Medgel", href: "/products/products-at-medgel" },
      { label: "About Medgel", href: "/products/medgel-services" },
      { label: "pl-clv2", href: "/products/pl-clv2/abcd" },
    ],
  },
  { label: "Quality & Compliance", href: "/quality" },
  { label: "Facilities", href: "/facilities" },
  { label: "Investor Relations", href: "/investors" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Check if the current route matches a menu item or its subitems
  const isCurrentPage = (item: MenuItem): boolean => {
    const basePath = pathname.split("?")[0];

    if (item.href === "/" && basePath === "/") return true;
    if (item.href !== "/" && basePath.startsWith(item.href)) return true;
    if (item.subItems?.some((subItem) => basePath.startsWith(subItem.href)))
      return true;

    return false;
  };

  // Check if the route exactly matches this specific page
  const isExactCurrentPage = (href: string): boolean => {
    const basePath = pathname.split("?")[0];
    return (
      basePath === href || (href !== "/" && basePath.startsWith(`${href}/`))
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/home">
            {/* <div className="text-2xl font-bold">
              <span className="text-orange-500">MED</span>
              <span className="text-blue-700">GEL</span>
            </div> */}
            <Image
              src={"/medgel-logo.svg"}
              alt={"MedGel"}
              width={167}
              height={34}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-6 lg:flex">
            {menuItems.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`relative block px-1 py-2 ${
                    isCurrentPage(item)
                      ? "font-medium text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                  {isCurrentPage(item) && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600"></span>
                  )}
                </Link>

                {/* Desktop dropdown using CSS-only approach */}
                {item.subItems && (
                  <div className="invisible absolute left-0 z-20 mt-1 w-64 rounded-md bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className={`block px-4 py-2 ${
                          isExactCurrentPage(subItem.href)
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-500 hover:text-blue-600 focus:outline-none lg:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="bg-white shadow-inner lg:hidden">
          <div className="container mx-auto px-4 py-3">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <div key={item.label} className="py-1">
                  <Link
                    href={item.href}
                    className={`block px-2 py-2 ${
                      isExactCurrentPage(item.href)
                        ? "font-medium text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </Link>

                  {/* Mobile dropdown - always visible */}
                  {item.subItems && (
                    <div className="ml-4 mt-1 border-l-2 border-blue-100 pl-4">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className={`block py-2 ${
                            isExactCurrentPage(subItem.href)
                              ? "font-medium text-blue-600"
                              : "text-gray-600 hover:text-blue-600"
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
