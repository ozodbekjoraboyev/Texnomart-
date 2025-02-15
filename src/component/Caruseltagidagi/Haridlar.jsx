import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStore from "../../ma-zustand";

function Haridlar({ peginetion }) {
  const state = useMyStore();
  const [selectedId, setSelectedId] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://gw.texnomart.uz/api/common/v1/search/filters?category_all=smartfony&sort=-order_count&page=${peginetion}`
      )
      .then((res) => {
        console.log(res.data.data.filter);
        useMyStore.setState({
          haridlar: res.data.data.filter,
        });
      });
  }, []);

  const toggleExpand = (id) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="p-6">
      <div className=" shadow-lg rounded-lg overflow-y-auto h-[500px] skrol">
        {state.haridlar.map((item) => {
          const isExpanded = expandedCategories[item.id];
          const visibleItems = isExpanded
            ? item.values
            : item.values.slice(0, 4);
          return (
            <div key={item.id} className="mb-6 border-b px-10 pb-4">
              <p
                className=" text-xl  cursor-pointer hover:text-blue-500  items-center"
                onClick={() =>
                  setSelectedId(selectedId === item.id ? null : item.id)
                }
              >
                {item.name}
                <span className="text-gray-500">{item.values.length}</span>
              </p>

              {selectedId === item.id && (
                <div className="mt-3 space-y-2">
                  {visibleItems.map((mahsulot) => (
                    <div
                      key={mahsulot.id}
                      className="bg-gray-100 p-3 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200 flex justify-between items-center"
                    >
                      <p className="text-gray-700 font-medium">
                        {mahsulot.value}
                      </p>
                      <span className="text-gray-500">{mahsulot.count}</span>
                    </div>
                  ))}

                  {item.values.length > 4 && (
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="text-blue-500 hover:text-blue-700 transition mt-2  text-sm"
                    >
                      {isExpanded
                        ? "Kamroq ko‘rsatish ▲"
                        : "Ko‘proq ko‘rsatish ▼"}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Haridlar;
