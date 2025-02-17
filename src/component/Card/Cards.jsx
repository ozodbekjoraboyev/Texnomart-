import axios from "axios";
import React, { useEffect } from "react";
import useMyStore from "../../ma-zustand";
import { Link, useParams } from "react-router-dom";
import { Button, message } from "antd";

import ProduktCard from "./ProduktCard";
function Cards() {
  const state = useMyStore();

  useEffect(() => {
    axios
      .get(
        "https://gw.texnomart.uz/api/web/v1/home/special-products?type=hit_products"
      )
      .then((res) => {
        useMyStore.setState({
          cards: res.data.data.data,
        });
      });
  }, []);

  return (
    <div className="container mx-auto px-5  py-10 ">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      
        {state.cards.map((item) => (
          <ProduktCard key={item.id} item={item} />
        
        ))}
      
      </div>
    </div>
  );
}

export default Cards;
