import React, { useState } from "react";
import UserIcon from "../../assets/ikonkalar/Usder";
import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";
function Kirish_Madal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data) => console.log(data);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };



  const handleCancel = () => {
    setIsModalOpen(false);
    
  };

  return (
    <div>
      <UserIcon onClick={showModal} className="cursor-pointer" />
      <Modal open={isModalOpen} onCancel={handleCancel} footer={false} centered>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div>
              <p className=" text-xl text-center">Kirish va ro'yhadan o'tish</p>
              <label className="block font-semibold text-gray-700 mb-1">
                Telefon
              </label>
              <input
                className="border-2 p-2 rounded-lg border-yellow-400 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 no-spinner"
                type="number"
                placeholder="Telefon raqamingiz"
                {...register("phone")}
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Ismingiz
              </label>
              <input
                className="border-2 p-2 rounded-lg border-yellow-400 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                type="text"
                placeholder="Ismingiz"
                {...register("name", { required: true })}

              />
            </div>

            <Button
              style={{
                backgroundColor: "#facc15",
                color: "black",
                border: "none",
                
                padding: "20px"
              }}
              htmlType="submit"
              onClick={()=>{
                setIsModalOpen(false)
              }}
            >
              Kodni yuborish
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Kirish_Madal;
