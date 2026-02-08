import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FoodPartnerSignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/partner/signIn",
        formData,
        { withCredentials: true }
      );

      // console.log(res.data.message);
      setFormData({ email: "", password: "" });
      navigate("/create-food");

    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong";

      alert(message);
      setFormData({ email: "", password: "" });

      if (message.toLowerCase().includes("not found")) {
        navigate("/partner/signup");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] flex items-end">
      <div className="w-full bg-white rounded-t-3xl px-5 pt-5 pb-8">

        {/* Handle */}
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900">
          Partner Sign In
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Login to manage your restaurant
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={submitHandler}>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            className="w-full h-12 px-4 rounded-2xl bg-gray-100 text-sm focus:outline-none"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full h-12 px-4 rounded-2xl bg-gray-100 text-sm focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full h-12 rounded-2xl bg-black text-white text-sm font-medium active:scale-[0.97]"
          >
            Sign in
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-500">
          Don’t have a partner account?{" "}
          <Link
            to="/partner/signup"
            className="text-black font-medium"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default FoodPartnerSignIn;
