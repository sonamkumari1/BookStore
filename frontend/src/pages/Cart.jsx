import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/get-user-cart", {
          headers,
        });
        setCart(res.data.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/removeCart/${bookid}`,
        {},
        { headers }
      );
      alert(response.data.message);
      // Refresh cart after delete
      const res = await axios.get("http://localhost:1000/api/get-user-cart", {
        headers,
      });
      setCart(res.data.data);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let totalPrice = 0;
      cart.forEach((item) => {
        totalPrice += item.price;
      });
      setTotal(totalPrice);
    }
  }, [cart]);

  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:1000/api/place-order`,
        { order: cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-zinc-900 px-12 h-screen py-8">
      {cart && cart.length === 0 ? (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
              Empty Cart
            </h1>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/008/515/488/small/empty-cart-flat-illustration-concept-vector.jpg"
              alt=""
              className="lg:h-[50vh]"
            />
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>
          {cart.map((item, index) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
              key={item._id}
            >
              <img
                src={item.url}
                alt=""
                className="h-[30vh] md:h-[10vh]"
              />

              <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                {item.title}
              </h1>

              <div className="w-full md:w-auto text-xl">
                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                  {item.desc.slice(0, 100)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                  {item.desc.slice(0, 100)}...
                </p>
                <p className="text-normal text-zinc-300 mt-2 block md:hidden">
                  {item.desc.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-zinc-100 text-3xl font-semibold">
                  {item.price}
                </h2>
                <button
                  className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                  onClick={() => deleteItem(item._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-zinc-800 rounded">
              <h1 className="text-3xl text-zinc-200 font-semibold">
                Total Amount
              </h1>
              <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                <h2>{cart.length} books</h2>
                <h2>{total}</h2>
              </div>
              <div className="w-[100%] mt-3">
                <button
                  className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-500"
                  onClick={PlaceOrder}
                >
                  Place your order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
