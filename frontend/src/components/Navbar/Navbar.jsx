import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { IoHomeSharp } from "react-icons/io5";
import { FaCartArrowDown } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { title: "Home", link: "/", icons: <IoHomeSharp className="text-2xl" /> },
    { title: "Books", link: "/all-books", icons: <FaBookReader className="text-2xl" /> },
    { title: "Cart", link: "/cart", icons: <FaCartArrowDown className="text-2xl" /> },
    { title: "User", link: "/profile" },
    { title: "Admin", link: "/profile" },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1);
  }
  if (isLoggedIn === true && role === "admin") {
    links.splice(3, 1);
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="relative flex bg-zinc-800 text-blueviolet px-8 py-4 items-center justify-between">
        <div className="flex items-center">
          <img
            className="d-inline-block align-text-top rounded-full w-14 h-14 mr-4 "
            src="https://book-store-app-gold.vercel.app/assets/logo.jpeg"
            alt="BookStore Logo"
          />
          <h1 className="text-2xl font-mono font-semibold">BookStore</h1>
        </div>
        <div className="nav-link-bookheaven flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((item, i) => (
              <div className="flex items-center" key={i}>
                <Link
                  to={item.link}
                  className={`flex items-center text-xl mr-5 font-mono relative group transition duration-300 ${isMenuOpen ? 'text-white' : 'text-blueviolet'}`}
                  onMouseEnter={(e) => e.currentTarget.querySelector('.nav-item').classList.add('scale-x-100')}
                  onMouseLeave={(e) => e.currentTarget.querySelector('.nav-item').classList.remove('scale-x-100')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icons}
                  <span className="ml-2 font-mono">{item.title}</span>
                  <span className="nav-item absolute w-full -bottom-3 left-0 bg-white h-1 transform scale-x-0 group-hover:scale-x-100 transition duration-300"></span>
                </Link>
              </div>
            ))}
          </div>
          {isLoggedIn === false && (
            <>
              <Link
                to="/LogIn"
                className="px-4 py-2 border rounded-full border-blueviolet  my-2 hover:bg-white hover:text-zinc-800 transition-all duration-300"
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link
                to="/Signup"
                className="px-4 py-2 border border-blueviolet rounded-full my-2 hover:bg-white hover:text-zinc-800 transition-all duration-300"
                onClick={toggleMenu}
              >
                SignUp
              </Link>
            </>
          )}
          <button
            className="text-white text-2xl md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center md:hidden">
          {links.map((item, i) => (
            <Link
              to={item.link}
              className="text-white text-xl my-2 hover:text-blue-500 transition-all duration-300"
              key={i}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          {isLoggedIn === false && (
            <>
              <Link
                to="/LogIn"
                className="px-4 py-2 border rounded-full border-blueviolet  my-2 hover:bg-white hover:text-zinc-800 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/Signup"
                className="px-4 py-2 border-blueviolet rounded-full my-2 hover:bg-white hover:text-zinc-800 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
