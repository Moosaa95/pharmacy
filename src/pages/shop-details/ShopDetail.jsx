import React from 'react';
import { useParams } from 'react-router-dom';
import { shopData } from '../../static/data'; // Assuming you have the shopData available
import MedicineCard from '../../components/Route/medicine-card/MedicineCard';
import Header from '../../components/Layout/Header';

const ShopDetail = () => {
  const { shopId } = useParams(); // Get the shopId from the URL params

  // Find the shop with the matching shopId
  const shop = shopData.find((shop) => shop.id === parseInt(shopId));

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
          src={shop.logoUrl}
          alt={shop.name}
          className="w-20 h-20 object-contain mx-auto mb-3"
        />
        <h2 className="text-xl font-semibold text-center mb-3">{shop.name}</h2>
        <p className="text-gray-500 text-center mb-2">{shop.location}</p>
        <p className="text-gray-500 text-center mb-2">{shop.state}</p>
        {/* Add any additional shop information here */}
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8">
        {shop.medicines && shop.medicines.length > 0 ? (
          shop.medicines.map((medicine, index) => (
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
