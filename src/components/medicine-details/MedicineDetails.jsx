import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../../redux/actions/wishlist";
import AuthContext from "../../context/AuthContext";

const MedicineDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [select, setSelect] = useState(0);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [click, setClick] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const { savePrescription, user } = useContext(AuthContext);

  console.log("check data", data);

  const navigate = useNavigate();

  const handleIncrementCount = () => setCount(count + 1);
  const handleDecrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handlePrescriptionUpload = (e) => {
    const file = e.target.files[0];
    setPrescriptionFile(file);
  };

  console.log(prescriptionFile, "pres", user.user_id, 'depth', data);


  const addToCartHandler = async (id) => {
    console.log('detail', id);
    if (!prescriptionFile) {
      toast.error("Please upload a prescription before adding to cart.");
      return;
    }

    console.log(prescriptionFile, "pres", user.user_id, 'depth');

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
    if (data){
      if (wishlist && wishlist.find((i) => i.id === data.id)) {
        setClick(true);
      } else {
        setClick(false);
      }
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

  const handleMessageSubmit = () => {
    navigate("");
  };
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%] `}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data?.images?.Paracetamol_one}
                  alt=""
                  className={`w-[80%] transition-opacity duration-500 ${
                    click ? "opacity-100" : "opacity-70"
                  }`}
                />
                <div className="w-full flex gap-5 pt-5">
                  <div
                    className={`${select === 0 ? "border" : ""} cursor-pointer`}
                  >
                    <img
                      src={data?.images?.Paracetamol_two}
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
                    className={`${select === 0 ? "border" : ""} cursor-pointer`}
                  >
                    <img
                      src={data?.images?.Paracetamol_three}
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
              {/* <div className="w-full 800px:w-[50%]"> */}
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    ${data.discount_price}
                  </h4>
                  {data.original_price ? (
                    <h3 className={`${styles.price}`}>
                      ${data.original_price}
                    </h3>
                  ) : null}
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
                  className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                  onClick={() => addToCartHandler(data.id)}
                >
                  <span className="text-white flex items-center">
                    Add to Cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <img
                    src={data.pharmacy_profile__business_image}
                    alt="img"
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div className="pr-8">
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data.pharmacy__business_name}
                      {/* <h5 className="pb-3 text-[15px]">(ratings) ratings</h5> */}
                    </h3>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
          <ProductDetailsInfo data={data} />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  const pythonDateStr = data.pharmacy__created; // Replace this with the actual Python date string
  const pythonDate = new Date(pythonDateStr);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = pythonDate.toLocaleDateString("en-US", options);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-around border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[500] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
            {active === 1 ? (
              <div className={`${styles.active_indicator}`} />
            ) : null}
          </h5>
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[500] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(2)}
          >
            Shop Info
            {active === 2 ? (
              <div className={`${styles.active_indicator}`} />
            ) : null}
          </h5>
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
          {/* <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem
            saepe maxime itaque eos ipsum cupiditate mollitia totam esse
            voluptates deleniti incidunt, quod provident expedita perferendis
            quibusdam quo error nihil explicabo.
          </p> */}
        </>
      ) : null}
      {active === 2 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <div className="flex items-center">
              <img
                src={data.pharmacy_profile__business_image}
                alt="shop image"
                className="w-[50px] rounded-full h-[50px]"
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>
                  {data.pharmacy__business_name}
                </h3>
                {/* <div className="pb-2 text-[15px]">(ratings) ratings</div> */}
              </div>
            </div>
            <p className="pt-2"></p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on: <span className="font-[500]">{formattedDate}</span>
              </h5>
              <h5 className="font-[600]">
                Total Products: <span className="font-[500]">{data.stock}</span>
              </h5>
              {/* <h5 className="font-[600]">
                Total Reviews: <span className="font-[500]">44</span>
              </h5> */}
              <Link to={`shop/${data.pharmacy__id}`}>
                <div
                  className={`${styles.button} !rounded-[14px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineDetails;
