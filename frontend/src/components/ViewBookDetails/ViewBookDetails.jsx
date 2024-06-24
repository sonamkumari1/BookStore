import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ViewBookDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookId: id,
  };

  const handleFavourite = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/add-book-to-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  const deleteBook = async () => {
    const response = await axios.delete(
      "http://localhost:1000/api/delete-book",
      { headers }
    );
    alert(response.data.message);
    navigate("/all-books");
  };

  return (
    <>
      {data && (
        <div className="px-5 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-12 pt-5">
          <div className="p-4 w-full lg:w-2/6">
            <div className="borders-read col-10 col-sm-10 col-md-10 col-lg-6 col-xl-5 mx-auto my-2 read-head">
              <img
                src={data.url}
                alt={data.title}
                className="h-[200px] w-[200px] md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[300px] rounded mx-auto mt-5"
              />

              {isLoggedIn && (
                <div className=" bottom-0 left-0 right-0 flex justify-around  bg-opacity-75 px-4 pt-5">
                  {role === "user" && (
                    <>
                      <button
                        className="bg-white rounded-lg text-3xl p-2 text-red-500 flex items-center justify-center mx-auto mb-4 md:mb-0 md:ml-6 md:mr-6 lg:text-4xl lg:p-3 lg:ml-12"
                        onClick={handleFavourite}
                      >
                        <FaHeart />
                      </button>
                      <button
                        className="text-white rounded-lg text-3xl p-2 bg-blue-500 flex items-center justify-center mx-auto mb-4 md:mb-0 md:ml-6 md:mr-6 lg:text-4xl lg:p-3 lg:mr-12"
                        onClick={handleCart}
                      >
                        <FaShoppingCart />
                      </button>
                    </>
                  )}
                  {role === "admin" && (
                    <>
                      <Link
                        to={`/update-book/${id}`}
                        className="bg-white rounded-lg text-4xl lg:text-3xl p-3 text-red-500 flex items-center justify-center"
                      >
                        <FaEdit />
                        <span className="ml-4 hidden lg:block">Edit</span>
                      </Link>
                      <button
                        className="text-white rounded-lg ml-4 text-4xl lg:text-3xl p-3 bg-blue-500 flex items-center justify-center"
                        onClick={deleteBook}
                      >
                        <MdDeleteOutline />
                        <span className="ml-4 hidden lg:block">Delete</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <div className="borders-read col-10 col-sm-10 col-md-10 col-lg-6 col-xl-5 mx-auto my-2 read-body">
              <hr className="mt-5" />
              <div className="p-5">
                <h2 className="text-yellow-100 text-4xl font-semibold">
                  <span className="mt-5 text-4xl font-semibold text-blueviolet">
                    Title:
                  </span>{" "}
                  {data.title}
                </h2>
              </div>

              <hr />
              <h2 className="text-green-500 text-2xl font-semibold mt-10 ">
                <span className="mt-5 text-2xl font-semibold text-blueviolet">
                  Author:
                </span>{" "}
                {data.author}
              </h2>
              <h2 className="mt-10 text-xl text-gray-500 text-center lg:text-left ">
                <span className="mt-5 text-2xl font-semibold text-blueviolet">
                  Description:
                </span>{" "}
                {data.desc}
              </h2>
              <h2 className="text-yellow-100 text-2xl font-semibold mt-10">
                <span className="mt-5 text-2xl font-semibold text-blueviolet">
                  Language:
                </span>{" "}
                {data.language}
              </h2>
              <h2 className="text-yellow-100 text-2xl font-semibold mt-10">
                <span className="mt-5 text-2xl font-semibold text-blueviolet">
                  Price:
                </span>{" "}
                {data.price}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewBookDetails;
