import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EditFood = () => {
    const { foodId } = useParams();
    const navigate = useNavigate();

    const [food, setFood] = useState({
        name: "",
        price: "",
        description: ""
    });

    //  Fetch old data
    useEffect(() => {
        const fetchFood = async () => {
            const res = await axios.get(`http://localhost:3000/food/update/${foodId}`,{ withCredentials: true });
            setFood(res.data.food);
        };
        fetchFood();
    }, [foodId]);

    //  Input change
    const handleChange = (e) => {
        setFood({
            ...food,
            [e.target.name]: e.target.value
        });
    };
    //  Update food
    const handleUpdate = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3000/food/update-food/${foodId}`, food,{ withCredentials: true });
        navigate("/profile"); // or wherever you want
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-lg font-bold mb-4">Edit Food</h2>

            <form onSubmit={handleUpdate} className="flex flex-col gap-3">
                <input
                    name="name"
                    value={food.name}
                    onChange={handleChange}
                    placeholder="Food Name"
                    className="border p-2"
                />

                {/* <input
                    name="price"
                    value={food.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="border p-2"
                /> */}

                <textarea
                    name="description"
                    value={food.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border p-2"
                />

                <button className="bg-green-600 text-white p-2 rounded">
                    Update Food
                </button>
            </form>
        </div>
    );
};

export default EditFood;

