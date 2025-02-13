import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu01Icon from "../../assets/ikonkalar/Katalog";
import Search02Icon from "../../assets/ikonkalar/Search";
import UserIcon from "../../assets/ikonkalar/Usder";
import FavouriteIcon from "../../assets/ikonkalar/Heart";
import ShoppingCart02Icon from "../../assets/ikonkalar/Shoping";
import { Button, Modal } from "antd";
import axios from "axios";
import useMyStore from "../../ma-zustand";
import Item from "antd/es/list/Item";

function NavbarCenter() {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState([]);

  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const state = useMyStore();

  const handleOk = () => {
    setModalText("Savatchangiz bo'sh 😊");
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
      for (let i = 1; i <= 5; i++) {
        newSelectedItems[i] = true;
      }
    }
    setSelectedItems(newSelectedItems);
    setSelectAll(!selectAll);
  };

  return (
    <div className=" bg-gray-300 p-3 py-5">
      <div className="container m-auto flex items-center justify-between px-5">
        <div className="flex justify-between gap-5 ">
          <div>
            <Link to={"/"}>
              <img
                className=" cursor-pointer"
                src="https://texnomart.uz/_nuxt/img/texnomart-logo.3b2791c.svg"
                alt=""
              />
            </Link>
          </div>
          <div>
            <button className="  flex items-center gap-2 bg-amber-400 px-5 py-2 rounded font-semibold cursor-pointer ">
              <Menu01Icon />
              Katalog
            </button>
          </div>
        </div>
        <div className="flex items-center border-2 border-amber-500 rounded w-[700px] p-2 relative">
          <Search02Icon className="w-5 h-5 text-gray-500" />
          <input
            className="pl-2 outline-none w-full"
            type="text"
            placeholder="Qidirish..."
          />
        </div>

        {/* ////////////////////////////////////////! nav user */}
        <div className=" flex items-center gap-5">
          <div className="flex flex-col items-center">
            <UserIcon />
            <p>Krish</p>
          </div>
          <div className="flex flex-col items-center relative cursor-pointer">
            <FavouriteIcon />
            <span className="absolute -top-1 -right-2 bg-yellow-500 text-white text-xs font-bold flex items-center justify-center rounded-full w-5 h-5"></span>
            <p>Sevimli</p>
          </div>
          <div
            onClick={() => {
              showModal();
            }}
            className="flex flex-col items-center relative cursor-pointer"
          >
            <ShoppingCart02Icon />
            {/* <span className="absolute -top-1 -right-2 bg-yellow-500 text-white text-xs font-bold flex items-center justify-center rounded-full w-5 h-5">{savatcha.mahsulot.length}</span> */}
            <p>Savatcha </p>
          </div>

          <Modal
            title={` 🛒  Savatchangiz`}
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            width={1300}
          >
            <div>
              {state.savatcha.length > 0 ? (
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
                    {state.savatcha.map((item_madal_savatcha, index) => (
                      <label
                        key={item_madal_savatcha.mahsulot.id}
                        className="flex items-center gap-2 cursor-pointer py-2"
                      >
                        <input
                          type="checkbox"
                          checked={
                            selectedItems[item_madal_savatcha.mahsulot.id] ||
                            false
                          }
                          onChange={() => {
                            setSelectedItems((prev) => ({
                              ...prev,
                              [item_madal_savatcha.mahsulot.id]:
                                !prev[item_madal_savatcha.mahsulot.id],
                            }));
                          }}
                          className="w-5 h-5 border border-gray-400 flex items-center justify-center rounded cursor-pointer"
                        />
                        <div>
                          <img
                            src={item_madal_savatcha.mahsulot.image}
                            alt={item_madal_savatcha.mahsulot.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </div>
                        <p>
                          {item_madal_savatcha.mahsulot.name} ({index + 1})
                        </p>
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
