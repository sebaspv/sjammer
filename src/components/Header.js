import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import styles from "@/styles/Header.module.css";

const Header = () => {
  const navRef = useRef(null);

  const [isAtTop, setIsAtTop] = useState(true),
    [width, setWidth] = useState(768),
    [isMobile, setIsMobile] = useState(true);

  const handleWindowSizeChange = () => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        setIsAtTop(window.scrollY < 10);
      });
      window.addEventListener("resize", handleWindowSizeChange);
    }
    return () => {
      window.removeEventListener("scroll", () => {
        setIsAtTop(window.scrollY < 10);
      });
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    if (width <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  const collapse = () => {
    const nav = navRef.current;
    if (nav.classList.contains("hidden")) {
      nav.classList.remove("hidden");
      setTimeout(() => nav.classList.add(styles.popIn), 10);
    } else {
      nav.classList.add("hidden");
    }
  };

  return (
    <header
      className={`bg-main text-white p-1 fixed top-0 left-0 right-0 z-50 ${
        isMobile
          ? styles.headerAtTop
          : isAtTop
          ? styles.headerAtTop
          : styles.headerNotAtTop
      } "popIn"`}
    >
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div className="inline-block flex-shrink-0 text-2xl">
          <Link href="/" className="no-underline">
            <div className="flex flex-row items-center secondary-text font-bold">
              <Image
                src="/img/space-jammer-logo.svg"
                alt="logo"
                width={70}
                height={70}
              />
              {isMobile ? "" : "spacejammer"}
            </div>
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={collapse}
            className="px-2"
            aria-label="Toggle navigation"
          >
            <FaBars />
          </button>
        </div>
        <nav
          ref={navRef}
          className="w-full block flex-grow-0 lg:flex lg:items-center lg:w-auto justify-end hidden popIn"
        >
          <ul className="mt-3 text-sm sm:mt-0">
            <li>
              <Link href="/">
                <span className="block lg:inline lg:mt-0 m-3 py-2 hover:underline rounded-md">
                  Home
                </span>
              </Link>
              <Link href="/room-organizer">
                <span className="block lg:inline lg:mt-0 m-3 py-2 hover:underline rounded-md">
                  Get Started
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
