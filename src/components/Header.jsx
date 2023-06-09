import { Link } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";
import { useState, useEffect } from "react";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";

const Header = () => {
  const [click, setClick] = useState(false);

  const [theme, setTheme] = useState(localStorage.theme || "light");
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
    if (window.innerWidth < 768) {
      menuOpen();
    }
  };

  const menuOpen = () => {
    setClick(!click);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest("#menu-btn") && !e.target.closest("#nav-menu")) {
      menuOpen();
    }
  };

  useEffect(() => {
    if (!click) {
      return;
    }

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [click]);

  return (
    <header className="fixed bg-white left-0 top-0 w-full px-5 z-50 shadow-md shadow-black/30 dark:bg-black dark:text-white dark:shadow-white">
      <div className="flex items-center justify-between h-20">
        {/* Logo */}
        <Link className="flex flex-col " to="/">
          <span className="font-bold text-2xl font-alkatra">
            Country finder
          </span>
          <span className="font-mono text-[15px]">By Gündüz Mammadli</span>
        </Link>

        {/* navigation */}
        <nav
          id="nav-menu"
          className={`font-alkatra text-lg max-md:text-3xl flex gap-x-5 duration-500 mobile z-30 items-center bg-dark ${
            click ? "max-md:right-0" : "max-md:-right-full"
          }`}
        >
          
          {/* dark mode btn*/}
          <button
            onClick={toggleTheme}
            className={`outline-none md:border-2 md:border-black flex gap-2 items-center py-1.5 px-4 md:hover:bg-black md:hover:text-white duration-500 dark:md:hover:bg-white dark:md:hover:text-black dark:border-white`}
          >
            {theme === "light" ? <BsFillMoonFill /> : <BsSunFill />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </nav>

        {/* mobile-menu */}
        <div
          onClick={menuOpen}
          id="menu-btn"
          className={`cursor-pointer hidden max-md:block z-50 dark:text-white ${
            click ? "-rotate-90 dark:text-black" : "text-black"
          } duration-500`}
        >
          <CgMenuRightAlt size={25} />
        </div>
      </div>
    </header>
  );
};

export default Header;
