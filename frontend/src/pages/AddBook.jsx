import React, { useState } from 'react';
import axios from 'axios';

function AddBook() {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: ""
  });

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post("http://localhost:1000/api/add-book", Data, { headers });
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: ""
        });
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className=" bg-zinc-900  flex flex-col justify-center sm:px-6 lg:px-8">
      <div className=" mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
            <h2 className="mt-4 text-center text-4xl font-extrabold text-blueviolet">
              Sign up
            </h2>
          </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">URL:</label>
        <input
          type="text"
          name="url"
          value={Data.url}
          onChange={change}
          className="appearance-none block w-full px-3 py-2 border bg-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-xl font-medium text-gray-700">Title:</label>
        <input
          type="text"
          name="title"
          value={Data.title}
          onChange={change}
          className="appearance-none block w-full px-3 py-2 border bg-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-xl font-medium text-gray-700">Author:</label>
        <input
          type="text"
          name="author"
          value={Data.author}
          onChange={change}
          className="appearance-none block w-full px-3 py-2 border bg-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label className="block text-xl font-medium text-gray-700">Price and Language:</label>
        <div className="flex space-x-4">
          <input
            type="text"
            name="price"
            value={Data.price}
            onChange={change}
            className="w-1/2 p-2 border border-gray-300 rounded bg-gray-300"
            placeholder="Price"
          />
          <input
            type="text"
            name="language"
            value={Data.language}
            onChange={change}
            className="w-1/2 p-2 border border-gray-300 rounded bg-gray-300"
            placeholder="Language"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-xl font-medium text-gray-700">Description:</label>
        <textarea
          name="desc"
          value={Data.desc}
          onChange={change}
          className="appearance-none block w-full px-3 py-2 border bg-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <button onClick={submit} className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
        Submit
      </button>
    </div>
    </div>
    </div>
  );
}

export default AddBook;
