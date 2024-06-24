import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from './SeeUserData';

function AllOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDiv,setUserDiv] =useState("hidden");
  const [userDivData,setUserDivData]=useState();
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/get-all-orders', { headers });
        setAllOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching all orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const submitChanges = async (index) => {
    const id = allOrders[index]._id;
    try {
      const response = await axios.put(`http://localhost:1000/api/update-status/${id}`, { status: values.status }, { headers });
      console.log(response.data);
      alert(response.data.message);

      // Update the local state to reflect the change
      const updatedOrders = [...allOrders];
      updatedOrders[index].status = values.status;
      setAllOrders(updatedOrders);
      setOptions(-1); // Reset the options state
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    }
  }

  return (
    <>
      {allOrders.length === 0 && (
        <div className="h-[10vh] p-4 text-zinc-500">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-5xl text-center font-semibold text-blueviolet mb-12">
              No Orders Found
            </h1>
          </div>
        </div>
      )}

      {allOrders.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl text-center font-semibold text-blueviolet mb-12">
            All Orders
          </h1>

          <div className="mb-4 mt-6 bg-zinc-800 text-white text-lg md:text-xl font-medium rounded py-2 px-4 flex gap-2">

            <div className="w-[3%] mr-4 ">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-[45%] hidden md:block">
              <h1>Description</h1>
            </div>
            <div className="w-[9%] mr-9 ">
              <h1>Price</h1>
            </div>
            <div className="w-[16%] mr-5">
              <h1>Status</h1>
            </div>
            <div className="w-none md:w-[5%] md:block">
              <h1>Mode</h1>
            </div>
          </div>

          {allOrders.map((item, index) => (
            <div
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 my-5 hover:bg-zinc-900 hover:cursor-pointer"
              key={item._id}
            >
              <div className="w-[3%]">
                <h1 className="text-center">{index + 1}</h1>
              </div>
              <div className="w-[22%] text-gray-400">
                {item.book ? (
                  <span className="hover:text-blue-300">
                    {item.book.title}
                  </span>
                ) : (
                  <span className="text-red-500">Book details not available</span>
                )}
              </div>
              <div className="md:w-[45%] w-0 hidden md:block text-gray-400">
                <h1>{item.book ? `${item.book.desc.slice(0, 50)}...` : 'Description not available'}</h1>
              </div>
              <div className="w-[17%] md:w-[9%] text-gray-400">
                <h1>{item.book ? item.book.price : 'N/A'}</h1>
              </div>
              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  <button className='hover:scale-105 translate-all duration-300' onClick={() => setOptions(index)}>
                    {item.status === 'Order Placed' ? (
                      <div className="text-yellow-500">{item.status}</div>
                    ) : item.status === 'Canceled' ? (
                      <div className="text-red-500">{item.status}</div>
                    ) : (
                      <div className="text-green-500">{item.status}</div>
                    )}
                  </button>

                  <div className={`${options === index ? "flex" : "hidden"}`}>
                    <select
                      name='status'
                      className='bg-gray-800'
                      onChange={change}
                      value={values.status}
                    >
                      {[
                        "Order Placed",
                        "Out for Delivery",
                        "Delivered",
                        "Canceled"
                      ].map((items, i) => (
                        <option value={items} key={i}>
                          {items}
                        </option>
                      ))}
                    </select>
                    <button
                      className='text-green-500 hover:text-pink-600 mx-2'
                      onClick={() => submitChanges(index)}
                    >
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>

              <div className='w-[10%] md:w-[5%]'>
                <button
                  className='text-xl hover:text-orange-500'
                  onClick={() => {
                    setUserDiv("fixed");
                    setUserDivData(item.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {userDivData && (
        <SeeUserData 
           userDivData={userDivData}
           userDiv={userDiv}
           setUserDiv={setUserDiv}
        />
      )}
    </>
  );
}

export default AllOrders;
