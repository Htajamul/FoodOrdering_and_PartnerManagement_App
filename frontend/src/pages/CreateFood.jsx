import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
export const CreateFood = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    video: null,
  });
  const navigate = useNavigate()


  const handleChange = (e) => {
    const { name, value, files } = e.target; // this is destructuring
    setData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // condition ? do If True : do If False

    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.description || !data.video) {
      alert("Please fill all fields and upload a video");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("video", data.video); // your File object

    try {
      const response = await axios.post('http://localhost:3000/food/add', formData, { withCredentials: true })
      
      setData({ name: "", description: "", video: null })
      alert(response.data.message)
      
      navigate('/home')
    } catch (error) {
      // console.log(error.response.data.message)
      alert(error.response?.data?.message || "Something went wrong while uploading");
    }
  };

  return (
    <div className="md:hidden min-h-screen flex flex-col text-white bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">

      {/* Header */}
      <div className="h-14 flex items-center justify-center backdrop-blur-md bg-white/5 border-b border-white/10">
        <h1 className="text-lg font-semibold tracking-wide">
          Create Food
        </h1>
      </div>

      {/* Upload Section */}
      <div className="px-4 pt-4">
        <label className="relative h-48 w-full rounded-2xl border-2 border-dashed border-white/30 flex items-center justify-center cursor-pointer overflow-hidden">
          <input
            type="file"
            accept="video/*"
            className="hidden"
            name="video"
            onChange={handleChange}
          />

          {!data.video ? (
            <div className="text-center space-y-1">
              <div className="text-4xl">🎥</div>
              <p className="text-sm text-white/70">Upload food video</p>
              <p className="text-xs text-white/40">MP4 • up to 60 sec</p>
            </div>
          ) : (
            <>
              <video
                src={URL.createObjectURL(data.video)}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                autoPlay
                loop
              />
              <div className="absolute bottom-2 right-2 bg-black/60 px-3 py-1 rounded-full text-xs">
                Change
              </div>
            </>
          )}
        </label>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-4 p-4 space-y-4 backdrop-blur-xl bg-white/10 rounded-t-3xl"
      >
        <input
          type="text"
          name="name"
          placeholder="Food name"
          value={data.name}
          onChange={handleChange}
          className="w-full bg-white/10 px-4 py-3 rounded-xl outline-none"
          required
        />

        <textarea
          name="description"
          placeholder="Describe the taste..."
          value={data.description}
          onChange={handleChange}
          rows={2}
          className="w-full bg-white/10 px-4 py-3 rounded-xl outline-none resize-none"
          required
        />

        <button
          type="submit"
          className="w-full py-3 rounded-2xl font-semibold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400"
        >
          Publish Food
        </button>
      </form>
    </div>
  );
};





//=======================================================================


// import { useState } from "react";

// export const CreateFood = () => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [video, setVideo] = useState(null);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log({ name, description, video });
//   };

//   return (
//     // Mobile only
//     <div className="md:hidden min-h-screen flex flex-col text-white bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">

//       {/* Header */}
//       <div className="h-14 flex items-center justify-center backdrop-blur-md bg-white/5 border-b border-white/10">
//         <h1 className="text-lg font-semibold tracking-wide">
//           Create Food
//         </h1>
//       </div>

//       {/* Upload Section (COMPACT) */}
//       <div className="px-4 pt-4">
//         <label className="relative h-48 w-full rounded-2xl border-2 border-dashed border-white/30 flex items-center justify-center cursor-pointer overflow-hidden">

//           <input
//             type="file"
//             accept="video/*"
//             className="hidden"
//             onChange={(e) => setVideo(e.target.files[0])}
//           />

//           {!video ? (
//             <div className="text-center space-y-1">
//               <div className="text-4xl">🎥</div>
//               <p className="text-sm text-white/70">
//                 Upload food video
//               </p>
//               <p className="text-xs text-white/40">
//                 MP4 • up to 60 sec
//               </p>
//             </div>
//           ) : (
//             <>
//               <video
//                 src={URL.createObjectURL(video)}
//                 className="absolute inset-0 w-full h-full object-cover"
//                 muted
//                 autoPlay
//                 loop
//               />
//               <div className="absolute bottom-2 right-2 bg-black/60 px-3 py-1 rounded-full text-xs">
//                 Change
//               </div>
//             </>
//           )}

//         </label>
//       </div>

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="mt-4 p-4 space-y-4 backdrop-blur-xl bg-white/10 rounded-t-3xl"
//       >
//         <input
//           type="text"
//           placeholder="Food name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full bg-white/10 px-4 py-3 rounded-xl outline-none placeholder-white/50 focus:ring-2 focus:ring-pink-400"
//           required
//         />

//         <textarea
//           placeholder="Describe the taste..."
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           rows={2}
//           className="w-full bg-white/10 px-4 py-3 rounded-xl outline-none resize-none placeholder-white/50 focus:ring-2 focus:ring-purple-400"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full py-3 rounded-2xl font-semibold bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 shadow-lg shadow-pink-500/30 active:scale-95 transition"
//         >
//           Publish Food
//         </button>
//       </form>
//     </div>
//   );
// };
