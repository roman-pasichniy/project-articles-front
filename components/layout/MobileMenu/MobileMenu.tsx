"use client";

import Link from "next/link";
import { useState } from "react";
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";
import styles from "./MobileMenu.module.css";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

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

            <AuthNavigation onLinkClick={closeMenu} />
          </nav>
        </div>
      )}
    </div>
  );
}
