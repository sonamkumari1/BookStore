import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../store/auth"
function Login() {
  const [Values, setValue] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
   const dispatch=useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (Values.username === "" || Values.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post("http://localhost:1000/api/sign-in", Values);
        
        console.log("API Response:", response.data); // Debugging line

        // Ensure the response contains the necessary fields
        if (response.data.id && response.data.token && response.data.role) {
          
          dispatch(authActions.login());
          dispatch(authActions.changeRole(response.data.role));
          // Save in localStorage
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);

          // Navigate to another page upon successful login
          navigate("/profile");
        } else {
          console.error("Invalid response data:", response.data);
          alert("Invalid response from server. Please try again.");
        }
      }
    } catch (error) {
      console.error("API Error:", error);
      alert(error.response?.data?.message || "An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex flex-col justify-center py-4 sm:px-6 lg:px-8">
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
            <h2 className="mt-4 text-center text-4xl font-extrabold text-blueviolet">
              Login
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
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-2xl font-medium text-white bg-blueviolet hover:bg-blueviolet focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>

            <p className="mt-2 text-center text-md text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-xl text-blueviolet hover:text-indigo-500"
              >
                Signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
