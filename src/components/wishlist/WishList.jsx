import React, { useRef, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";

const WishList = ({ setOpenWishList }) => {
  const wishlistRef = useRef(null);
  const [visible, setVisible] = useState(true);

  const data = [
    {
      id: 1,
      name: "Product 1",
      price: 10.99,
      quantity: 2,
    },
    {
      id: 2,
      name: "Product 2",
      price: 7.99,
      quantity: 1,
    },
    // Add more cart items as needed
  ];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
        setVisible(false);
        setTimeout(() => {
          setOpenWishList(false);
        }, 300); // Time for the animation to finish before closing the cart completely
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setOpenWishList]);

  const handleQuantityChange = (itemId, value) => {
    const updatedData = data.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + value } : item
    );
    // Update the data with new quantity
    // You can add more logic here, such as preventing negative quantity, etc.
  };

  const totalPrice = data.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 left-0 bg-[#0000004b] w-full h-screen z-10 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={wishlistRef}
        className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm"
      >
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross2
              size={25}
              className="cursor-pointer"
              onClick={() => {
                setVisible(false);
                setTimeout(() => {
                  setOpenWishList(false);
                }, 300); // Time for the animation to finish before closing the cart completely
              }}
            />
          </div>
          <div className={`${styles.normalFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">3 items</h5>
          </div>
          {/* single items */}
          <br />
          <div className="w-full border-t">
            {data &&
              data.map((i, index) => (
                <WishlistSingle
                  key={index}
                  data={i}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
          </div>
        </div>
        <div className="px-5 mb-3">
          <Link to="/checkout">
            <div
              className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
            >
              <h1 className="text-[#fff] text-[18px] font-[600]">
                Checkout ($1000)
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const WishlistSingle = ({ data, onQuantityChange }) => {
  const [value, setValue] = useState(1);
  // const totalPrice = data.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );
  const handleQuantityUpdate = (value) => {
    setValue(value);
    onQuantityChange(data.id, value - data.quantity);
  };
  const totalPrice = data.price * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center justify-between">
        <RxCross2 className="cursor-pointer" />
        <img src="" alt="" className="w-[80px] h-[80px] ml-2" />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            ${totalPrice.toFixed(2)}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to cart"
          />
        </div>
      </div>
    </div>
  );
};
export default WishList;
