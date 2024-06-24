import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllBook from "./pages/AllBook";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth"
import Favourite from "./components/Profile/Favourite";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Setting from "./components/Profile/Setting";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

export default function App() {

  const dispatch=useDispatch();
  const role=useSelector((state)=>state.auth.role);

  useEffect(()=>{
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token")&&
      localStorage.getItem("role")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
     
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/all-books" element={<AllBook />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/update-book/:id" element={<UpdateBook />} />
          <Route path="/profile" element={<Profile />}>
            {role==="user" ? ( <Route index element={<Favourite />} />) : (<Route index element={<AllOrders />} />)}
            {role==="admin" && (  <Route path="/profile/add-book" element={<AddBook/>} />)}
            <Route path="/profile/orderHistory" element={<UserOrderHistory/>} />
            <Route path="/profile/setting" element={<Setting/>} />
            </Route>
          <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        </Routes>
        <Footer />
   
    </div>
  );
}
