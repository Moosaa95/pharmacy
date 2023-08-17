import React, { useContext, useEffect, useState } from "react";
import styles from "../../../styles/styles";
// import { productData } from '../../../static/data'
import MedicineCard from "../medicine-card/MedicineCard";
import AuthContext from "../../../context/AuthContext";
import { toast } from "react-toastify";

const Featured = () => {
  const [medicineData, setMedicineData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { fetchDrugs } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const drugs = await fetchDrugs();
        setMedicineData(drugs.slice(0, 4)); // Update state with fetched categories
        setLoading(false);
      } catch (error) {
        console.error("Error fetching drugs:", error);
        toast.error(error);
      }
    };

    fetchData();
  }, [fetchDrugs]);

  console.log(medicineData, "eData");
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Medicines</h1>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <p>Medicines Loading</p>
          ) : (
            <>
              {medicineData &&
                medicineData.map((i, index) => (
                  <MedicineCard data={i} key={index} />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Featured;
