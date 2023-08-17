import React, { useRef, useEffect, useState } from "react";
import { RxCross1, RxCross2 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";

const WishList = ({ setOpenWishList }) => {
  const wishlistRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const {wishlist} = useSelector((state) => state.wishlist)
  const dispatch = useDispatch()

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = {...data, qty:1};
    dispatch(addTocart(newData));
    setOpenWishList(false);
  }

  

  // useEffect(() => {
  //   const handleOutsideClick = (event) => {
  //     if (wishlistRef.current && !wishlistRef.current.contains(event.target)) {
  //       setVisible(false);
  //       setTimeout(() => {
  //         setOpenWishList(false);
  //       }, 300); // Time for the animation to finish before closing the cart completely
  //     }
  //   };

  //   document.addEventListener("mousedown", handleOutsideClick);

  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, [setOpenWishList]);

  // const handleQuantityChange = (itemId, value) => {
  //   const updatedData = data.map((item) =>
  //     item.id === itemId ? { ...item, quantity: item.quantity + value } : item
  //   );
  //   // Update the data with new quantity
  //   // You can add more logic here, such as preventing negative quantity, etc.
  // };

  // const totalPrice = data.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );

//   return (
//     <div
//       className={`fixed top-0 left-0 bg-[#0000004b] w-full h-screen z-10 transition-opacity duration-300 ${
//         visible ? "opacity-100" : "opacity-0 pointer-events-none"
//       }`}
//     >
//       <div
//         ref={wishlistRef}
//         className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm"
//       >
//         <div>
//           <div className="flex w-full justify-end pt-5 pr-5">
//             <RxCross2
//               size={25}
//               className="cursor-pointer"
//               onClick={() => {
//                 setVisible(false);
//                 setTimeout(() => {
//                   setOpenWishList(false);
//                 }, 300); 
//               }}
//             />
//           </div>
//           <div className={`${styles.normalFlex} p-4`}>
//             <AiOutlineHeart size={25} />
//             <h5 className="pl-2 text-[20px] font-[500]">{wishlist && wishlist.length} items</h5>
//           </div>
          
//           <br />
//           <div className="w-full border-t">
//             {data &&
//               data.map((i, index) => (
//                 <WishlistSingle
//                   key={index}
//                   data={i}
//                   onQuantityChange={handleQuantityChange}
//                 />
//               ))}
//           </div>
//         </div>
//         <div className="px-5 mb-3">
//           <Link to="/checkout">
//             <div
//               className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
//             >
//               <h1 className="text-[#fff] text-[18px] font-[600]">
//                 Checkout ($1000)
//               </h1>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// const WishlistSingle = ({ data, onQuantityChange }) => {
//   const [value, setValue] = useState(1);
 
//   const handleQuantityUpdate = (value) => {
//     setValue(value);
//     onQuantityChange(data.id, value - data.quantity);
//   };
//   const totalPrice = data.price * value;

//   return (
//     <div className="border-b p-4">
//       <div className="w-full flex items-center justify-between">
//         <RxCross2 className="cursor-pointer" />
//         <img src="" alt="" className="w-[80px] h-[80px] ml-2" />

//         <div className="pl-[5px]">
//           <h1>{data.name}</h1>
//           <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
//             ${totalPrice.toFixed(2)}
//           </h4>
//         </div>
//         <div>
//           <BsCartPlus
//             size={20}
//             className="cursor-pointer"
//             title="Add to cart"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
return (
  <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
    <div className="fixed top-0 right-0 h-full w-[80%] overflow-y-scroll 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm">
      {wishlist && wishlist.length === 0 ? (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenWishList(false)}
            />
          </div>
          <h5>Wishlist Items is empty!</h5>
        </div>
      ) : (
        <>
          <div>
            <div className="flex w-full justify-end pt-5 pr-5">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishList(false)}
              />
            </div>
            {/* Item length */}
            <div className={`${styles.normalFlex} p-4`}>
              <AiOutlineHeart size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {wishlist && wishlist.length} items
              </h5>
            </div>

            {/* cart Single Items */}
            <br />
            <div className="w-full border-t">
              {wishlist &&
                wishlist.map((i, index) => (
                  <CartSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler} />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  </div>
);
};

const CartSingle = ({ data,removeFromWishlistHandler,addToCartHandler }) => {
const [value, setValue] = useState(1);
const totalPrice = data.discount_price * value;

return (
  <div className="border-b p-4">
    <div className="w-full 800px:flex items-center">
      <RxCross1 className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
      onClick={() => removeFromWishlistHandler(data)}
      />
      <img
        src={`${data?.image}`}
        alt=""
        className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
      />

      <div className="pl-[5px]">
        <h1>{data.name}</h1>
        <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
          US${totalPrice}
        </h4>
      </div>
      <div>
        <BsCartPlus size={20} className="cursor-pointer" tile="Add to cart"
         onClick={() => addToCartHandler(data)}
        />
      </div>
    </div>
  </div>
);
};
export default WishList;
