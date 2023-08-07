import React, { useRef, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const cartRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const {cart} = useSelector((state) => state.cart)
  const dispatch = useDispatch()


  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data))
  }

  // const totalPrice = cart.reduce((acc, item) => acc + item.qty * item.discount_price, 0)

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
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setVisible(false);
        setTimeout(() => {
          setOpenCart(false);
        }, 300); // Time for the animation to finish before closing the cart completely
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setOpenCart]);

  const handleQuantityChange = (data) => {
   dispatch(addTocart(data))
    // Update the data with new quantity
    // You can add more logic here, such as preventing negative quantity, etc.
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.discount_price * item.qty,
    0
  );

  return (
    <div
      className={`fixed top-0 left-0 bg-[#0000004b] w-full h-screen z-10 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={cartRef}
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
                  setOpenCart(false);
                }, 300); // Time for the animation to finish before closing the cart completely
              }}
            />
          </div>
          <div className={`${styles.normalFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">{cart && cart.length} items</h5>
          </div>
          {/* single items */}
          <br />
          <div className="w-full border-t">
            {cart &&
              cart.map((i, index) => (
                <CartSingle
                  key={index}
                  data={i}
                  onQuantityChange={handleQuantityChange}
                  removeFromCartHandler={removeFromCartHandler}
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
                Checkout ${totalPrice}
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data, onQuantityChange, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  
  const totalPrice = data.discount_price * value;
  

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      onQuantityChange(updateCartData);
    }
  }

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1 )
    const updateCartData = {...data, qty:value === 1 ? 1: value - 1}
    onQuantityChange(updateCartData)
  }

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center justify-between">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img src="" alt="" className="w-[130px] h-min ml-2 mr-2 rounded-[5px]" />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082">
            ${data.discount_price} x {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            ${totalPrice.toFixed(2)}
          </h4>
        </div>
        <RxCross2 className="cursor-pointer" onClick={() => removeFromCartHandler(data)} />
      </div>
    </div>
  );
};
export default Cart;

// import React, { useRef, useEffect, useState } from "react";
// import { RxCross2 } from "react-icons/rx";
// import { IoBagHandleOutline } from "react-icons/io5";
// import { HiOutlineMinus, HiPlus } from "react-icons/hi";
// import { Link } from "react-router-dom";

// const Cart = ({ setOpenCart }) => {
//   const cartRef = useRef(null);
//   const [visible, setVisible] = useState(true);

//   const data = [
//     {
//       id: 1,
//       name: "Product 1",
//       price: 10.99,
//       quantity: 2,
//     },
//     {
//       id: 2,
//       name: "Product 2",
//       price: 7.99,
//       quantity: 1,
//     },
//     // Add more cart items as needed
//   ];

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (cartRef.current && !cartRef.current.contains(event.target)) {
//         setVisible(false);
//         setTimeout(() => {
//           setOpenCart(false);
//         }, 300); // Time for the animation to finish before closing the cart completely
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick);

//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, [setOpenCart]);

//   const handleQuantityChange = (itemId, value) => {
//     const updatedData = data.map((item) =>
//       item.id === itemId ? { ...item, quantity: item.quantity + value } : item
//     );
//     // Update the data with new quantity
//     // You can add more logic here, such as preventing negative quantity, etc.
//   };

//   const totalPrice = data.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <div
//       className={`fixed top-0 left-0 bg-[#0000004b] w-full h-screen z-10 transition-opacity duration-300 ${
//         visible ? "opacity-100" : "opacity-0 pointer-events-none"
//       }`}
//     >
//       <div ref={cartRef} className="cart-container">
//         <div>
//           <div className="flex w-full justify-end pt-5 pr-5">
//             <RxCross2
//               size={25}
//               className="cursor-pointer"
//               onClick={() => {
//                 setVisible(false);
//                 setTimeout(() => {
//                   setOpenCart(false);
//                 }, 300); // Time for the animation to finish before closing the cart completely
//               }}
//             />
//           </div>
//           <div className="cart-header flex p-4">
//             <IoBagHandleOutline size={25} />
//             <h5 className="pl-2 text-[20px] font-[500]">3 items</h5>
//           </div>
//           {/* Single items */}
//           <div className="cart-items">
//             {data.map((item) => (
//               <CartSingle key={item.id} data={item} onQuantityChange={handleQuantityChange} />
//             ))}
//           </div>
//         </div>
//         <div className="cart-footer px-5 mb-3">
//           <Link to="/checkout">
//             <div className="checkout-btn h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]">
//               <h1 className="text-[#fff] text-[18px] font-[600]">Checkout (${totalPrice.toFixed(2)})</h1>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// const CartSingle = ({ data, onQuantityChange }) => {
//   const [value, setValue] = useState(data.quantity);
//   const totalPrice = data.price * value;

//   const handleQuantityUpdate = (value) => {
//     setValue(value);
//     onQuantityChange(data.id, value - data.quantity);
//   };
//   return (
//     <div className="cart-item border-b p-4">
//       <div className="cart-item-content flex items-center">
//         <div className="quantity-controls">
//           <div className="quantity-btn bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer" onClick={() => handleQuantityUpdate(value + 1)}>
//             <HiPlus size={18} color="#fff" />
//           </div>
//           <span className="pl-[10px]">{value}</span>
//           <div className="quantity-btn bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer" onClick={() => handleQuantityUpdate(Math.max(1, value - 1))}>
//             <HiOutlineMinus size={16} color="#7d879c" />
//           </div>
//         </div>
//         <img src="" alt="" className="cart-item-image w-[80px] h-[80px] ml-2" />
//         <div className="cart-item-details pl-[5px]">
//           <h1>{data.name}</h1>
//           <h4 className="font-[400] text-[15px] text-[#00000082]">${data.price.toFixed(2)} x {value}</h4>
//           <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">${totalPrice.toFixed(2)}</h4>
//         </div>
//         <RxCross2 className="remove-btn cursor-pointer" />
//       </div>
//     </div>
//   );
// };

// export default Cart;
