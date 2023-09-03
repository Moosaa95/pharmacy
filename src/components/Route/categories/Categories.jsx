// import React from 'react'
// import styles from '../../../styles/styles'
// import { brandingData, categoriesData } from '../../../static/data'
// import { useNavigate } from 'react-router-dom'

// const Categories = () => {
//     const navigate = useNavigate()
//   return (
//   <>
//   <div className={`${styles.section} hidden sm:block`}>
//     <div className="flex justify-between w-full p-5 my-12 bg-white rounded-md shadow-sm branding">
//         {
//             brandingData && brandingData.map((i, index) => (
//                 <div className="flex items-start" key={index}>
//                     {i.icon}
//                     <div className="px-3">
//                         <h3 className="text-sm font-bold md:text-base">
//                             {i.title}

//                         </h3>
//                         <p className="text-xs md:text-sm">
//                             {i.Description}
//                         </p>
//                     </div>
//                 </div>
//             ))
//         }
//     </div>

// </div>
//     <div className={`${styles.section} bg-white p-6 rounded-lg mb-12`} id='categories'>
//         <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
//             {
//                 categoriesData && categoriesData.map((i, index) => {
//                     const handleSubmit = () => {
//                         navigate(`/medicine?category=${i.title}`)
//                     }
//                     return(
//                         <div className='w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden'
//                          key={index}
//                          onClick={() => handleSubmit(i)}
//                         >
//                             <h5 className='text-[18px] leading-[1.3]'>{i.title}</h5>
//                             <img src={i.image_Url} alt="" className='w-[120px] object-cover' />

//                         </div>
//                     )
//                 })
//             }
//         </div>
//     </div>
//   </>
//   )
// }

// export default Categories

// import React from 'react';
// import styles from '../../../styles/styles';
// import { categoriesData } from '../../../static/data';
// import { useNavigate } from 'react-router-dom';

// const Categories = () => {
//   const navigate = useNavigate();

//   const handleCategoryClick = (categoryTitle) => {
//     navigate(`/medicines?category=${categoryTitle}`);
//   };

//   return (
//     <>
//       <div className={`${styles.section} hidden sm:block`}>
//         <div className="flex justify-between w-full p-5 my-12 bg-white rounded-md shadow-sm branding">
//           {/* Your brandingData mapping here */}
//           {/* ... */}
//         </div>
//       </div>

//       <div className={`${styles.section} bg-white p-6 rounded-lg mb-12`} id='categories'>
//         <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
//           {categoriesData &&
//             categoriesData.map((category) => (
//               <div
//                 className='w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden rounded-lg shadow-sm'
//                 key={category.id}
//                 onClick={() => handleCategoryClick(category.title)}
//               >
//                 <div className="flex flex-col items-start px-4">
//                   <h5 className='text-[18px] leading-[1.3] font-bold'>
//                     {category.title}
//                   </h5>
//                   <p className="text-sm text-gray-500">
//                     {/* You can add a short description here if needed */}
//                   </p>
//                 </div>
//                 <img
//                   src={category.image_Url}
//                   alt={category.title}
//                   className='w-[120px] h-full object-cover'
//                 />
//               </div>
//             ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Categories;

import React, { useContext, useEffect, useState } from "react";
import styles from "../../../styles/styles";
// import { categoriesData, brandingData } from "../../../static/data";
import { useNavigate } from "react-router-dom";
import {
  FaFirstAid,
  FaPrescriptionBottleAlt,
  FaHeartbeat,
  FaPills,
} from "react-icons/fa";
import { GiHealthPotion, GiSyringe } from "react-icons/gi";
import AuthContext from "../../../context/AuthContext";
import { toast } from "react-toastify";
// import { ImSyringe } from 'react-icons/im';

const brandingDatas = [
  {
    icon: <FaPills size={30} color="#3b82f6" />,
    title: "Medications",
    Description:
      "Explore a wide range of medications for various health conditions.",
  },
  {
    icon: <GiHealthPotion size={30} color="#10b981" />,
    title: "Health Supplements",
    Description:
      "Discover essential health supplements to support your well-being.",
  },
  {
    icon: <FaFirstAid size={30} color="#f59e0b" />,
    title: "First Aid",
    Description:
      "Find first aid essentials for minor injuries and emergencies.",
  },
  {
    icon: <FaPrescriptionBottleAlt size={30} color="#6366f1" />,
    title: "Prescriptions",
    Description: "Get your prescriptions filled with ease and convenience.",
  },
  {
    icon: <GiSyringe size={30} color="#ef4444" />,
    title: "Vaccinations",
    Description: "Stay protected with a range of vaccinations available.",
  },
  {
    icon: <FaHeartbeat size={30} color="#ec4899" />,
    title: "Healthcare",
    Description:
      "Explore healthcare products to manage your health effectively.",
  },
];

const Categories = () => {
  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { fetchCategories } = useContext(AuthContext);

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

  console.log(categoriesData, "categories");

  const handleCategoryClick = (categoryTitle) => {
    navigate(`/medicines?category=${categoryTitle}`);
  };

  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div className="flex justify-between w-full p-5 my-12 bg-white rounded-md shadow-sm branding">
          {brandingDatas &&
            brandingDatas.map((brand) => (
              <div className="flex items-start" key={brand.title}>
                {brand.icon}
                <div className="px-3">
                  <h3 className="text-sm font-bold md:text-base">
                    {brand.title}
                  </h3>
                  <p className="text-xs md:text-sm">{brand.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Categories in Pharmacy
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <p>Please Wait... Categories Loading</p>
          ) : (
            <>
              {categoriesData &&
                categoriesData.map((category) => (
                  <div
                    className="flex flex-col items-center p-4 transition-all transform rounded-lg shadow-md cursor-pointer hover:shadow-lg"
                    key={category.id}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-[120px] h-[120px] object-cover rounded-lg mb-3"
                    />
                    <h5 className="text-[18px] font-semibold leading-[1.3] text-gray-800">
                      {category.name}
                    </h5>
                    {/* Add a short description here if needed */}
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
