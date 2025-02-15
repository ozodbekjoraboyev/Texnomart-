import React, { useState, useEffect } from "react";
import axios from "axios";
import ArrowLeft04Icon from "../../assets/ikonkalar/Left";
import ArrowRight02Icon from "../../assets/ikonkalar/reght";

function Carusel() {
  const [imglar, setImglar] = useState([]);
  const [carusel, setCarusel] = useState(0);

  useEffect(() => {
    axios
      .get("https://mobile.olcha.uz/api/v2/extra/sliders")
      .then((res) => {
        const sliders = res.data.data.sliders.map((item) => item.image_oz);
        setImglar(sliders);
      })
      .catch((err) => console.error("Xatolik yuz berdi:", err));
  }, []);

  function next() {
    setCarusel((prev) => (prev + 1) % imglar.length);
  }

  function prev() {
    setCarusel((prev) => (prev - 1 + imglar.length) % imglar.length);
  }

  if (!imglar.length) {
    return <div className="text-center py-10 text-gray-500">Yuklanmoqda...</div>;
  }

  return (
    <div className="flex flex-col items-center w-full ">
      <div className="relative container w-full px-10  m-auto overflow-hidden">
        {/* Chap tugma */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-14 -translate-y-1/2 z-10 border border-gray-300 shadow-md rounded-full p-2 bg-white hover:bg-gray-100 active:scale-90 transition-transform"
        >
          <ArrowLeft04Icon className="w-6 h-6" />
        </button>

        <img
          className="w-[1500px] h-[350px] object-cover rounded-lg shadow-lg transition-transform duration-700"
          src={imglar[carusel]}
          alt="Carusel rasmi"
        />

        <button
          onClick={next}
          className="absolute top-1/2 right-14 -translate-y-1/2 z-10 border border-gray-300 shadow-md rounded-full p-2 bg-white hover:bg-gray-100 active:scale-90 transition-transform"
        >
          <ArrowRight02Icon className="w-6 h-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {imglar.map((_, index) => (
            <button
              key={index}
              onClick={() => setCarusel(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                carusel === index ? "bg-blue-500 w-7  scale-110" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carusel;

