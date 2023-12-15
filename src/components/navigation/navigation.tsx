"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Exo_2 } from "next/font/google";
import { motion, useAnimation } from "framer-motion";
import styles from "./navigation.module.sass";
import MenuIcon from "@/icons/menu";
import CloseMenuIcon from "@/icons/close-menu";

const exo2 = Exo_2({ subsets: ["latin"] });

const links = [
  { id: 1, href: "/#home", label: "Home" },
  { id: 2, href: "/#about", label: "About" },
  { id: 3, href: "/#projects", label: "Projects" },
  { id: 4, href: "/#contact", label: "Contact" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const mainControls = useAnimation();

  useEffect(() => {
    if (menuOpen) {
      mainControls.start("visible");
    } else {
      mainControls.set("hidden");
    }
  }, [menuOpen, mainControls]);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav
      className={
        exo2.className +
        " h-full flex items-center justify-between border-b px-10 sticky top-0 bg-black/50 backdrop-blur-sm z-10 bg-gradient-to-r from-slate-950 to-neutral-800"
      }
    >
      <Link href="/" className="text-xl flex gap-3">
        <span>SEAN</span>
        <span>STOCKER</span>
      </Link>
      <ul className="hidden sm:flex gap-10">
        {links.map((link) => (
          <li key={link.id}>
            <Link href={link.href} className={styles.underline}>
              {link.label.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>

      {/* Side Menu Toggle */}
      <button className="text-2xl p-2 sm:hidden" onClick={toggleMenu}>
        <MenuIcon className="w-6 fill-white" />
      </button>

      {/* Side Menu */}
      <div
        className={`flex sm:hidden fixed left-0 top-0 w-full h-screen items-center justify-center bg-slate-900 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="absolute top-5 right-5 text-5xl">
          <button onClick={toggleMenu}>
            <CloseMenuIcon className="w-10 fill-white" />
          </button>
        </div>
        <ul className="flex flex-col gap-10">
          {links.map((link, index) => (
            <li key={link.id}>
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.25 + index * 0.25,
                    },
                  },
                }}
                initial="hidden"
                animate={mainControls}
              >
                <a
                  href={link.href}
                  className={"text-4xl w-full"}
                  onClick={toggleMenu}
                >
                  {link.label.toUpperCase()}
                </a>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
