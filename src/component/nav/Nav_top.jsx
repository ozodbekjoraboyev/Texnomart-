import React, { useEffect } from "react";
import useMyStore from "../../ma-zustand";
import axios from "axios";
import { Link } from "react-router-dom";

function Nav_top() {
  const state = useMyStore();
 
  useEffect(() => {
    axios
      .get("https://gw.texnomart.uz/api/web/v1/header/top-categories")
      .then((res) => {
        useMyStore.setState({
          loading: false,
          produkts: res.data.data.data,
        });
      });
  }, []);
  return (
    <div className="bg-gray-300 "> 
      {state.loading ? (
        <div>
         </div>
      ) : (
        <div className="flex items-center px-10 pb-5 pt-5 justify-between container m-auto">
          {state.produkts.map((item, index) => {
            return (
              <Link to={`/categories/${item.slug}`} key={index}>
                <div>
                  <p>{item.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Nav_top;
