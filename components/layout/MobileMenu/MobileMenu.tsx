"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";
import styles from "./MobileMenu.module.css";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;

      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.mobileMenu}>
      <button
        className={styles.menuButton}
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((previous) => !previous)}
      >
        <svg className={styles.icon} aria-hidden="true">
          <use
            href={
              isOpen
                ? "/icons/sprite.svg#icon-close"
                : "/icons/sprite.svg#icon-burger"
            }
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.backdrop} onClick={closeMenu}>
          <nav
            id="mobile-navigation"
            className={styles.menu}
            aria-label="Mobile navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <Link href="/" onClick={closeMenu}>
              Home
            </Link>

            <Link href="/articles" onClick={closeMenu}>
              Articles
            </Link>

            <Link href="/authors" onClick={closeMenu}>
              Creators
            </Link>

            <AuthNavigation variant="menu" onLinkClick={closeMenu} />
          </nav>
        </div>
      )}
    </div>
  );
}
