import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function UpdateBook() {
    const navigate = useNavigate();
    const { id } = useParams();

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
        authorization: `Bearer ${localStorage.getItem('token')}`,
        bookId: id,
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
            const response = await axios.put("http://localhost:1000/api/update-book", Data, { headers });
            setData({
              url: "",
              title: "",
              author: "",
              price: "",
              desc: "",
              language: ""
            });
            alert(response.data.message);
            navigate(`/view-book-details/${id}`);
          }
        } catch (error) {
          alert(error.response.data.message);
        
        }
      };
    
      useEffect(()=>{
        const fetch = async () =>{
            const response = await axios.get(`http://localhost:1000/api/get-book-by-id/${id}`)
            setData(response.data.data);
        };
        fetch();
      },[]);

      return (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Update Book</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">URL:</label>
            <input
              type="text"
              name="url"
              value={Data.url}
              onChange={change}
              className="w-full p-2 border border-gray-300 rounded bg-gray-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title:</label>
            <input
              type="text"
              name="title"
              value={Data.title}
              onChange={change}
              className="w-full p-2 border border-gray-300 rounded bg-gray-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Author:</label>
            <input
              type="text"
              name="author"
              value={Data.author}
              onChange={change}
              className="w-full p-2 border border-gray-300 rounded bg-gray-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Price and Language:</label>
            <div className="flex space-x-4">
              <input
                type="text"
                name="price"
                value={Data.price}
                onChange={change}
                className="w-1/2 p-2 border border-gray-300 rounded bg-gray-100"
                placeholder="Price"
              />
              <input
                type="text"
                name="language"
                value={Data.language}
                onChange={change}
                className="w-1/2 p-2 border border-gray-300 rounded bg-gray-100"
                placeholder="Language"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Description:</label>
            <textarea
              name="desc"
              value={Data.desc}
              onChange={change}
              className="w-full p-2 border border-gray-300 rounded bg-gray-400"
            ></textarea>
          </div>
          <button onClick={submit} className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700">
          Update Book
          </button>
        </div>
      );
    }

export default UpdateBook
