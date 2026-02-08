


import { Heart, Bookmark, MessageCircle } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  // foods.map((food)=>console.log(food.foodpartner))
  const [user, setUser] = useState(null);
  const videoRefs = useRef({});

  // Fetch user info
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/signin");
    }
  }, []);
  // Fetch foods
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get("http://localhost:3000/food", {
          withCredentials: true,
        });
        setFoods(response.data.foods);
      } catch (error) {
        // alert(error.response?.data?.message || "Failed to load foods");
        navigate("/signin");
      }
    };
    fetchFood();
  }, []);

  // Video play/pause
  const togglePlay = (id) => {
    const video = videoRefs.current[id];
    if (!video) return;
    video.paused ? video.play() : video.pause();
  };

  // Like food
  const handleLike = async (foodId) => {
    try {
      await axios.post(
        `http://localhost:3000/food/like/${foodId}`,
        {},
        { withCredentials: true }
      );
      setFoods(prev =>
        prev.map(food =>
          food._id === foodId
            ? {
              ...food,
              likeCount: food.likeCount === 0 ? 1 : food.likeCount - 1,
            }
            : food
        )
      );
    } catch (error) {
      alert("Like failed");
    }
  };

  // Save food
  const handleSave = async (foodId) => {
    try {
      await axios.post(
        `http://localhost:3000/food/save/${foodId}`,
        {},
        { withCredentials: true }
      );
      alert("Food saved!");
    } catch (error) {
      alert("Save failed");
    }
  };

  return (
    <div className="flex justify-center bg-black min-h-screen px-2">
      {/* Mobile container */}
      <div className="w-full max-w-[420px] pb-20">
        {foods.map((food) => (
          <div key={food._id} className="relative h-screen snap-start">
            {/* Video */}
            <video
              ref={(el) => (videoRefs.current[food._id] = el)}
              src={food.video}
              autoPlay
              loop
              muted
              playsInline
              onClick={() => togglePlay(food._id)}
              className="h-full w-full object-cover"
            />

            {/* Right side action buttons */}
            <div className="absolute right-3 bottom-40 flex flex-col items-center gap-5 text-white">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleLike(food._id)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50"
                >
                  <Heart size={26} />
                </button>
                <span className="mt-1 text-xs">{food.likeCount || 0}</span>
              </div>

              <div className="flex flex-col items-center">
                <button className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50">
                  <MessageCircle size={26} />
                </button>
                <span className="mt-1 text-xs">0</span>
              </div>

              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleSave(food._id)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50"
                >
                  <Bookmark size={26} />
                </button>
              </div>
            </div>

            {/* Bottom description & Visit Store */}
            <div className="absolute bottom-20 left-4 right-4 text-white">
              <p className="mb-3 text-sm line-clamp-2">{food.description}</p>

              {/* Visit Store button */}
              <Link
                to={`/store/${food.foodpartner}`}
                className="block w-full rounded-lg bg-red-500 py-3 text-center text-sm font-semibold"
              >
                Visit Store
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export  {Home};












// import { Heart, Bookmark, MessageCircle } from "lucide-react"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"
// import { useState, useEffect, useRef } from "react"
// import { Link } from "react-router-dom"

// export const Home = () => {
//   const navigate = useNavigate()
//   const [foods, setFoods] = useState([])
//   const videoRefs = useRef({})

//   useEffect(() => {
//     const fetchFood = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3000/food",
//           { withCredentials: true }
//         )

//         setFoods(response.data.foods)
//       } catch (error) {
//         alert(error.response?.data?.message)
//         if (error.response.data.message.toLowerCase().includes("plz login first")) {
//           navigate("/user/signin");
//         }

//       }
//     }
//     fetchFood()
//   }, [])

//   const togglePlay = (id) => {
//     const video = videoRefs.current[id]
//     if (!video) return
//     video.paused ? video.play() : video.pause()
//   }

//   /*  LIKE */
//   const handleLike = async (foodId) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3000/food/like/${foodId}`,
//         {},
//         { withCredentials: true }
//       )
      // setFoods(prev =>
      //   prev.map(food =>
      //     food._id === foodId
      //       ? {
      //         ...food,
      //         likeCount: food.likeCount === 0 ? 1 : food.likeCount - 1,
      //       }
      //       : food
      //   )
      // );
//     } catch (error) {
//       alert("Like failed")
//       console.log(error)
//     }
//   }

//   /*  SAVE */
//   const handleSave = async (foodId) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:3000/food/save/${foodId}`,
//         {},
//         { withCredentials: true }
//       )
//       alert(response.data.message)
//     } catch (error) {
//       alert("Save failed")
//     }
//   }

//   return (

//     <div className="flex h-screen w-full justify-center bg-black" >
//       <div className="h-screen w-full max-w-105 overflow-y-scroll snap-y snap-mandatory pb-20 ">

//         {foods.map((food) => (
//           <div key={food._id} className="relative h-screen w-full snap-start">

//             <video
//               ref={(el) => (videoRefs.current[food._id] = el)}
//               src={food.video}
//               autoPlay
//               loop
//               muted
//               playsInline
//               onClick={() => togglePlay(food._id)}
//               className="h-full w-full object-cover"
//             />

//             <div className="absolute right-3 bottom-40 flex flex-col items-center gap-6 text-white">

//               <div className="flex flex-col items-center">
//                 <button
//                   onClick={() => handleLike(food._id)}
//                   className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40"
//                 >
//                   <Heart size={26} />
//                 </button>
//                 <span className="mt-1 text-xs">{food.likeCount || 0}</span>
//               </div>

//               <div className="flex flex-col items-center">
//                 <button className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40">
//                   <MessageCircle size={26} />
//                 </button>
//                 <span className="mt-1 text-xs">0</span>
//               </div>

//               <div className="flex flex-col items-center">
//                 <button
//                   onClick={() => handleSave(food._id)}
//                   className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40"
//                 >
//                   <Bookmark size={26} />
//                 </button>
//               </div>

//             </div>

//             <div className="absolute bottom-20 left-4 right-4 text-white">
//               <p className="mb-3 text-sm line-clamp-2">
//                 {food.description}
//               </p>

//               <Link
//               //here===
//                 to={`/profile/${food.foodpartner}`}
//                 className="block w-full rounded-lg bg-red-500 py-3 text-center text-sm font-semibold"
//               >
//                 Visit Store
//               </Link>
//             </div>

//           </div>
//         ))}

//       </div>
//     </div>
//   )

// }


