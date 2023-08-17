// ... (imports and other code above)
import React, { useState, useEffect, useContext } from 'react';
import ShopCards from '../../components/Route/shop-cards/ShopCards';
import { locationData, shopData } from '../../static/data';
import Header from '../../components/Layout/Header';
import styles from '../../styles/styles';
import { useSearchParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const ShopList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const [shopState, setShopState] = useState('');
  const [filteredShopData, setFilteredShopData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { fetchPharmacies, fetchStates } = useContext(AuthContext);

  console.log('heyyy');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const stateParam = searchParams.get('state');
        console.log(stateParam, 'staee');
        
        const statesData = await fetchStates(); // Fetch the states data
        const pharmaciesData = await fetchPharmacies(); // Fetch the pharmacies data

        setShopState(stateParam);
        
        if (stateParam) {
          // Filter the pharmacies based on the selected state
          const filteredData = pharmaciesData.filter((shop) => shop.state === stateParam);
          setFilteredShopData(filteredData);
        } else {
          setFilteredShopData(pharmaciesData);
        }
        
        setLoading(false);
        setSelectedCategory(stateParam ? stateParam : "All");
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    
    loadData();
  }, [searchParams, fetchPharmacies, fetchStates]);

  console.log(filteredShopData, 'filtered');
  

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
            {filteredShopData && filteredShopData.length > 0 ? (
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
