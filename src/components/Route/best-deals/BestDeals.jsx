import React, { useContext, useEffect, useState } from "react";
import { productData } from "../../../static/data";
import styles from "../../../styles/styles";
import MedicineCard from "../medicine-card/MedicineCard";
import AuthContext from "../../../context/AuthContext";
import { toast } from "react-toastify";


const BestDeals = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  const {fetchDeals} = useContext(AuthContext)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const varData = await fetchDeals();
        console.log(varData, 'best');
        setData(varData); // Update state with fetched categories
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error(error);
      }
    };

    fetchData();
  }, [fetchDeals]);

  // useEffect(() => {
  //   const d =
  //     productData && productData.sort((a, b) => b.total_sell - a.total_sell);
  //   const firstFive = d.slice(0, 5);
  //   setData(firstFive);
  // }, []);
  return (
    <>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
            <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {
                data && data.map((i, index) => (
                    <MedicineCard data={i} key={index} />
                ))
            }
        </div>
      </div>
    </>
  );
};

export default BestDeals;



