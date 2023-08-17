import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Layout/Header'
import Hero from '../../components/Route/Hero/Hero'
import Categories from '../../components/Route/categories/Categories'
import BestDeals from '../../components/Route/best-deals/BestDeals'
import Featured from '../../components/Route/featured/Featured'
// import Event from '../../components/Route/events/Event'
import Sponsored from "../../components/Route/sponsored/Sponsored.jsx"
import Footer from "../../components/Layout/Footer"
import AuthContext from '../../context/AuthContext'
import { toast } from 'react-toastify'
// import { categoriesData } from '../../static/data'




const ShopHome = () => {
  console.log('inner structure');
  const [categoriesData, setCategoriesData] = useState('')
  const [loading, setLoading] = useState(true)

  const {fetchCategories}  = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await fetchCategories();
        setCategoriesData(categories); // Update state with fetched categories
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error(error);
      }
    };

    fetchData();
  }, [fetchCategories]);

  console.log(categoriesData, 'category');
  return (
    <div>
      <Header activeHeading={1} categoriesData={categoriesData} endpoint="medicine?category" />
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