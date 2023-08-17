// import React, { useState } from "react";
// import { RxCross1 } from "react-icons/rx";
// import styles from "../../../styles/styles";
// import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from "react-icons/ai";

// const MedicineDetailCard = ({ data, setOpen }) => {
//   const [count, setCount] = useState(1);
//   const [click, setClick] = useState(false);
//   const [select, setSelect] = useState(false);

//   const handleMessageSubmit = () => {};

//   const handleDecrementCount = () => {
//     if (count > 1) {
//       setCount(count - 1)
//     }
//   }

//   const handleIncrementCount = () => {
//     setCount(count + 1)
//   }
//   return (
//     <div className="bg-[#fff]">
//       {data ? (
//         <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
//           <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
//             <RxCross1
//               size={30}
//               className="absolute right-3 top-3 z-50"
//               onClick={() => setOpen(false)}
//             />
//             <div className="block w-full 800px:flex">
//               <div className="w-full 800px:w-[50%]">
//                 <img src={data.image_Url[0].url} alt="" />
//                 <div className="flex">
//                   <img
//                     src={data.shop.shop_avatar.url}
//                     alt=""
//                     className="w-[50px] h-[50px] rounded-full mr-2"
//                   />
//                   <div>
//                     <h3 className={`${styles.shop_name}`}>{data.shop_name}</h3>
//                     <h5 className="pb-3 text-[15px]">
//                       ({data.shop.ratings}) ratings
//                     </h5>
//                   </div>
//                 </div>
//                 <div
//                   className={`${styles.button} bg-[#000] mt-4 rounded h-11`}
//                   onClick={handleMessageSubmit}
//                 >
//                   <span className="text-[#fff] flex items-center">
//                     Send Message <AiOutlineMessage className="ml-1" />
//                   </span>
//                 </div>
//                 <h5 className="text-[16px] text-red-400 mt-5">
//                   ({data.total_sell}) Sold out
//                 </h5>
//               </div>

//               <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
//                 <h1 className={`${styles.productTitle}`}>{data.name}</h1>
//                 <p>{data.description}</p>
//                 <div className="flex pt-3">
//                   <h4 className={`${styles.productDiscountPrice}`}>
//                     {data.discount_price}
//                   </h4>
//                   <h3 className={`${styles.price}`}>
//                     {data.price ? data.price + "$" : null}
//                   </h3>
//                 </div>
//                 <div className="flex items-center mt-12 justify-between pr-3">
//                   <div>
//                     <button className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out" onClick={handleDecrementCount}>
//                       -
//                     </button>
//                     <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
//                       {count}
//                     </span>
//                     <button className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out" onClick={handleIncrementCount}>
//                       +
//                     </button>
//                   </div>
//                   <div>
//                     {
//                       click ? (
//                         <AiFillHeart
//                           size={30}
//                           className="cursor-pointer"
//                           onClick={() => setClick(!click)}
//                           color={click ? "red" : "#333"}
//                           title="Remove from wishlist"
//                         />
//                       ) : (
//                         <AiOutlineHeart
//                           size={30}
//                           className="cursor-pointer"
//                           onClick={() => setClick(!click)}
//                           color={click ? "red" : "#333"}
//                           title="Add to wishlist"
//                         />
//                       )}
//                   </div>
//                 </div>
//                 <div
//                   className={`${styles.button} mt-6 rounded h-11 flex items-center`}
//                   onClick={handleMessageSubmit}
//                 >
//                   <span className="text-[#fff] flex items-center">
//                     Add to Cart <AiOutlineShoppingCart className="ml-1" />
//                   </span>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default MedicineDetailCard;

