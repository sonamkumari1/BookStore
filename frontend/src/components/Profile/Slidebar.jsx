import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";

function Slidebar({ data }) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="bg-zinc-800 p-2 rounded flex flex-col items-center justify-between h-auto lg:h-[90%]">
      <div className="flex items-center flex-col justify-center">
        {" "}
        <img
          src="https://static.vecteezy.com/system/resources/previews/008/302/513/original/eps10-blue-user-icon-or-logo-in-simple-flat-trendy-modern-style-isolated-on-white-background-free-vector.jpg"
          className="h-[12vh] rounded-full mt-5"
          alt="User Icon"
        />
        <p className="mt-4 text-2xl mb-3 text-zinc-100 font-semibold">
          {data.username}
        </p>
        <p className="mt-1 text-normal text-zinc-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>
      {role === "user" && (
        <div className="w-full flex-col items-start justify-center hidden lg:flex">
          <Link
            to="/profile"
            className=" text-blueviolet font-semibold text-2xl w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="text-blueviolet font-semibold w-full text-2xl py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Order History
          </Link>
          <Link
            to="/profile/setting"
            className="text-blueviolet font-semibold w-full py-2 mt-4 text-2xl text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Settings
          </Link>
        </div>
      )}
      {role === "admin" && (
        <div className="w-full flex-col items-start justify-center hidden lg:flex">
          <Link
            to="/profile"
            className="text-blueviolet text-2xl font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            All order
          </Link>
          <Link
            to="/profile/add-book"
            className="text-blueviolet text-2xl font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Add Book
          </Link>
        </div>
      )}
      <button
        className="bg-zinc-900 w-3/6 lg:w-full mt-4 text-2xl lg:mt-0 text-blueviolet font-semibold flex items-start justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300 "
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default Slidebar;
