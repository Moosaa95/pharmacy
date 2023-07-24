import React from 'react';
import { Link } from 'react-router-dom';

const ShopCards = ({ shopData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shopData.map((shop) => (
        <Link to={`/shops/${shop.id}`} key={shop.id} className='cursor-pointer'>
          <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer">
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
        </Link>
      ))}
    </div>
  );
};

export default ShopCards;
