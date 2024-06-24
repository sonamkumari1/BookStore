import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

function SignUp() {
  
  const [Values, setValue] = useState({
    username: "",
    email: "",
    password: "",
    address: ""
  });

  const navigate=useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (
        Values.username === "" ||
        Values.email === "" ||
        Values.password === "" ||
        Values.address === ""
      ) {
        alert("All fields are required");
      } else {
       const response = await axios.post("http://localhost:1000/api/sign-up",Values);
      alert(response.data.message)
       navigate("/login")
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900  flex flex-col justify-center py-5 sm:px-6 lg:px-8">
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
            <h2 className="mt-4 text-center text-4xl font-extrabold text-blueviolet">
              Sign up
            </h2>
          </div>

          <form className="space-y-6" onSubmit={submit}>
            <div>
              <label
                htmlFor="username"
                className="block text-xl font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={Values.username}
                  onChange={change}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xl font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={Values.email}
                  onChange={change}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xl font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={Values.password}
                  onChange={change}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-xl font-medium text-gray-700"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                required
                value={Values.address}
                onChange={change}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-1"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex  justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-2xl font-medium text-white bg-blueviolet hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>

            <p className="mt-2 text-center text-md text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-2xl text-blueviolet hover:text-blueviolet"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
