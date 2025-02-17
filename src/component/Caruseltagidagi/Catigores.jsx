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
      <div className="container mx-auto px-5  pt-8 relative flex items-center justify-center">
        <button
          className="absolute left-3 ml-10 md:left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-200 p-3 rounded-full shadow-lg transition-all duration-300 z-10"
          onClick={prevCategory}
        >
          <LeftOutlined className="text-gray-600 text-xl" />
        </button>

        <div className="w-full  overflow-hidden rounded-xl shadow-lg">
          <div className="flex gap-4 md:gap-5 justify-center items-center transition-transform duration-500">
            {categories.slice(0, 5).map((item) => (
              <div
                key={item.title}
                className="p-4 md:p-5 flex flex-col items-center bg-white rounded-xl shadow-md border border-gray-300 hover:bg-gray-100 transition-all w-1/3 sm:w-1/4 md:w-1/5 transform hover:scale-105 duration-300"
              >
                <img
                  className="w-24  catigorya  md:w-32 object-contain duration-300"
                  src={item.image}
                  alt={item.title}
                />
                <p className="text-center text-sm md:text-base font-semibold mt-3 text-gray-900">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* O'ngga o'tkazish tugmasi */}
        <button
          className="absolute right-3 mr-10 md:right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-200 p-3 rounded-full shadow-lg transition-all duration-300 z-10"
          onClick={nextCategory}
        >
          <RightOutlined className="text-gray-600 text-xl" />
        </button>
      </div>
    );
  }

  export default Categories;
