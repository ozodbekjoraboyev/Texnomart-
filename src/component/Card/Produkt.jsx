import { Header } from "antd/es/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavouriteIcon from "../../assets/ikonkalar/Heart";
import BalanceScaleIcon from "../../assets/ikonkalar/Tarozi";
import { Button, message, Popconfirm } from "antd";

function AlohidaCard() {
  const [produktalohoda, setProdukt] = useState([]);
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
  console.log(id);

  useEffect(() => {
    axios
      .get(
        `
    https://gw.texnomart.uz/api/web/v1/product/detail?id=${id}`
      )
      .then((res) => {
        console.log(res.data.data.data);
        setProdukt(res.data.data.data);
      });
  }, []);

  if (produktalohoda.length === 0) {
    return <div>loading</div>;
  }

  return (
    <div className=" container m-auto">
      <div>
        <div className="  border-b   border-b-gray-500 pb-5 ">
          <div className="flex justify-between items-center">
            <div className=" font-bold text-2xl">
              <p> {produktalohoda.name}</p>
            </div>
            <div className=" flex items-center gap-2">
              <p> Kod: {produktalohoda.code}</p>
              {contextHolder}
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
      </div>
      <div className=" flex gap-5  opacity-80 text-sm">
        <div className="flex items-center pt-5 gap-2">
          <FavouriteIcon className=" opacity-70" />
          <p>sevilmilar</p>
        </div>
        <div className="flex items-center pt-5 gap-2">
          <BalanceScaleIcon className=" opacity-70" />
          <p>Taqqoslangan</p>
        </div>
      </div>
      <div className=" flex items-center ">
        <div className=" flex items-center pt-16">
          <div>
            <div className="">
              <img
                className="w-[50px] cursor-pointer"
                src={produktalohoda.large_images[0]}
                alt=""
              />
              <img
                className="w-[50px] cursor-pointer"
                src={produktalohoda.large_images[1]}
                alt=""
              />
              <img
                className="w-[50px] cursor-pointer"
                src={produktalohoda.large_images[2]}
                alt=""
              />
              <img
                className="w-[50px] cursor-pointer"
                src={produktalohoda.large_images[3]}
                alt=""
              />
              <img
                className="w-[50px] cursor-pointer"
                src={produktalohoda.large_images[4]}
                alt=""
              />
            </div>
          </div>
          <div>
            <img
              className="w-[350px]"
              src={produktalohoda.large_images[0]}
              alt=""
            />
          </div>
        </div>
        <div>
          <div>
            <p>Rang</p>
            <div className=" flex items-center">
              <img
                className="w-[100px]"
                src={produktalohoda.large_images[0]}
                alt=""
              />{" "}
              <img
                className="w-[80px]"
                src={produktalohoda.large_images[6]}
                alt=""
              />
            </div>
            <div>
              <p>Mahsulot haqida qisqacha</p>
              <div>
                <div>
                  {produktalohoda.main_characters.map((item) => {
                    return (
                      <div className="flex justify-between w-[400px]">
                      <p className="mt-3 mb-2">{item.name}</p>
                      <span className="flex-1 border-b border-dashed opacity-70 text-sm mx-2"></span>
                      <p className="mt-3 mb-2">{item.value}</p>
                    </div>
                    );
                  })}
                  <p className=" text-blue-600 pt-5 cursor-pointer">Barcha xususiyatlar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlohidaCard;
