import React, { useState } from 'react'
import ShopCards from '../../components/Route/shop-cards/ShopCards'
import { shopData } from '../../static/data'
import Header from '../../components/Layout/Header'
import styles from '../../styles/styles'


const ShopList = () => {
    const loading = false
    const error  =false
  return (
    <div>
        <Header activeHeading={3} />
        <br />
        <br />
        <h1 className="text-center text-3xl font-semibold mb-5">List of Shops</h1>
        <div className={`${styles.section}`}>
            {loading ? (
                <h1 className="text-center w-full pb-[110px] text-[20px]">
                Loading...
              </h1>
            ) : error? (
                <h1 className="text-center w-full pb-[110px] text-[20px]">
                Something went wrong. Please try again later.
              </h1>
            ) : (
                <ShopCards shopData={shopData} />
            )}

        </div>
      
    </div>
  )
}


export default ShopList
