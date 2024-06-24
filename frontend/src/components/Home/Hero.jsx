import React, { useState } from "react";
import { Link } from "react-router-dom";

function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="md:h-[75vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full mb-12 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-blueviolet text-center lg:text-left">
          Discover Your Next Great Read
        </h1>
        <p className="mt-4 text-xl text-gray-500 text-center lg:text-left">
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection of books. A book is a medium for recording information in the form of writing or images.
        </p>
        <div className="mt-14">
          <Link
            to="all-books"
            className="text-yellow-100 text-2xl font-semibold border border-yellow-100 px-10 py-5 hover:bg-zinc-800 rounded-full"
            style={{
                cursor: 'pointer', // Optional: Adds pointer cursor
                transition: 'transform 0.8s ease-out', // Transition on transform property
                boxShadow: '2px 2px 10px blueviolet, -2px -2px 10px blueviolet', // Box shadow
                ':hover': { // Apply styles on hover
                  transform: 'scale(1.1)',
                  boxShadow: '2px 2px 10px blueviolet, -2px -2px 10px blueviolet',
                }
              }}
           >
            Discover Books
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center border-blueviolet ">
        <img
          src="https://book-store-app-gold.vercel.app/assets/home.avif"
          className="rounded-md border border-blueviolet "
          alt=""
          style={{
            cursor: 'pointer',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.8s ease-out',
            boxShadow: isHovered
              ? '4px 4px 14px blueviolet, -4px -4px 14px blueviolet'
              : 'none',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      </div>
    </div>
  );
}

export default Hero;
