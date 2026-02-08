import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

const VisitStore = () => {
  const { id } = useParams();
  const [me, setMe] = useState(null);
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate()
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const [storeRes, foodRes] = await Promise.all([
          axios.get(`http://localhost:3000/partner/${id}`, {
            withCredentials: true,
          }),
          axios.get(`http://localhost:3000/food/${id}`, {
            withCredentials: true,
          }),
        ]);
        // console.log(storeRes)
        setStore(storeRes.data.user);
        setFoods(foodRes.data.foods);
      } catch (err) {
        alert("Failed to load store");
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/partner/me",
          { withCredentials: true }
        );
        // console.log(res.data.user);
        setMe(res.data.user)
      } catch (error) {
        console.log(error)
        console.error(error.response?.data || error.message);
      }
    };

    fetchUser();
  }, []);

  const handlerdelete = async(foodId)=>{
    await axios.get(`http://localhost:3000/food/delete/${foodId}`,{ withCredentials: true })
    const updatedFood = foods.filter((food)=>food._id!=foodId)
    setFoods(updatedFood)
  }
   const handlerEdit = (foodId)=>{
    // plz get user in req.userId in backend;
    console.log(foodId)
    navigate(`/update-food/${foodId}`)
   }
  // console.log(me)
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Loading store...
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-black min-h-screen px-2">
      {/* MOBILE FRAME */}
      <div className="w-full max-w-[420px] text-white pb-24">

        {/* STORE HEADER */}
        <div className="sticky top-0 bg-black z-10 px-4 py-3 border-b border-gray-800">
          <h1 className="text-lg font-semibold">{store?.name}</h1>
          <p className="text-xs text-gray-400">
            By {store?.name} • ⭐ 4.4 • Open
          </p>
        </div>

        {/* FOOD LIST */}
        <div className="px-4 mt-4 space-y-4">
          {foods.map((food) => (
            <div
              key={food._id}
              className="flex items-center bg-gray-900 rounded-lg overflow-hidden"
            >
              {/* FOOD IMAGE / VIDEO */}
              <video
                src={food.video}
                muted
                loop
                playsInline
                className="h-24 w-24 object-cover"
              />

              {/* FOOD INFO */}
              <div className="flex-1 px-3">
                <h2 className="text-sm font-semibold">{food.name}</h2>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {food.description}
                </p>
                <p className="mt-1 text-sm font-semibold">
                  ₹90{food.price}
                </p>
              </div>

              {/* ADD BUTTON */}
              {/* ACTION BUTTON */}
              {me?._id === store?._id ? (
                // OWNER (PARTNER)
                <div className="flex flex-col gap-2 pr-3">
                  <button className="px-3 py-1 text-xs rounded-md bg-gray-800 text-white hover:bg-gray-700 transition"
                  onClick={()=>handlerEdit(food._id)}
                  >
                    ✏️ Edit
                  </button>
                  <button className="px-3 py-1 text-xs rounded-md bg-red-700/80 text-white hover:bg-red-700 transition"
                  onClick={()=>handlerdelete(food._id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              ) : (
                // USER OR OTHER PARTNER
                <button className="h-full px-4 bg-green-600 text-sm font-semibold">
                  Add
                </button>
              )}


            </div>
          ))}
        </div>

        {/* ABOUT STORE (SECONDARY) */}
        <div className="px-4 mt-6">
          <h3 className="text-sm font-semibold">About Store</h3>
          <p className="mt-1 text-xs text-gray-400">
            Homemade authentic food by {store?.name}. Fast delivery & hygiene
            maintained.
          </p>
        </div>

      </div>
    </div>
  );
};

export default VisitStore;
``