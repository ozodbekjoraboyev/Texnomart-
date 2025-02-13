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
    <div> 
      {state.loading ? (
        <div>
          <div className="m-auto flex justify-center items-center absolute top-0 bottom-0 left-0 right-0 ">
            <div className="w-16 h-16 border-4  border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <div className="flex items-center p-4 justify-between container m-auto">
  
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
