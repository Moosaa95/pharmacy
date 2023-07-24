import React from 'react'
import Header from '../../components/Layout/Header'
import Hero from '../../components/Route/Hero/Hero'
import Categories from '../../components/Route/categories/Categories'
import BestDeals from '../../components/Route/best-deals/BestDeals'
import Featured from '../../components/Route/featured/Featured'
// import Event from '../../components/Route/events/Event'
import Sponsored from "../../components/Route/sponsored/Sponsored.jsx"
import Footer from "../../components/Layout/Footer"

const ShopHome = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      {/* <Event /> */}
      <Featured />
      <Sponsored />
      <Footer />
    </div>
  )
}

export default ShopHome