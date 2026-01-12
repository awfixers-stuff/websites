import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Home, Menu, X } from "react-feather";
import { Link } from "./Link";
import { Logo } from "./Logo";
import { OpenSearchModalButton } from "@/components/Search";
import { MobileSidebar } from "./Sidebar";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { SITE, SOCIAL } from "@/constants";

export const Nav: React.FC = () => {
  return (
    <header className="hidden md:flex items-center justify-end px-8 py-6">
      <ul>
        <li>
          <Link
            href={SOCIAL.GITHUB_URL}
            className="flex items-center space-x-2 text-gray-600 text-sm hover:text-pink-500"
          >
            <Home className="w-4 h-4" />
            <span>Go to {SITE.COPYRIGHT}</span>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export const MobileNav: React.FC = () => {
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const hide = useCallback(() => {
    setIsNavOpen(false);
  }, [setIsNavOpen]);

  useEffect(() => {
    // subscribe
    router.events.on("routeChangeStart", hide);

    // unsubscribe
    return () => router.events.off("routeChangeStart", hide);
  }, [hide, router.events]);

  return (
    <>
      <header className="flex items-center justify-between space-x-6 md:hidden px-4 md:px-8 py-4 text-center">
        <Link href="/">
          <Logo className="w-10 h-10" />
          <span className="sr-only">{SITE.TITLE}</span>
        </Link>

        <div className="w-full block">
          <OpenSearchModalButton />
        </div>

        <div className="flex items-center space-x-4 md:space-x-4">
          <div className="flex items-center">
            <ThemeSwitcher />
          </div>

          <button
            className="w-6 h-6 md:w-4 md:h-4 cursor-pointer outline-offset-4"
            aria-label="Menu"
            aria-expanded={isNavOpen}
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? (
              <X width="100%" height="100%" />
            ) : (
              <Menu width="100%" height="100%" />
            )}
          </button>
        </div>
      </header>

      <MobileSidebar isOpen={isNavOpen} />
    </>
  );
};
