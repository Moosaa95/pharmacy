import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import MedicineDetailCard from "../medicine-detail/MedicineDetailCard";
import StarRating from "./Ratings";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";
import { toast } from "react-toastify";

const MedicineCard = ({ data, number_of_item }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch()

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i.id === data.id)) {
      setClick(true);
    } else {
      console.log('gggg', wishlist);
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    console.log('coldlld', click, data);
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };
  

  
  const product_name = data?.name?.replace(/\$+/g, "-");

  // console.log(product_name, 'proud');

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i.id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Medicine stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/medicine/${data.id}`}>
          <img
            src={data.images.Paracetamol_one}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to="/">
          <h5 className={`${styles.shop_name}`}>{data.business_name}</h5>
        </Link>
        <Link to={`/medicine/${data.id}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          <StarRating rating={data.ratings} />
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.original_price === 0 ? data.original_price : data.discount_price}$
              </h5>
              <h4 className={`${styles.price}`}>
                {data.original_price ? data.original_price + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data.sold_out} sold
            </span>
          </div>
        </Link>
        <div className="items-end">
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
           <AiOutlineEye
              size={22}
              className="cursor-pointer absolute right-2 top-14"
              onClick={() => setOpen(!open)}
              color="#333"
              title="quick view"
            />
            <AiOutlineShoppingCart
              size={25}
              className="cursor-pointer absolute right-2 top-24"
              onClick={() => addToCartHandler(data.id)}
              color="#444"
              title="Add to cart"
            />
            {
                open ? (
                    <MedicineDetailCard data={data} setOpen={setOpen} />
                ) : null
            }
        </div>
      </div>
    </>
  );
};

export default MedicineCard;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import styles from "../../../styles/styles";
// import {
//   AiFillHeart,
//   AiFillStar,
//   AiOutlineEye,
//   AiOutlineHeart,
//   AiOutlineShoppingCart,
//   AiOutlineStar,
// } from "react-icons/ai";
// import MedicineDetailCard from "../medicine-detail/MedicineDetailCard";

// const MedicineCard = ({ data }) => {
//   const [click, setClick] = useState(false);
//   const [open, setOpen] = useState(false);

//   // Extract the product name from the data
//   const productName = data?.name?.replace(/\$+/g, "-");

//   return (
//     <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
//       <Link to={`/medicines/${productName}`}>
//         <img
//           src={data?.image_Url[0]?.url}
//           alt={data?.name}
//           className="w-full h-[170px] object-contain"
//         />
//       </Link>

//       <Link to="/">
//         <h5 className={`${styles.shop_name}`}>{data?.shop?.name}</h5>
//       </Link>

//       <Link to={`/medicines/${productName}`}>
//         <h4 className="pb-3 font-semibold">
//           {data?.name?.length > 40 ? data?.name?.slice(0, 40) + "..." : data?.name}
//         </h4>
//         <div className="flex">
//           <AiFillStar size={20} color="#f6ba68" className="mr-2 cursor-pointer" />
//           <AiFillStar size={20} color="#f6ba68" className="mr-2 cursor-pointer" />
//           <AiFillStar size={20} color="#f6ba68" className="mr-2 cursor-pointer" />
//           <AiFillStar size={20} color="#f6ba68" className="mr-2 cursor-pointer" />
//           <AiOutlineStar size={20} color="#f6ba68" className="mr-2 cursor-pointer" />
//         </div>
//         <div className="py-2 flex items-center justify-between">
//           <div className="flex">
//             <h5 className={`${styles.productDiscountPrice}`}>
//               {data?.price === 0 ? data?.price : data?.discount_price + "$"}
//             </h5>
//             <h4 className={`${styles.price}`}>{data?.price ? data?.price + " $" : null}</h4>
//           </div>
//           <span className="font-[400] text-[17px] text-[#68d284]">{data?.total_sell} sold</span>
//         </div>
//       </Link>

//       <div>
//         {click ? (
//           <AiFillHeart
//             size={22}
//             className="cursor-pointer absolute right-2 top-5"
//             onClick={() => setClick(!click)}
//             color="red"
//             title="Remove from wishlist"
//           />
//         ) : (
//           <AiOutlineHeart
//             size={22}
//             className="cursor-pointer absolute right-2 top-5"
//             onClick={() => setClick(!click)}
//             color="#333"
//             title="Add to wishlist"
//           />
//         )}
//         <AiOutlineEye
//           size={22}
//           className="cursor-pointer absolute right-2 top-14"
//           onClick={() => setOpen(!open)}
//           color="#333"
//           title="quick view"
//         />
//         <AiOutlineShoppingCart
//           size={25}
//           className="cursor-pointer absolute right-2 top-24"
//           onClick={() => setOpen(!open)}
//           color="#444"
//           title="Add to cart"
//         />
//         {open && <MedicineDetailCard data={data} setOpen={setOpen} />}
//       </div>
//     </div>
//   );
// };

// export default MedicineCard;
