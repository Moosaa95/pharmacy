
import React from "react";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/SideBar";
import AllDrugsComponents from "../../Layout/AllDrugsComponents";


const AllDrugs = () => {
  return (
    <div>
      <Header />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <SideBar active={3} />
        </div>
        <AllDrugsComponents />
      </div>
    </div>
  );
};
export default AllDrugs;
