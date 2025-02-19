import { Button, Checkbox, Collapse } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { Children, useEffect, useState } from "react";

function Haridlar({ filter }) {
  console.log(filter);
  const [qisqartma, setQisqartma] = useState(false);
  return (
    <>
      <Collapse
        items={filter.map((item) => {
          return {
            key: item.id,
            label: (
              <span>
                <span className=" font-bold">{item.name} </span>
                <span className=" text-gray-600">{item.count}</span>
              </span>
            ),
            children: (
              <>
                <div>
                  {qisqartma === false && item.values.length > 10
                    ? item.values.slice(0, 10).map((i) => {
                        return (
                          <div>
                            <div key={i.id}>
                              <div className="pt-4 pb-2 hover:text-blue-700 ">
                                <Checkbox>{i.value}</Checkbox>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : item.values.map((i) => {
                        return (
                          <div>
                            <div key={i.id}>
                              <div className="pt-4 pb-2 hover:text-blue-700 ">
                                <Checkbox>{i.value}</Checkbox>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  <Button
                    onClick={() => {
                      setQisqartma(!qisqartma);
                    }}
                  >
                    {qisqartma ? <UpOutlined /> : <DownOutlined />}
                    {qisqartma ? " yopish" : " Koproq ko'rsatish"}
                  </Button>
                </div>
              </>
            ),
          };
        })}
      />
    </>
  );
}

export default Haridlar;
