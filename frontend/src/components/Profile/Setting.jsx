import React, { useEffect, useState } from "react";
import axios from "axios";

function Setting() {
  const [Value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState({});

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/get-user-information",
        { headers }
      );
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const submitAddress = async () => {
    const response = await axios.put("http://localhost:1000/api/update-address", Value, { headers });
    alert(response.data.message);
  };

  return (
    <>
      {profileData && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100  ">
          <h1 className="text-3xl md:text-3xl font-semibold text-blueviolet mb-8 text-center">
             update Username
          </h1>
        
            <div>
              <label className="text-2xl font-semibold p-2">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold ">
                {profileData.username}
              </p>
            </div>
            <div className="mt-4">
              <label className="text-2xl font-semibold p-2">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.email}
              </p>
            </div>
       
          <div className="mt-4 flex flex-col">
            <label className="text-2xl font-semibold p-2">Address</label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows="5"
              placeholder="Address"
              name="address"
              value={Value.address}
              onChange={change}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400"
              onClick={submitAddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Setting;
