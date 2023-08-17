import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/107043-success.json";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

const OrderSuccessPage = () => {
  console.log(animationData);
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};


const Success = () => {
  return (
    <div>
      <Lottie animationData={animationData} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
