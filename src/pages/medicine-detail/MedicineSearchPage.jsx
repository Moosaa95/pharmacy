import React, { useContext, useEffect, useState } from "react";
import MedicineDetails from "../../components/medicine-details/MedicineDetails.jsx";
import Header from "../../components/Layout/Header.jsx";
import Footer from "../../components/Layout/Footer.jsx";
import { useParams } from "react-router-dom";
import { productData } from "../../static/data.js";
import SuggestedProuduct from "../../components/medicine-details/SuggestedProduct.jsx";
import AuthContext from "../../context/AuthContext.js";
export const MedicineSearchPage = () => {
  const { medicineData } = useParams();
  console.log(medicineData, "this is param");
  const [data, setData] = useState(null);
  const { fetchDrugs } = useContext(AuthContext);
  // const medicineName = medicineId.replace(/-/, "")
  // const medicineName = medicineId.replace(/-/g, ""); //TODO: Fix for search

  console.log(medicineData, "hey", "i am fetch", fetchDrugs());
  const medicineName = medicineData.replace(/-/g, ' ');
  console.log(medicineName, medicineData, 'date me');

  useEffect(() => {
    // const data = productData.find((i) => i.name === medicineName)
    // setData(data)
    const fetchData = async () => {
      try {
        const drugs = await fetchDrugs();
        console.log(drugs, "gutter drug");
        const matchingDrug = drugs.find((drug) => drug.name === medicineName);
        console.log(matchingDrug, 'matching drug');
        if (matchingDrug) {
          // Set the matched drug's data to the state
          setData(matchingDrug);
        } else {
          console.log('Medicine not found');
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [medicineData]);

  console.log(data, "drug data");

  return (
    <div>
      <Header activeHeading={2} />
      {data && <MedicineDetails data={data} /> }
      {/* {
        
        data && <SuggestedProuduct data={data} />
        } */}
      <Footer />
    </div>
  );
};
