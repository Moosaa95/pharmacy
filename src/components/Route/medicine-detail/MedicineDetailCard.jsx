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
//               className="absolute z-50 right-3 top-3"
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
//                 <div className="flex items-center justify-between pr-3 mt-12">
//                   <div>
//                     <button className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out rounded-l shadow-lg bg-gradient-to-r from-teal-400 to-teal-500 hover:opacity-75" onClick={handleDecrementCount}>
//                       -
//                     </button>
//                     <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
//                       {count}
//                     </span>
//                     <button className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out rounded-l shadow-lg bg-gradient-to-r from-teal-400 to-teal-500 hover:opacity-75" onClick={handleIncrementCount}>
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
            className="absolute z-50 cursor-pointer top-3 right-3"
            onClick={() => setOpen(false)}
          />

          <div className="flex flex-col md:flex-row">
            {/* Left Side - Product Image and Shop Details */}
            <div className="w-full md:w-[50%] md:pr-5">
              <img
                src={data.images.drug_one}
                alt={data.name}
                className="object-cover w-full h-48 mb-4 rounded-md md:h-auto"
              />

              <div className="flex items-start mb-4">
                <img
                  src={data.pharmacy_profile__business_image}
                  alt={data.business_name}
                  className="w-12 h-12 mr-2 rounded-full"
                />
                <div>
                  <h3 className="text-base font-semibold md:text-lg">
                    {data.pharmacy__business_name}
                  </h3>
                  <p className="text-sm text-gray-600 md:text-base">
                    ({data.ratings}) ratings
                  </p>
                </div>
              </div>

              {/* <div
                className={`${styles.button} bg-[#000] mt-4 rounded h-11`}
                onClick={handleMessageSubmit}
              >
                <span className="flex items-center text-white">
                  Send Message <AiOutlineMessage className="ml-1" />
                </span>
              </div> */}

              <h5 className="mt-5 text-sm text-red-400">
                ({data.sold_out}) Sold out
              </h5>
            </div>

            {/* Right Side - Product Details */}
            <div className="w-full md:w-[50%] md:pl-5 md:pt-5 md:pb-2">
              <h1 className="text-lg font-semibold md:text-2xl">{data.name}</h1>
              <p className="mt-2 text-sm text-gray-600">{data.description}</p>

              <div className="flex items-center mt-4">
                <h4 className="text-lg font-semibold text-red-400 md:text-xl">
                  ${data.discount_price}
                </h4>
                <h3 className="ml-2 text-base md:text-lg">
                  {data.original_price ? `$${data.original_price}` : null}
                </h3>
              </div>

              <div className="flex items-center justify-between pr-3 mt-6">
                <div className="flex items-center">
                  <button
                    className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out bg-green-500 rounded-l shadow-lg hover:opacity-75"
                    onClick={handleDecrementCount}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium text-gray-800 bg-gray-200">
                    {count}
                  </span>
                  <button
                    className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out bg-green-500 rounded-r shadow-lg hover:opacity-75"
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
                <span className="flex items-center text-white">
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
