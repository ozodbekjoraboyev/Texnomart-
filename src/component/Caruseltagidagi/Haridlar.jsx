import axios from "axios";
import React, { useEffect, useState } from "react";

function Haridlar({ pagination }) {
  const [haridlar, setHaridlar] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [input, setInput] = useState();
  const [inputniTugashi, setInputniTugashi] = useState();

  useEffect(() => {
    axios
      .get(
        `https://gw.texnomart.uz/api/common/v1/search/filters?category_all=smartfony&sort=-order_count&page=${pagination}`
      )
      .then((res) => {
        setHaridlar(res.data.data.filter);
        console.log(res.data.data);
        console.log(res.data.data.price
        );
      })
      .catch((error) => console.error("API xatosi:", error));
  }, [pagination]);

  const toggleExpand = (id) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!haridlar || haridlar.length === 0) {
    return <div>Yuklanmoqda...</div>;
  }

  return (
<>

    <div className="p-6">
      <div className="shadow-lg rounded-lg overflow-y-auto h-[800px] p-4 bg-white skrol">
        <div className="flex gap-4 pb-5">
          <div>
            <p>dan</p>
            <input
              value={input}
              onChange={(e) => setInput(res.data.data.price.
                max_price
                )}
              className="border border-gray-600 py-2 px-4 text-center w-full rounded"
              type="text"
            />
          </div>
          <div>
            <p>gacha</p>
            <input
              value={inputniTugashi}
              onChange={(e) => setInputniTugashi(e.target.value)}
              className="border border-gray-600 px-4 text-center py-2 w-full rounded"
              type="text"
            />
          </div>
        </div>
        {haridlar.map((item) => {
          const isExpanded = selectedId === item.id;
          return (
            <div key={item.id} className="mb-6 px-4 pb-4">
              <p
                className="text-sm cursor-pointer hover:text-blue-500 flex justify-between items-center"
                onClick={() => setSelectedId(isExpanded ? null : item.id)}
              >
                {item.name}
                <span className="text-gray-500">({item.values.length})</span>
              </p>

              {isExpanded && (
                <div className="mt-3 space-y-2">
                  {item.values
                    .slice(
                      0,
                      expandedCategories[item.id] ? item.values.length : 4
                    )
                    .map((filter) => (
                      <div
                        key={filter.id}
                        className="p-3 rounded-lg flex justify-between items-center "
                      >
                        <label
                          htmlFor={`filter-${filter.id}`}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            id={`filter-${filter.id}`}
                            className="w-4 h-4"
                          />
                          {filter.value}
                        </label>
                        <span className="text-gray-500">{filter.count}</span>
                      </div>
                    ))}

                  {item.values.length > 4 && (
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="text-blue-500 hover:text-blue-700 transition mt-2 text-sm"
                    >
                      {expandedCategories[item.id]
                        ? "Yashirish ▲"
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
</>
  );
}

export default Haridlar;