import React, { useContext, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import AuthContext from "../../../context/AuthContext";

const MedicineDetailCard = ({ data, setOpen }) => {
  // State for quantity count, wishlist, and cart
  const [count, setCount] = useState(1);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [click, setClick] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const { savePrescription, user } = useContext(AuthContext);

  // console.log('innder wish', data);
  const handleMessageSubmit = () => {
    // Handle message submission
  };

  const handlePrescriptionUpload = (e) => {
    const file = e.target.files[0];
    setPrescriptionFile(file);
  };

  const handleDecrementCount = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  const handleIncrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const addToCartHandler = async (id) => {
    if (!prescriptionFile) {
      toast.error("Please upload a prescription before adding to cart.");
      return;
    }

    console.log(prescriptionFile, "pres", user.user_id);

    const formData = new FormData();

    formData.append("drug_id", id);
    formData.append("user_id", user.user_id);
    formData.append("prescription_image", prescriptionFile);

    const savePres = await savePrescription(formData);

    console.log(savePres, "prescription");

    if (savePres) {
      toast.success(savePres.message);

      const isItemExists = cart && cart.find((i) => i.id === id);
      if (isItemExists) {
        toast.error("item already exist");
      } else {
        if (data.stock < count) {
          toast.error("Medicine stock limited!");
        } else {
          const cartData = {
            ...data,
            qty: count,
            // prescription: prescriptionFile,
          };
          dispatch(addTocart(cartData));
          toast.success("Item added to cart successfully!");
        }
      }
    } else {
      toast.error("prescription not saved please try again");
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i.id === data.id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <div className="fixed top-0 left-0 z-40 w-full h-screen bg-[#00000030] flex items-center justify-center">
      {data && (
        <div className="w-[90%] md:w-[60%] h-[90vh] md:h-[75vh] bg-white rounded-md shadow-sm p-4 overflow-y-scroll">
          <RxCross1
            size={30}
            className="absolute top-3 right-3 z-50 cursor-pointer"
            onClick={() => setOpen(false)}
          />

          <div className="flex flex-col md:flex-row">
            {/* Left Side - Product Image and Shop Details */}
            <div className="w-full md:w-[50%] md:pr-5">
              <img
                src={data.images.Paracetamol_one}
                alt={data.name}
                className="w-full h-48 md:h-auto object-cover rounded-md mb-4"
              />

              <div className="flex items-start mb-4">
                <img
                  src={data.pharmacy_profile__business_image}
                  alt={data.business_name}
                  className="w-12 h-12 rounded-full mr-2"
                />
                <div>
                  <h3 className="text-base md:text-lg font-semibold">
                    {data.pharmacy__business_name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600">
                    ({data.ratings}) ratings
                  </p>
                </div>
              </div>

              {/* <div
                className={`${styles.button} bg-[#000] mt-4 rounded h-11`}
                onClick={handleMessageSubmit}
              >
                <span className="text-white flex items-center">
                  Send Message <AiOutlineMessage className="ml-1" />
                </span>
              </div> */}

              <h5 className="text-sm text-red-400 mt-5">
                ({data.sold_out}) Sold out
              </h5>
            </div>

            {/* Right Side - Product Details */}
            <div className="w-full md:w-[50%] md:pl-5 md:pt-5 md:pb-2">
              <h1 className="text-lg md:text-2xl font-semibold">{data.name}</h1>
              <p className="text-sm text-gray-600 mt-2">{data.description}</p>

              <div className="flex items-center mt-4">
                <h4 className="text-lg md:text-xl font-semibold text-red-400">
                  ${data.discount_price}
                </h4>
                <h3 className="text-base md:text-lg ml-2">
                  {data.original_price ? `$${data.original_price}` : null}
                </h3>
              </div>

              <div className="flex items-center mt-6 justify-between pr-3">
                <div className="flex items-center">
                  <button
                    className="bg-green-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={handleDecrementCount}
                  >
                    -
                  </button>
                  <span className="bg-gray-200 text-gray-800 font-medium px-4 py-2">
                    {count}
                  </span>
                  <button
                    className="bg-green-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={handleIncrementCount}
                  >
                    +
                  </button>
                </div>

                <div>
                  {click ? (
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => removeFromWishlistHandler(data)}
                      color="red"
                      title="Remove from wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => addToWishlistHandler(data)}
                      color="#333"
                      title="Add to wishlist"
                    />
                  )}
                </div>
                <label
                  className={`${styles.button} text-white mt-4 rounded h-11`}
                >
                  Upload Prescription
                  <input
                    type="file"
                    accept=".pdf, .jpg, .jpeg, .png"
                    onChange={handlePrescriptionUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div
                className={`${styles.button} mt-6 rounded h-11 flex items-center`}
                onClick={() => addToCartHandler(data.id)}
              >
                <span className="text-white flex items-center">
                  Add to Cart <AiOutlineShoppingCart className="ml-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineDetailCard;
