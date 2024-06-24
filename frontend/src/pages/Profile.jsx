import React, { useEffect, useState } from "react";
import Slidebar from "../components/Profile/Slidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import MobileNav from "../components/Profile/MobileNav";

function Profile() {
  // const isLoggedIn = useSelector(); // Uncomment and use if you have this in your store

  const [profile, setProfile] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/get-user-information",
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
      {profile && (
        <>
          <div className="md:w-1/6 h-auto lg:h-screen">
            <Slidebar data={profile} />
            <MobileNav />
          </div>
          <div className="md:w-5/6 ml-5 mr-5 mt-5">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
