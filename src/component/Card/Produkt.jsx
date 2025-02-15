import { Header } from "antd/es/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavouriteIcon from "../../assets/ikonkalar/Heart";
import BalanceScaleIcon from "../../assets/ikonkalar/Tarozi";
import { Button, message, Popconfirm } from "antd";
import CardlarniHususyatlari from "./CardlarniHususyatlari";
import { tailChase } from "ldrs";



function AlohidaCard() {
  tailChase.register();
  const [produktalohoda, setProdukt] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
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
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Nusha olindi",
      duration: 2,
    });
  };

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://gw.texnomart.uz/api/web/v1/product/detail?id=${id}`)
      .then((res) => {
        setProdukt(res.data.data.data || {});
      })
      .catch((err) => console.error("API xatosi:", err));
  }, [id]);

  if (!produktalohoda.name) {
    return (
      <div className=" container mx-auto  flex justify-center">
        <l-tail-chase size="100" speed="1.75" color="black"></l-tail-chase>
      </div>
    );
  }

  return (
    <div className="container m-auto">
      <div className="border-b border-b-gray-500 pb-5">
        <div className="flex justify-between items-center">
          <div className="font-bold text-2xl">
            <p>{produktalohoda.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <p>Kod: {produktalohoda.code}</p>
            {contextHolder}{" "}
            <Button size="small" onClick={success}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADVSURBVHgB5VLLDYJAFHy7EM6UQAl2IHagHWgF7AEIN68khEQ7wArEDrQDOlA74E4AhwTiQnaNCRcT5/I2b97M7I9oJti0IYSwLcu6Y2mrBG3bFijHJEkypUGHKIpc0qCu6zVjzEPdpGmamwMRBMECxB4JNkilGHyBZIFZ4pxv0XobgDxD/EC9kR6e7/tPzJTDEU2JdAzD2MVxfNWpkbxE8uhuOM3Evxr0r9V9ttErfI3+F2ZTg7JpGi8MQ/eD1kH6SW6Y0rZW2NYBS60BZi5VVeX0U3gBZ15L5Fb+17cAAAAASUVORK5CYII="
                alt=""
              />
            </Button>
            <div className="  px-3 rounded ">
              <Popconfirm
                title="Title"
                description="Mavjudligi aniqlashtirilmoqda"
                open={open}
                onConfirm={handleOk}
                okButtonProps={{ loading: confirmLoading }}
                onCancel={handleCancel}
              >
                <Button
                  onMouseEnter={showPopconfirm}
                  onMouseLeave={() => setOpen(false)}
                >
                  Open Popconfirm with async logic
                </Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-5 opacity-80 text-sm pt-5">
        <div className="flex items-center gap-2">
          <FavouriteIcon className="opacity-70" />
          <p>Sevimlilar</p>
        </div>
        <div className="flex items-center gap-2">
          <BalanceScaleIcon className="opacity-70" />
          <p>Taqqoslangan</p>
        </div>
      </div>

      <div className="grid grid-cols-3 items-center gap-10">
        <div className="m-auto flex items-center pt-16">
          <div className="overflow-y-auto gap-2 flex flex-col skrol h-[500px]">
            {produktalohoda.small_images?.map((rasm, idx) => (
              <img key={idx} className="w-20 h-40" src={rasm} alt="" />
            ))}
          </div>
          <div>
            <img
              className="w-[350px]"
              src={produktalohoda.large_images?.[0]}
              alt=""
            />
          </div>
        </div>

        <div>
          <p>Rang</p>
          <div className="flex items-center">
            {produktalohoda.offers_by_image?.map((item, idx) => (
              <img key={idx} className="w-19" src={item.image} alt="" />
            ))}
          </div>

          <p>Mahsulot haqida qisqacha</p>
          <div>
            {produktalohoda.main_characters?.map((item, idx) => (
              <div key={idx} className="flex justify-between w-[400px]">
                <p className="mt-3 mb-2">{item.name}</p>
                <span className="flex-1 border-b border-dashed opacity-70 text-sm mx-2"></span>
                <p className="mt-3 mb-2">{item.value}</p>
              </div>
            ))}
            <p className="text-blue-600 pt-5 cursor-pointer">
              Barcha xususiyatlar
            </p>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-10 rounded shadow-amber-600 bg-gray-50">
          <p className="font-semibold text-xl">
            {produktalohoda.installment_price?.toLocaleString("ru-RU")} So'm
          </p>

          <div className="flex items-center bg-gray-300 py-5 px-3 gap-3 rounded">
            <p>{produktalohoda.minimal_loan_price?.description.slice(0, 16)}</p>
            <button className="bg-blue-600 text-white p-2 rounded-md">
              {produktalohoda.minimal_loan_price?.min_monthly_price.toLocaleString(
                "ru-RU"
              )}{" "}
              So'm
            </button>
            <p>{produktalohoda.minimal_loan_price?.month_number} /oy</p>
          </div>
          <div>
            <p>{produktalohoda.minimal_loan_price.description}</p>
            <div className="flex overflow-x-auto gap-2 scrollbar">
              <img
                className="w-17"
                src="https://mini-io-api.texnomart.uz/order/order/loan-system/1/95d6e4b5-cc9e-4cb1-b7be-9af419c5d094.png"
                alt=""
              />
              <img
                className="w-17"
                src="https://mini-io-api.texnomart.uz/order/order/loan-system/8/9451a313-9349-4cce-bdf7-50eb92b28db2.png"
                alt=""
              />
              <img
                className="w-17"
                src="https://mini-io-api.texnomart.uz/order/order/loan-system/11/6c0315e8-3c60-4e6b-b470-6664bececd3f.png"
                alt=""
              />
              <img
                className="w-17"
                src="https://mini-io-api.texnomart.uz/order/order/loan-system/2/63fccc36-6fef-40c6-8b22-8c9d95fe4e3b.png"
                alt=""
              />
              <img
                className="w-17"
                src="https://mini-io-api.texnomart.uz/order/order/loan-system/12/89946328-85c8-4fbb-9d9d-6e00511d3b23.png"
                alt=""
              />
              <img
                className="w-17"
                src="https://mini-io-api.texnomart.uz/order/order/loan-system/9/ce619468-77a8-4cd0-b34f-be34a3342d98.png"
                alt=""
              />
              <img
                className="w-17"
                src="https://mini-io-api.texnomart.uz/order/order/loan-system/14/7fa17d02-916a-4b3f-bc93-a58f93dc9bbb.png"
                alt=""
              />
            </div>
          </div>

          <div className="flex items-center gap-5 border-b pb-5">
            <p
              onClick={() => {}}
              className="bg-amber-500 rounded-md w-full text-center p-3"
            >
              Savatcha
            </p>
            <p className="bg-gray-400 rounded-md w-full p-3 text-center">
              Birgina klik orqali harid
            </p>
          </div>

          <div className="mt-4 flex items-center gap-3 border-gray-600 border rounded-md px-3 py-3">
            <img
              src="https://texnomart.uz/_nuxt/img/store-small.4aacca3.svg"
              alt=""
            />
            <div>
              <p>Do'kondan olib ketish bepul</p>
              <p className="text-blue-700">35 ta dokon mavjud</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 bg-gray-100 justify-center rounded-md px-3 py-3">
            <img
              src="https://texnomart.uz/_nuxt/img/guarante.f5367a6.svg"
              alt=""
            />
            <p>{produktalohoda.guarantee}</p>
          </div>
        </div>
      </div>

      <CardlarniHususyatlari id={id} />
    </div>
  );
}

export default AlohidaCard;
