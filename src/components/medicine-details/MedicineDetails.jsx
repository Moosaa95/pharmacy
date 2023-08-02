import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const MedicineDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [select, setSelect] = useState(0);
  const [click, setClick] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%] h-screen`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data?.image_Url[select].url}
                  alt=""
                  className={`w-[80%] transition-opacity duration-500 ${
                    click ? "opacity-100" : "opacity-70"
                  }`}
                />
                <div className="w-full flex gap-5 pt-5">
                  <div
                    className={`${
                      select === 0 ? "border" : ""
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt="image"
                      className="h-[200px] transition-opacity duration-500"
                      onClick={() => {
                        setClick(true);
                        setTimeout(() => {
                          setSelect(0);
                          setClick(false);
                        }, 500);
                      }}
                    />
                  </div>
                  <div
                    className={`${
                      select === 0 ? "border" : ""
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt="image"
                      className="h-[200px] transition-opacity duration-500"
                      onClick={() => {
                        setClick(true);
                        setTimeout(() => {
                          setSelect(0);
                          setClick(false);
                        }, 500);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%]">
                <div className="w-full 800px:w-[50%] pt-5">
                  <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                  <p>{data.description}</p>
                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      ${data.discount_price}
                    </h4>
                    {data.price ? <h3 className={`${styles.price}`}>${data.price}</h3> : null}
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MedicineDetails;
