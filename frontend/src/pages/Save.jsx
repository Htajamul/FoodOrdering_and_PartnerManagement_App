import { Bookmark, BookmarkMinus } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
function Save() {
  const [foods, setFoods] = useState([])
  useEffect(() => {
    const fetchSavedVideos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/food/getSavedVideos", { withCredentials: true })
        setFoods(response.data.foods)
      } catch (error) {
        alert(error.response.data.message)
      }
    }
    fetchSavedVideos()
  }, [])
  const handleUnsave = async(foodId)=>{
    try {
      const response = await axios.post(`http://localhost:3000/food/save/${foodId}`,{},{withCredentials:true})
      setFoods(foods.filter((food)=>food._id !== foodId))
      alert(response.data.message)
    } catch (error) {
      console.log(error)
      
    }
  }
  return (
    <div className="min-h-screen bg-black text-white md:hidden">

      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-center border-b border-white/10 bg-black py-3">
        <h1 className="text-base font-semibold tracking-wide">Saved</h1>
      </div>

      {/* Content */}
      {foods.length === 0 ? (
        // Empty State
        <div className="flex h-[85vh] flex-col items-center justify-center px-6 text-center">
          <Bookmark size={40} className="mb-3 text-white/40" />
          <h2 className="text-sm font-medium">No saved videos</h2>
          <p className="mt-1 text-xs text-white/50">
            Save videos to watch later
          </p>
        </div>
      ) : (
        // Saved Videos
        <div className="space-y-4 px-2 py-4 pb-20">
          {foods.map((food) => (
            <div
              key={food._id}
              className="relative overflow-hidden rounded-2xl bg-zinc-900"
            >
              {/* Video */}
              <video
                src={food.video}
                muted
                playsInline
                preload="metadata"
                onClick={(e) => {
                  const video = e.currentTarget;
                  document.querySelectorAll("video").forEach(v => {
                    if (v !== video) v.pause();
                  });
                  video.paused ? video.play() : video.pause();
                }}
                className="h-[65vh] w-full object-cover cursor-pointer"
              />

              {/* Bookmark button */}
              <button
                onClick={() => handleUnsave(food._id)}
                className="absolute top-2 right-2 z-10 rounded-full bg-black/50 p-1.5 hover:bg-black/70"
              >
                <Bookmark size={20} className="text-white" fill="white" />
              </button>

              {/* Info */}
              <div className="p-3">
                <h3 className="text-sm font-semibold leading-tight">
                  {food.name}
                </h3>
                <p className="mt-1 text-xs text-white/60 line-clamp-2">
                  {food.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>

  );
}

export default Save;








//===============================================

// {/* <div className="min-h-screen bg-black text-white md:hidden">

//       {/* Header */}
// <div className="sticky top-0 z-20 flex items-center justify-center border-b border-white/10 bg-black py-3">
//   <h1 className="text-base font-semibold">Saved</h1>
// </div>

// {
//   foods.length === 0 ? (
//     // Empty State
//     <div className="flex h-[85vh] flex-col items-center justify-center px-6 text-center">
//       <Bookmark size={40} className="mb-3 text-white/40" />
//       <h2 className="text-sm font-medium">No saved videos</h2>
//       <p className="mt-1 text-xs text-white/50">
//         Save videos to watch later
//       </p>
//     </div>
//   ) : (
//   // ✅ 3-column grid
//   <div className="grid grid-cols-3 gap-[6px] px-2 py-3">
//     {foods.map((food) => (
//       <div
//         key={food._id}
//         className="group relative aspect-[9/16] overflow-hidden rounded-xl bg-zinc-900"
//       >
//         {/* Video */}
//         <video
//           src={food.video}
//           muted
//           preload="metadata"
//           className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
//         />

//         {/* Gradient overlay */}
//         <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

//         {/* Title */}
//         <div className="absolute bottom-2 left-2 right-2">
//           <p className="truncate text-[11px] font-medium text-white/90">
//             {food.name}
//           </p>
//         </div>
//       </div>
//     ))}
//   </div>

// )
// }

//     </div > */}