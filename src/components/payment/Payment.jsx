import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import axios from "axios";
// import { server } from "../../server";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import AuthContext from "../../context/AuthContext";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cardName, setCardName] = useState("");
  //   const { user } = useSelector((state) => state.user);
  // const user = { name: "moosa", email: "mm@gmail.com" };
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const { createOrder, user } = useContext(AuthContext);

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  console.log("latest order", orderData);

  const order = {
    cart: orderData?.cart,
    shipping_address: orderData?.shippingAddress,
    user: user && user.user_id,
    total_price: orderData?.totalPrice,
    drug_id: orderData?.nFile?.map((n) => n.drug_id),
    payment_info: { cvv: cvv, expDate: expDate, cardNumber: cardNumber },
    // prescription: orderData?.nFile?.map(n => n.prescription),
    status: "Processing",
  };

  const paymentData = {
    amount: Math.round(orderData?.total_price * 100),
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append the form fields to the formData object
    formData.append("cart", JSON.stringify(order.cart));
    formData.append("shipping_address", JSON.stringify(order.shipping_address));
    formData.append("userbase", order.user);
    formData.append("total_price", order.total_price);
    formData.append("status", order.status);
    formData.append("payment_info", JSON.stringify(order.payment_info));

    const orderDataCreated = await createOrder(formData);
    if (orderDataCreated) {
      navigate("/order/success");
      toast.success(orderDataCreated.message);
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      // window.location.reload();
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("cart", JSON.stringify(order.cart));
    formData.append("shipping_address", JSON.stringify(order.shipping_address));
    formData.append("userbase", order.user);
    formData.append("total_price", order.total_price);
    formData.append("status", order.status);
    const orderDataCreated = await createOrder(formData);

    if (orderDataCreated) {
      navigate("/order/success");
      toast.success(orderDataCreated.message);
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      // window.location.reload();
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            setCvv={setCvv}
            setCardNumber={setCardNumber}
            setExpDate={setExpDate}
            cvv={cvv}
            expDate={expDate}
            cardNumber={cardNumber}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
            setCardName={setCardName}
            cardName={cardName}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  setCardNumber,
  setCardName,
  setExpDate,
  setCvv,
  cvv,
  expDate,
  cardNumber,
  cardName,
  user,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);

  const handleCardNumberChange = (event) => {
    const input = event.target.value.replace(/\s/g, "");
    const formatted = input
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim()
      .slice(0, 19); // Limit to 19 characters (16 digits + 3 spaces)
    setCardNumber(formatted);
  };

  const handleCvv = (event) => {
    const input = event.target.value.replace(/\s/g, "");
    const formatted = input.slice(0, 3);
    setCvv(formatted);
  };

  const handleCardName = (event) => {
    setCardName(event.target.value);
  };

  const handleExpDateChange = (event) => {
    const inputValue = event.target.value;
    let formattedValue = inputValue;

    // Add a "/" after the first 2 characters
    if (inputValue.length === 2 && !inputValue.includes("/")) {
      formattedValue = inputValue + "/";
    }

    setExpDate(formattedValue);
  };

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* select buttons */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Debit/credit card
          </h4>
        </div>

        {/* pay with card */}
        {select === 1 ? (
          <div className="w-full border-b p-6 bg-white rounded-lg shadow-md">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="mb-6">
                <label
                  htmlFor="cardName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Cardholder's Name
                </label>
                <input
                  required
                  id="cardName"
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f63b60] focus:border-[#f63b60] ${styles.input}`}
                  placeholder="card name"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}

                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f63b60] focus:border-[#f63b60] ${styles.input}`}
                  placeholder="XXXX XXXX XXXX XXXX"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="expDate"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Expiry Date
                  </label>
                  <input
                    id="expDate"
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f63b60] focus:border-[#f63b60] ${styles.input}`}
                    placeholder="MM / YY"
                    value={expDate}
                    onChange={handleExpDateChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    CVV
                  </label>
                  <input
                    id="cvv"
                    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f63b60] focus:border-[#f63b60] ${styles.input}`}
                    placeholder="XXX"
                    value={cvv}
                    onChange={handleCvv}
                  />
                </div>
              </div>

              <input
                type="submit"
                value="Submit Payment"
                className={`${styles.button} mt-6 bg-[#f63b60] text-white py-2 px-4 rounded-md cursor-pointer`}
              />
            </form>
          </div>
        ) : null}
      </div>

      <br />

      <br />
      {/* cash on delivery */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {/* cash on delivery */}
        {select === 3 ? (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Confirm"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {orderData?.discountPrice ? "$" + orderData.discountPrice : "-"}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        ${orderData?.totalPrice}
      </h5>
      <br />
    </div>
  );
};

export default Payment;
