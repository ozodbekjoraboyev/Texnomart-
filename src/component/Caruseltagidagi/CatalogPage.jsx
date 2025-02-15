import axios from "axios";
import React, { useEffect, useState } from "react";
import useMyStore from "../../ma-zustand";
import { useParams } from "react-router-dom";
import ProduktCard from "../Card/ProduktCard";
import { Button } from "antd";
import Haridlar from "./Haridlar";

function CatalogPage() {
  const state = useMyStore();
  const [cardlar, setCardlar] = useState();
  const [peginetion, setPeginetion] = useState(1);
  const { slug } = useParams();

  useEffect(() => {
    setCardlar();
    axios
      .get(
        `https://gw.texnomart.uz/api/common/v1/search/filters?category_all=${slug}&sort=-order_count&page=${peginetion}`
      )
      .then((res) => {
        setCardlar(res.data.data);
        // console.log(res.data.data);
      });
  }, [slug, peginetion]);

  if (!cardlar) {
    return (
      <div className=" container mx-auto mt-40 flex justify-center">
        <l-tail-chase size="100" speed="1.75" color="black"></l-tail-chase>
      </div>
    );
  }

  return (
    <div className="container  px-10 m-auto flex overflow-y-auto skrol ">
      <Haridlar slug={slug} peginetion={peginetion} />
      <div>
        <div className=" container m-auto grid grid-cols-4 items-center gap-5">
          {cardlar.products.map((item) => {
            return <ProduktCard key={item.id} item={item} />;
          })}
        </div>
        <div className=" m-auto flex justify-center gap-3">
          {Array(cardlar.pagination.total_page)
            .fill(1)
            .map((_, i) => {
              const page = i + 1;
              return (
                <Button
                  className="mt-10 mb-10  "
                  type={peginetion === page ? "primary" : "default"}
                  onClick={() => {
                    setPeginetion(page);
                  }}
                  key={page}
                >
                  {i + 1}
                </Button>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default CatalogPage;
