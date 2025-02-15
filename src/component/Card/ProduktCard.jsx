import { Button, message } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import ShoppingCart02Icon from "../../assets/ikonkalar/Shoping";
import useMyStore from "../../ma-zustand";

function ProduktCard({ item }) {
  const [messageApi, contextHolder] = message.useMessage();
  const state = useMyStore();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Savatchaga muvofqyatli qoshildi 😊",
      duration: 2,
    });
  };

  function onAdd(item) {
    const bormi = state.savatcha.find(
      (item_savat) => item_savat.mahsulot.id === item.id
    );

    if (bormi) {
      useMyStore.setState({
        savatcha: state.savatcha.map((savat) =>
          savat.mahsulot.id === item.id
            ? { ...savat, concat: savat.concat + 1 }
            : savat
        ),
      });
    } else {
      useMyStore.setState({
        savatcha: [...state.savatcha, { concat: 1, mahsulot: item }],
      });
    }
  }

  return (
    <div
      key={item.id}
      className="bg-white shadow-md rounded-2xl p-4  items-center transition transform hover:scale-105 hover:shadow-lg"
    >
      <Link to={`/product/${item.id}`} onClick={()=>{
        window.scrollTo({
          behavior:"smooth",
          top:0
        })
      }}>
        <img
          className="w-52 h-52 object-contain rounded-lg"
          src={item.image}
          alt="Product"
        />
      </Link>

      <p className="text-lg font-semibold mt-3 text-center text-gray-900">
        {item.name.length > 19 ? item.name.slice(0, 19) + "..." : item.name}
      </p>

      <div className="flex justify-between items-center w-full mt-3">
        <p className="text-black  bg-gray-300 mt-2  text-[13px] px-3 py-2 rounded-xl">
          {item.axiom_monthly_price} so‘m
        </p>
        {item.discount_value && (
          <p className="line-through opacity-65 text-black">
            {item.discount_value.toLocaleString("ru-RU")} so‘m
          </p>
        )}
      </div>
      {contextHolder}
      <div className="flex justify-between mt-7">
        <div>
          <p className="font-bold">
            {item.sale_price.toLocaleString("ru-RU")} So'm
          </p>
        </div>
        <Button
          onClick={() => {
            success();
            onAdd(item);
          }}
          color="yellow"
        >
          <ShoppingCart02Icon />
        </Button>
      </div>
    </div>
  );
}

export default ProduktCard;
