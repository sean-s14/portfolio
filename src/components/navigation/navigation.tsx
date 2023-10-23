import Link from "next/link";
import { Exo_2 } from "next/font/google";
import styles from "./navigation.module.sass";

const exo2 = Exo_2({ subsets: ["latin"] });

const links = [
  { id: 1, href: "#home", label: "Home" },
  { id: 2, href: "#about", label: "About" },
  { id: 3, href: "#projects", label: "Projects" },
  { id: 4, href: "#contact", label: "Contact" },
];

// TODO: Add responsivity
export default function Navigation() {
  return (
    <nav
      className={
        exo2.className +
        " h-12 flex items-center justify-between border-b px-10"
      }
    >
      <Link href="/" className="text-xl flex gap-3">
        <span>SEAN</span>
        <span>STOCKER</span>
      </Link>
      <ul className="flex gap-10">
        {links.map((link) => (
          <li key={link.id}>
            <Link href={link.href} className={styles.underline}>
              {link.label.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
