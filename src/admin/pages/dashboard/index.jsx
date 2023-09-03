import React from "react";
import SideBar from "../../Layout/SideBar";
import Hero from "../../Layout/Hero";
import Header from "../../Layout/Header";
// import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
// import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
// import DashboardHero from "../../components/Shop/DashboardHero";

const ShopDashboardPage = () => {
  return (
        <div>
          <Header />
          <div className="flex items-start justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <SideBar active={1} />
            </div>
            <Hero />
          </div>
        </div>
  );
};

export default ShopDashboardPage;
