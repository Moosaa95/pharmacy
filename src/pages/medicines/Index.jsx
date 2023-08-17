// import React, { useEffect, useState } from "react";
// import Header from "../../components/Layout/Header";
// import styles from "../../styles/styles";
// import { useSearchParams } from "react-router-dom";
// import { productData } from "../../static/data";
// import MedicineCard from "../../components/Route/medicine-card/MedicineCard";

// const Medicines = () => {
//   const [data, setData] = useState([]);
//   const [searchParams] = useSearchParams()

//   const categoriesData = searchParams.get("category")


//   useEffect(() => {
//     if (categoriesData === null){
//       const d = productData && productData.sort((a, b) => a.total_sell - b.total_sell)
//       setData(d)
//     }else{
//       const d = productData && productData.filter((i) => i.category === categoriesData)
//       setData(d)

//     }
//   }, [])



//   return (
//     <div>
//       <Header activeHeading={3} />
//       <br />
//       <br />
//       <div className={`${styles.section}`}>
//         <div className="grid grid-cols-1 gap-[120px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
//           {
//             data && data.map((i, index) => (
//               <MedicineCard data={i} key={index} />
//             ))

//           }
          
//         </div>
//         {
//             data && data.length === 0 ? (
//               <h1 className="text-center w-full pb-[110px] text-[20px]">No product found</h1>
//             ) : null
//           }
//       </div>
//     </div>
//   );
// };

// export default Medicines;


import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Layout/Header";
import styles from "../../styles/styles";
// import { categoriesData, productData } from "../../static/data";
import MedicineCard from "../../components/Route/medicine-card/MedicineCard";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const Medicines = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [categoriesData, setCategoriesData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchParams] = useSearchParams();
  const categoriesDatas = searchParams.get("category");



  const { fetchDrugs, fetchCategories } = useContext(AuthContext);
  // const { fetchCategories } = useContext(AuthContext);/

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

  // useEffect(() => {
  //   const fetchDatas = async () => {
  //     try {
  //       const drugs = await fetchDrugs();
  //       setCategoriesData(drugs); // Update state with fetched categories
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching drugs:", error);
  //       toast.error(error);
  //     }
  //   };

  //   fetchDatas();
  // }, [fetchDrugs]);

  
  
  const fetchData = async () => {
    setLoading(true);
    setError(false);

    try {
      let d = await fetchDrugs();

      if (categoriesDatas !== null) {
        d = d.filter((i) => i.category__name === categoriesDatas);
      }

      d.sort((a, b) => a.total_sold - b.total_sold);
      setData(d);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // console.log(categoriesData, data, 'fetcher');

  useEffect(() => {
    setSelectedCategory(categoriesDatas? categoriesDatas : "All Categories"); // Update state once during initial render
    fetchData();
  }, [categoriesDatas]);

  return (
    <div>
      <Header activeHeading={2} selectedCategory={selectedCategory} categoriesData={categoriesData} endpoint="medicines?category" />
      <br />
      <br />
      <div className={`${styles.section}`}>
        {loading ? (
          <h1 className="text-center w-full pb-[110px] text-[20px]">
            Loading...
          </h1>
        ) : error ? (
          <h1 className="text-center w-full pb-[110px] text-[20px]">
            Something went wrong. Please try again later.
          </h1>
        ) : (
          <div className="grid grid-cols-1 gap-[120px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {data && data.length > 0 ? (
              data.map((i, index) => <MedicineCard data={i} key={index} />)
            ) : (
              <h1 className="text-center w-full pb-[110px] text-[20px]">
                No product found
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Medicines;
