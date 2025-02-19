import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu01Icon from "../../assets/ikonkalar/Katalog";
import Search02Icon from "../../assets/ikonkalar/Search";

import FavouriteIcon from "../../assets/ikonkalar/Heart";
import ShoppingCart02Icon from "../../assets/ikonkalar/Shoping";
import { Modal } from "antd";
import useMyStore from "../../ma-zustand";
import Kirish_Madal from "./Kirish_Madal";

function NavbarCenter() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [input, setInput] = useState("");
  const state = useMyStore();
  const cartCount = state.savatcha.length;

  // const tuduList = tudu.filter((filter) => {
  //   return filter.todo.toUpperCase().includes(input.toUpperCase());
  // });

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const toggleSelectAll = () => {
    const newSelectedItems = {};
    if (!selectAll) {
      state.savatcha.forEach((item) => {
        newSelectedItems[item.mahsulot.id] = true;
      });
    }
    setSelectedItems(newSelectedItems);
    setSelectAll(!selectAll);
  };

  const countSelectedItems = () => {
    return Object.values(selectedItems).filter(Boolean).length;
  };

  return (
    <div className="bg-gray-300 px-4 py-5  ">
      <div className="container m-auto flex items-center justify-between px-5">
        <div className="flex justify-between gap-5">
          <Link to={"/"}>
            <img
              className="cursor-pointer"
              src="https://texnomart.uz/_nuxt/img/texnomart-logo.3b2791c.svg"
              alt="logo"
            />
          </Link>
          <button className="flex items-center gap-2 bg-amber-400 px-5 py-2 rounded font-semibold cursor-pointer">
            <Menu01Icon /> Katalog
          </button>
        </div>

        <div className="flex  items-center border-2 border-amber-500 rounded w-[700px] p-2 relative">
          <Search02Icon className="w-5 h-5 text-gray-500" />
          <input
            value={input}
            onChange={(e) => {
              setInput(e.currentTarget.value);
            }}
            className="pl-2 outline-none w-full"
            type="text"
            placeholder="Qidirish..."
          />
        </div>

        <div className="flex items-center gap-5">
          <div className="flex flex-col items-center">
            <Kirish_Madal />
            <p>Krish</p>
          </div>
          <div className="flex flex-col items-center relative cursor-pointer">
            <FavouriteIcon />
            <p>Sevimli</p>
          </div>
          <div
            onClick={showModal}
            className="flex flex-col items-center relative cursor-pointer"
          >
            <ShoppingCart02Icon />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-yellow-500 text-white text-xs font-bold flex items-center justify-center rounded-full w-5 h-5">
                {cartCount}
              </span>
            )}
            <p>Savatcha</p>
          </div>

          <Modal
            title={`🛒 Savatchangiz (${countSelectedItems()} ta tanlandi)`}
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            width={1300}
          >
            <div>
              {cartCount > 0 ? (
                <div>
                  <div className="flex justify-between border-b pb-5 pt-10">
                    <label className="text-xl flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={toggleSelectAll}
                        className="w-5 h-5 border border-gray-400 flex items-center justify-center rounded cursor-pointer"
                      />
                      <p>Hammasini tanlash</p>
                    </label>
                    <button
                      onClick={() => {
                        setSelectedItems({});
                        setSelectAll(false);
                      }}
                      className="text-xl text-yellow-500 cursor-pointer"
                    >
                      Tanlanganlarni o'chirish
                    </button>
                  </div>

                  <div>
                    {state.savatcha.map((item) => (
                      <label
                        key={item.mahsulot.id}
                        className="flex items-center gap-2 cursor-pointer py-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedItems[item.mahsulot.id] || false}
                          onChange={() => {
                            setSelectedItems((prev) => ({
                              ...prev,
                              [item.mahsulot.id]: !prev[item.mahsulot.id],
                            }));
                          }}
                          className="w-5 h-5 border border-gray-400 flex items-center justify-center rounded cursor-pointer"
                        />
                        <img
                          src={item.mahsulot.image}
                          alt={item.mahsulot.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <p>{item.mahsulot.name}</p>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <p>Savatchangiz bo‘sh</p>
              )}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default NavbarCenter;
