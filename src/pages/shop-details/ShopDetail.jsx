import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shopData } from '../../static/data'; // Assuming you have the shopData available
import MedicineCard from '../../components/Route/medicine-card/MedicineCard';
import Header from '../../components/Layout/Header';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';

const ShopDetail = () => {
  const { pharmacyId } = useParams(); // Get the shopId from the URL params
  const [shop, setShop] = useState({})
  const [loading, setLoading] = useState(true)
  const [pharmacyDrugs, setPharmacyDrugs] = useState()

  const {fetchPharmacy, fetchPharmacyDrugs} = useContext(AuthContext)

  console.log(fetchPharmacy(pharmacyId), 'fetcher pharm', pharmacyId)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pharmacy = await fetchPharmacy(pharmacyId);
        setShop(pharmacy && pharmacy[0]); // Update state with fetched categories
        const pharmacyDrugsData = await fetchPharmacyDrugs(pharmacyId);
        setPharmacyDrugs(pharmacyDrugsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pharmacy:", error);
        toast.error(error);
      }
    };

    fetchData();
  }, [pharmacyId]);

  console.log(shop, 'shopper detail', pharmacyDrugs);

  // Find the shop with the matching shopId
  // const shop = shopData.find((shop) => shop.id === parseInt(pharmacyId));

  if (!shop) {
    return <div>Shop not found</div>;
  }

  return (
    <div>
        <Header />
        <br />
        <br />
      <div className="bg-white shadow-md rounded-lg p-4">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-20 h-20 object-contain mx-auto mb-3"
        />
        <h2 className="text-xl font-semibold text-center mb-3">{shop.business_name}</h2>
        <p className="text-gray-500 text-center mb-2">{shop.location}</p>
        <p className="text-gray-500 text-center mb-2">{shop.state__name}</p>
        {/* Add any additional shop information here */}
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8">
        {pharmacyDrugs && pharmacyDrugs.length > 0 ? (
          pharmacyDrugs.map((medicine, index) => (
            <MedicineCard key={index} data={medicine} />
          ))
        ) : (
          <h3 className="text-center">No medicines available at this shop</h3>
        )}
      </div>
    </div>
  );
};

export default ShopDetail;
