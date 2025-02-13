import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProduktCard from "./ProduktCard";
import { useParams } from "react-router-dom";

function CardlarniHususyatlari() {
  const [accsesuarlar, setAccsesuarlar] = useState([]);
  const [activIndex, setActivIndex] = useState(0);
  const { id } = useParams(); // Faqat URL'dan id olinadi

  useEffect(() => {
    axios
      .get(`https://gw.texnomart.uz/api/web/v1/product/accessories?id=${id}`)
      .then((res) => {
        if (res.data.data.data.length > 0) {
          setAccsesuarlar(res.data.data.data);
        }
      })
      .catch((err) => console.error("API xatosi:", err));
  }, [id]);

  return (
    <div>
      <p className="text-3xl pt-5">Aksessuarlar</p>

      {accsesuarlar.length === 0 ? (
        <p>Yuklanmoqda yoki aksessuarlar mavjud emas.</p>
      ) : (
        <>
          <div className="flex gap-4">
            {accsesuarlar.map((acc, index) => {
              return (
                <div key={acc.index}>
                  <Button
                    onClick={() => setActivIndex(index)}
                    type={activIndex === index ? "primary" : "default"}
                  >
                    {acc.name}
                  </Button>
                </div>
              );
            })}
          </div>

          {accsesuarlar[activIndex] && accsesuarlar[activIndex].products ? (
            <div className="grid grid-cols-5 mt-10 gap-5">
              {accsesuarlar[activIndex].products.map((produkt) => (
                <ProduktCard key={produkt.id} item={produkt} />
              ))}
            </div>
          ) : (
            <p>Mahsulotlar mavjud emas.</p>
          )}
        </>
      )}
    </div>
  );
}

export default CardlarniHususyatlari;
