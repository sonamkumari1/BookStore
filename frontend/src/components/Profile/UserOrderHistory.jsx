import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserOrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/get-order-history', { headers });
        console.log(response.data.data);
        setOrderHistory(response.data.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {orderHistory && orderHistory.length === 0 && (
        <div className="h-[10vh] p-4 text-zinc-500">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No order History
            </h1>
            <img src="" alt="" className="h-[20vh] mb-8" />
          </div>
        </div>
      )}

      {orderHistory && orderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl text-center font-semibold text-blueviolet mb-12 ">
            Your Order History
          </h1>

          <div className="mb-4 mt-6 bg-zinc-800 text-white text-lg md:text-xl font-medium rounded py-2 px-4 flex gap-2">

            <div className="w-[3%] mr-3">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-[45%]">
              <h1>Description</h1>
            </div>
            <div className="w-[9%] mr-5">
              <h1>Price</h1>
            </div>
            <div className="w-[16%]">
              <h1>Status</h1>
            </div>
           
          </div>

          {orderHistory.map((item, index) => (
            <div
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 my-5 hover:bg-zinc-900 hover:cursor-pointer"
              key={item.id}
            >
              <div className="w-[3%]">
                <h1 className="text-center">{index + 1}</h1>
              </div>
              <div className="w-[22%] text-gray-400">
                {item.book ? (
                  <Link to={`/view-book-details/${item.book._id}`} className="hover:text-blue-300 ">
                    {item.book.title}
                  </Link>
                ) : (
                  <span className="text-red-500">Book details not available</span>
                )}
              </div>
              <div className="w-[45%] text-gray-400">
                <h1>{item.book ? `${item.book.desc.slice(0, 50)}...` : 'Description not available'}</h1>
              </div>
              <div className="w-[9%] text-gray-400">
                <h1>{item.book ? item.book.price : 'N/A'}</h1>
              </div>
              <div className="w-[16%]">
                <h1 className="font-semibold text-green-500">
                  {item.status === 'Order Placed' ? (
                    <span className="text-yellow-500">{item.status}</span>
                  ) : item.status === 'Canceled' ? (
                    <span className="text-red-500">{item.status}</span>
                  ) : (
                    item.status
                  )}
                </h1>
              </div>
             
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default UserOrderHistory;
