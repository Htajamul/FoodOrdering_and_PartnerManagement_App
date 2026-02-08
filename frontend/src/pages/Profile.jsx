


import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";


const Profile = () => {
  const navigate = useNavigate()
  const [reels, setReels] = useState([])
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // 1️⃣ Get logged-in user (common endpoint)
        const meRes = await axios.get("http://localhost:3000/partner/me", {
          withCredentials: true,
        });
        // console.log(meRes.data.user.role)
        setUser(meRes.data.user);

        // 2️⃣ Role-based data
        if (meRes.data.user.role === "foodPartner") {
          const foodRes = await axios.get(
            "http://localhost:3000/food",
            { withCredentials: true }
          );
          setReels(foodRes.data.foods);
        } else {
          const savedRes = await axios.get(
            "http://localhost:3000/food/getSavedVideos",
            { withCredentials: true }
          );
          console.log(savedRes)
          setReels(savedRes.data.foods);
        }

      } catch (error) {
        console.log(error)
        // navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const initials = user?.name
    ?.trim()
    .slice(0, 2)
    .toUpperCase();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Loading profile...
      </div>
    );
  }

  return (
    /* PAGE BACKGROUND */
    <div className="flex min-h-screen w-full justify-center bg-black">

      {/* MOBILE FRAME */}
      <div className="w-full max-w-[420px] bg-black text-white">

        {/* HEADER */}
        <div className="px-4 pt-6 pb-4">
          <h1 className="text-lg font-semibold">
            {user?.name || "Profile"}
          </h1>
        </div>

        {/* PROFILE INFO */}
        <div className="flex items-center px-4 gap-4">

          {/* Profile Image */}
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="h-20 w-20 rounded-full object-cover border border-gray-700"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
              <span className="text-xl font-semibold text-white">
                {initials}
              </span>
            </div>
          )}


          {/* Stats */}
          <div className="flex flex-1 justify-around text-center">
            <div>
              <p className="text-base font-semibold">{reels.length}</p>
              <p className="text-xs text-gray-400">Reels</p>
            </div>
            <div>
              <p className="text-base font-semibold">50k</p>
              <p className="text-xs text-gray-400">Customers</p>
            </div>
          </div>
        </div>

        {/* NAME / BIO */}
        <div className="px-4 mt-3">
          <p className="text-sm font-medium">
            {user?.name}
          </p>
          <p className="text-xs text-gray-400">
            Authentic food • Fast delivery
          </p>
        </div>

        {/* ACTION BUTTON */}
        <div className="block md:hidden px-4 mt-6 space-y-3">
          {user?.role === "foodPartner" ? (
            <>
              <Link
                to="/create-food"
                className="block w-full rounded-xl bg-green-600 py-3 text-center text-sm font-semibold text-white shadow-lg hover:bg-green-500 transition-all duration-200 transform hover:-translate-y-1"
              >
                ✨ Create Food
              </Link>
              <Link
                to="/my-foods"
                className="block w-full rounded-xl bg-gray-800 py-3 text-center text-sm font-semibold text-white shadow hover:bg-gray-700 transition-all duration-200 transform hover:-translate-y-1"
              >
                📦 My Foods
              </Link>
              <Link
                to="/manage-store"
                className="block w-full rounded-xl bg-gray-800 py-3 text-center text-sm font-semibold text-white shadow hover:bg-gray-700 transition-all duration-200 transform hover:-translate-y-1"
              >
                🏪 Manage Store
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/saved"
                className="block w-full rounded-xl bg-gray-800 py-3 text-center text-sm font-semibold text-white shadow hover:bg-gray-700 transition-all duration-200 transform hover:-translate-y-1"
              >
                💾 Saved Foods
              </Link>
              <Link
                to="/orders"
                className="block w-full rounded-xl bg-gray-800 py-3 text-center text-sm font-semibold text-white shadow hover:bg-gray-700 transition-all duration-200 transform hover:-translate-y-1"
              >
                🛒 My Orders
              </Link>
            </>
          )}
        </div>


        {/* DIVIDER */}
        <div className="mt-5 border-t border-gray-800" />

        {/* REELS GRID */}
        <div className="grid grid-cols-3 gap-[1px] bg-gray-800">
          {reels.map((reel) => (
            <div key={reel._id} className="aspect-square bg-black">
              <video
                src={reel.video}
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Profile;

