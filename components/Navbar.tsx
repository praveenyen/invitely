"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "Templates", href: "#templates" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Examples", href: "#examples" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-offwhite/92 backdrop-blur-md border-b-[0.5px] border-subtle"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-ink"
          >
            <path
              d="M12 2L20 12L12 22L4 12L12 2Z"
              fill="currentColor"
              fillOpacity="0.9"
            />
            <path
              d="M12 6L16 12L12 18L8 12L12 6Z"
              fill="white"
              fillOpacity="0.3"
            />
          </svg>
          <span className="font-serif text-xl text-ink">Invitely</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] text-slate hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost">Login</Button>
          <Button variant="primary" className="!py-2 !px-4 !text-[13px]">
            Get Started Free
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {open ? (
              <path d="M6 6L18 18M6 18L18 6" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7H20" strokeLinecap="round" />
                <path d="M4 12H20" strokeLinecap="round" />
                <path d="M4 17H20" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-offwhite/95 backdrop-blur-md border-b-[0.5px] border-subtle px-6 pb-6 pt-2">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[15px] text-slate hover:text-ink transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-3 border-t-[0.5px] border-subtle">
              <Button variant="ghost" className="justify-start">
                Login
              </Button>
              <Button variant="primary">Get Started Free</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
