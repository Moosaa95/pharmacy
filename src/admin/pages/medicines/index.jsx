import React from 'react'
import CreateMedicine from '../../CreateMedicine';
import SideBar from '../../Layout/SideBar';
import Header from '../../Layout/Header';

const ShopCreateProduct = () => {
  return (
    <div>
        <Header />
        <div className="flex items-center justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <SideBar active={4} />
            </div>
            <div className="w-full justify-center flex">
                <CreateMedicine />
            </div>
          </div>
    </div>
  )
}

export default ShopCreateProduct