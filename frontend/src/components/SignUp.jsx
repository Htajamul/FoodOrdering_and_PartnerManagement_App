


import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user", // default role
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        // setForm({ ...form, [e.target.name]: e.target.value });
        const { name, value } = e.target; // get input name & value
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("http://localhost:3000/partner/signup", form, {
                withCredentials: true,
            });
            alert("Signup successful!");
            navigate("/signin");
        } catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black px-4">
            {/* Mobile Container */}
            <div className="w-full max-w-[420px] bg-gray-900 p-6 rounded-xl">
                <h1 className="text-2xl font-bold text-center mb-6 text-white">
                    Sign Up
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-white">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                            className="w-full rounded-md bg-gray-800 p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

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

                    {/* Role Selection */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-white">Role</label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="w-full rounded-md bg-gray-800 p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="user">User</option>
                            <option value="foodPartner">Food Partner</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 py-3 rounded-md text-white font-semibold hover:bg-green-500 transition"
                    >
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

                {/* Already have account */}
                <p className="mt-4 text-center text-gray-400 text-sm">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-green-500">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;













// import React, { useEffect } from "react";
// import axios from 'axios'
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// const SignUp = () => {
//     const navigate = useNavigate()
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: ""
//     })

//     const submitHandler = async (e) => {
//         e.preventDefault()

//         try {
//             const response = await axios.post("http://localhost:3000/user/signUp", formData)
//             console.log(response)// here ere===
//             setFormData({ name: "", email: "", password: "" });
//             navigate('/user/signIn')
//         } catch (error) {
//             // console.log(error.response.data.message)
//             setFormData({ name: "", email: "", password: "" });
//             const message = error.response?.data?.message || "Something went wrong";
//             alert(message);
//             if (message.toLowerCase().includes("already")) {
//                 navigate("/user/signIn");
//             }
//         }
//     }

//     const handlerChange = (e) => {
//         const { name, value } = e.target; // get input name & value
//         setFormData({ ...formData, [name]: value });
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex items-end">

//             {/* Bottom Sheet */}
//             <div className="w-full bg-white rounded-t-3xl px-5 py-8 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">

//                 {/* Handle */}
//                 <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>

//                 <h2 className="text-2xl font-bold text-gray-900 mb-1">
//                     Create Account
//                 </h2>
//                 <p className="text-sm text-gray-500 mb-6">
//                     Sign up to get started
//                 </p>

//                 {/* Form */}
//                 <form className="space-y-5" onSubmit={submitHandler}>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handlerChange}
//                         placeholder="Full Name"
//                         className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />

//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handlerChange}
//                         placeholder="Email Address"
//                         className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />

//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handlerChange}
//                         placeholder="Password"
//                         className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {/* <input
//                         type="password"
//                         placeholder="Confrom Password"
//                         className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     /> */}

//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md active:scale-95 transition"
//                     >
//                         Sign Up
//                     </button>
//                 </form>

//                 {/* Divider */}
//                 <div className="flex items-center my-6">
//                     <div className="flex-1 h-px bg-gray-200"></div>
//                     <span className="px-3 text-xs text-gray-400">OR</span>
//                     <div className="flex-1 h-px bg-gray-200"></div>
//                 </div>

//                 {/* Social Buttons */}
//                 <div className="space-y-3">
//                     <button
//                         className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl text-sm font-medium active:scale-95 transition"
//                     >
//                         <img
//                             src="https://www.svgrepo.com/show/475656/google-color.svg"
//                             alt="Google"
//                             className="w-5 h-5"
//                         />
//                         Continue with Google
//                     </button>

//                     <button
//                         className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white py-3 rounded-xl text-sm font-medium active:scale-95 transition"
//                     >
//                         <img
//                             src="https://www.svgrepo.com/show/475647/facebook-color.svg"
//                             alt="Facebook"
//                             className="w-5 h-5"
//                         />
//                         Continue with Facebook
//                     </button>
//                 </div>

//                 {/* Footer Text */}
//                 <p className="text-xs text-center text-gray-500 mt-6">
//                     Already have an account?{" "}
//                     <Link
//                         to="/user/signIn"
//                         className="text-blue-600 font-semibold active:opacity-70"
//                     >
//                         Sign In
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default SignUp;



