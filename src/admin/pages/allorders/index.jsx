
import React from "react";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/SideBar";
import AllOrderComponents from "../../Layout/AllOrderComponents";

const AllOrders = () => {
  return (
    <div>
      <Header />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <SideBar active={2} />
        </div>
        <AllOrderComponents />
      </div>
    </div>
  );
};
export default AllOrders;
