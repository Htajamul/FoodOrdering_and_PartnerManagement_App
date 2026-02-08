



import { Link, useLocation } from "react-router-dom";
import { Home, Bookmark, User } from "lucide-react";

function BottomNav() {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] flex h-14 items-center justify-around border-t border-gray-800 bg-black md:hidden pointer-events-auto">

      {/* HOME */}
      <Link to="/home">
        <Home
          size={28}
          className={location.pathname === "/" ? "text-white" : "text-white/60"}
          fill={location.pathname === "/" ? "white" : "none"}
        />
      </Link>

      {/* SAVED */}
      <Link to="/saved">
        <Bookmark
          size={26}
          className={location.pathname === "/save" ? "text-white" : "text-white/60"}
          fill={location.pathname === "/save" ? "white" : "none"}
        />
      </Link>

      {/* PROFILE */}
      <Link to="/profile">
        <User
          size={26}
          className={location.pathname === "/profile" ? "text-white" : "text-white/60"}
          fill={location.pathname === "/profile" ? "white" : "none"}
        />
      </Link>

    </div>
  );
}

export { BottomNav };






//=============================================================


// import { Link, useLocation } from "react-router-dom";
// import { Home, Bookmark } from "lucide-react";

// function BottomNav() {
//   const location = useLocation();

//   return (
//     <div className="fixed bottom-0 left-0 right-0 z-[100] flex h-14 items-center justify-around border-t border-gray-800 bg-black md:hidden pointer-events-auto">

//       {/* HOME */}
//       <Link to="/">
//         <Home
//           size={28}
//           className={
//             location.pathname === "/"
//               ? "text-white"
//               : "text-white/60"
//           }
//           fill={location.pathname === "/" ? "white" : "none"}
//         />
//       </Link>

//       {/* SAVE */}
//       <Link to="/save">
//         <Bookmark
//           size={26}
//           className={
//             location.pathname === "/save"
//               ? "text-white"
//               : "text-white/60"
//           }
//           fill={location.pathname === "/save" ? "white" : "none"}
//         />
//       </Link>

//     </div>
//   );
// }

// export  {BottomNav};
