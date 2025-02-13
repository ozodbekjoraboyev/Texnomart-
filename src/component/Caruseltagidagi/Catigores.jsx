import React, { useEffect, useState } from "react";
import axios from "axios";
import { LeftOutlined, RightOutlined } from "@ant-design/icons"; // Ant Design icons

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://gw.texnomart.uz/api/web/v1/home/special-categories")
      .then((res) => {
        setCategories(res.data.data.data);
        
      })
      .catch((err) => console.error("Error occurred:", err));
  }, []);

  // Move the first element to the end when the right button is clicked
  const nextCategory = () => {
    if (categories.length > 0) {
      setCategories((prev) => [...prev.slice(1), prev[0]]);
    }
  };

  const prevCategory = () => {
    if (categories.length > 0) {
      setCategories((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    }
  };

  return (
    <div className="container mx-auto pt-8 relative flex items-center">
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-200 p-3 rounded-full shadow-lg transition-all duration-300 z-10"
        onClick={prevCategory}
      >
        <LeftOutlined className="text-gray-600 text-xl" />
      </button>

      <div className="w-full overflow-hidden rounded-xl shadow-lg">
        <div className="flex gap-5 transition-transform duration-500">
          {categories.slice(0, 5).map((item) => (
            <div
              key={item.title}
              className="p-5 flex flex-col items-center bg-white rounded-xl shadow-md border border-gray-300 hover:bg-gray-100 transition-all w-1/5 transform hover:scale-105 duration-300"
            >
              <p className="text-center text-base font-semibold mt-3 text-gray-900">
                {item.title}
              </p>
              <img
                className=" w-32 object-contain  duration-300"
                src={item.image}
                alt={item.title}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-200 p-3 rounded-full shadow-lg transition-all duration-300 z-10"
        onClick={nextCategory}
      >
        <RightOutlined className="text-gray-600 text-xl" />
      </button>
    </div>
  );
}

export default Categories;