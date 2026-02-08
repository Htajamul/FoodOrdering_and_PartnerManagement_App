

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Call your backend signin endpoint
      const res = await axios.post(
        "http://localhost:3000/partner/signin",
        form,
        { withCredentials: true }
      );
      console.log(res.data,"in signIn")

      // Save user data (with role) in localStorage or context
      localStorage.setItem("user", JSON.stringify(res.data.userData));
      localStorage.setItem("token",res.data.token)
      // console.log(localStorage.getItem("token"))

      // Navigate to Home or Profile
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Signin failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      {/* Mobile Container */}
      <div className="w-full max-w-[420px] bg-gray-900 p-6 rounded-xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              required
              className="w-full rounded-md bg-gray-800 p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-white">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              required
              className="w-full rounded-md bg-gray-800 p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 py-3 rounded-md text-white font-semibold hover:bg-green-500 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-4 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-500 cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;












// import React from "react";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const SignIn = () => {
//   const [formData, setFormdata] = useState({ email: "", password: "" })
//   const navigate = useNavigate()
//   const submithandler = async (e) => {
//     e.preventDefault()

//     try {
//       const response = await axios.post("http://localhost:3000/user/signin", formData,{ withCredentials: true })
//       console.log(response.data)
//       alert(response.data.message)
//       setFormdata({ email: "", password: "" })
//       navigate('/')
//     } catch (error) {
//       const message = error.response?.data?.message || "Something went wrong";
//       alert(message)
//       setFormdata({ email: "", password: "" })
//       if (message.toLowerCase().includes("not found")) {
//         navigate("/user/signUp");
//       }

//     }

//   }

//   const handlerChange = (e) => {
//     const { name, value } = e.target;
//     setFormdata({ ...formData, [name]: value })
//   }
//   return (
//     <div className="min-h-screen bg-[#F6F7F9] flex items-end">
//       <div className="w-full bg-white rounded-t-4x1 px-6 pt-4 pb-8">

//         {/* Handle */}
//         <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

//         {/* Title */}
//         <h1 className="text-[26px] font-semibold text-gray-900 leading-tight">
//           Welcome back
//         </h1>
//         <p className="text-[13px] text-gray-500 mt-1">
//           Sign in to continue
//         </p>

//         {/* Form */}
//         <form className="mt-8 space-y-5" onSubmit={submithandler}>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handlerChange}
//             placeholder="Email address"
//             className="w-full h-12 px-4 rounded-2xl bg-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handlerChange}
//             placeholder="Password"
//             className="w-full h-12 px-4 rounded-2xl bg-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <button
//             type="submit"
//             className="w-full h-12 rounded-2xl bg-black text-white text-sm font-medium active:scale-[0.97] transition"
//           >
//             Sign in
//           </button>
//         </form>

//         {/* Forgot password */}
//         <div className="text-right mt-3">
//           <Link
//             to="/forgot-password"
//             className="text-[12px] text-blue-600 font-medium"
//           >
//             Forgot password?
//           </Link>
//         </div>

//         {/* Divider */}
//         <div className="flex items-center my-7">
//           <div className="flex-1 h-px bg-gray-200" />
//           <span className="px-3 text-[11px] text-gray-400">
//             or continue with
//           </span>
//           <div className="flex-1 h-px bg-gray-200" />
//         </div>

//         {/* Social login */}
//         <div className="space-y-3">
//           <button className="w-full h-12 rounded-2xl border border-gray-300 flex items-center justify-center gap-3 text-sm font-medium active:scale-[0.97] transition">
//             <img
//               src="https://www.svgrepo.com/show/475656/google-color.svg"
//               alt="Google"
//               className="w-5 h-5"
//             />
//             Google
//           </button>

//           <button className="w-full h-12 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center gap-3 text-sm font-medium active:scale-[0.97] transition">
//             <img
//               src="https://www.svgrepo.com/show/475647/facebook-color.svg"
//               alt="Facebook"
//               className="w-5 h-5"
//             />
//             Facebook
//           </button>
//         </div>

//         {/* Footer */}
//         <p className="mt-7 text-center text-[12px] text-gray-500">
//           Don’t have an account?{" "}
//           <Link
//             to="/user/signUp"
//             className="text-black font-medium"
//           >
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignIn;
