// ... (imports and other code above)
import React, { useState, useEffect } from 'react';
import ShopCards from '../../components/Route/shop-cards/ShopCards';
import { locationData, shopData } from '../../static/data';
import Header from '../../components/Layout/Header';
import styles from '../../styles/styles';
import { useSearchParams } from 'react-router-dom';

const ShopList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const [shopState, setShopState] = useState('');
  const [filteredShopData, setFilteredShopData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");


  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const stateParam = searchParams.get('state');
        const data = await fetchShopData(stateParam);
        setShopState(stateParam);
        setFilteredShopData(data);
        setLoading(false);
        setSelectedCategory(stateParam? stateParam : "All"); // Update state once during initial render
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    loadData();
  }, [searchParams]);

  const fetchShopData = async (state) => {
    return new Promise((resolve, reject) => {
      // Mock API call with a timeout to simulate asynchronous behavior
      setTimeout(() => {
        if (state) {
          // Filter shopData based on the state if it's provided in the URL
          const filteredData = shopData.filter((shop) => shop.state === state);
          resolve(filteredData);
        } else {
          // If no state is provided, resolve with the entire shopData
          resolve(shopData);
        }
      }, 1000); // Simulate a 1-second delay for the API call
    });
  };

  return (
    <div>
      <Header activeHeading={3} selectedCategory={selectedCategory} categoriesData={locationData} endpoint="shops?state" />
      <br />
      <br />
      <h1 className="text-center text-3xl font-semibold mb-5">List of Shops</h1>
      <div className={styles.section}>
        {loading ? (
          <h1 className="text-center w-full pb-[110px] text-[20px]">Loading...</h1>
        ) : error ? (
          <h1 className="text-center w-full pb-[110px] text-[20px]">
            Oops! Something went wrong. Please try again later.
          </h1>
        ) : (
          <React.Fragment>
            {shopState ? (
              <h2 className="text-center text-2xl font-semibold mb-3">
                Shops in {shopState}
              </h2>
            ) : (
              <h2 className="text-center text-2xl font-semibold mb-3">
                All Shops
              </h2>
            )}
            {filteredShopData.length > 0 ? (
              <ShopCards shopData={filteredShopData} />
            ) : (
              <h3 className="text-center text-lg font-semibold mt-4">
                No shops found in the {shopState ? shopState : 'selected'} state.
              </h3>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default ShopList;
