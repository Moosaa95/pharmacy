import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector, useDispatch } from 'react-redux'

// const Header = () => {
//   const [searchItem, setSearchItem] = useState("");
//   const [searchData, setSearchData] = useState(null);

//   const handleSearchChange = (e) => {
//     const item = e.target.value;
//     setSearchItem(item);

//     const filteredProducts =
//       productData &&
//       productData.filter((product) =>
//         product.name.toLowerCase().includes(item.toLowerCase())
//       );
//     setSearchData(filteredProducts);
//   };
//   return (
//     <div className={`${styles.section}`}>
//       <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between ">
//         <div>
//           <Link to="/">
//             <img src="" alt="header" />
//           </Link>
//         </div>

//         <div className="w-[50%] relative">
//           <input
//             type="text"
//             placeholder="Search Product.... "
//             value={searchItem}
//             onChange={handleSearchChange}
//             className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
//           />
//           <AiOutlineSearch
//             size={30}
//             className="absolute right-2 top-1.5 cursor-pointer"
//           />
//           {searchData && searchData.length !== 0 ? (
//             <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
//               {searchData &&
//                 searchData.map((i, index) => {
//                   const d = i.name;

//                   const Product_name = d.replace(/\s+/g, "-");
//                   return (
//                     <Link to={`/product/${Product_name}`}>
//                       <div className="w-full flex items-start-py-3">
//                         <img
//                           src={i.image_Url[0].url}
//                           alt=""
//                           className="w-[40px] h-[40px] mr-[10px]"
//                         />
//                         <h1>{i.name}</h1>
//                       </div>
//                     </Link>
//                   );
//                 })}
//             </div>
//           ) : null}
//         </div>
//       </div>
//     </div>
//   );
// };

const SearchResults = ({ searchData }) => {
  return (
    <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
      {searchData.map((product, index) => {
        const ProductName = product.name.replace(/\s+/g, "-");
        return (
          <Link to={`/product/${ProductName}`} key={index}>
            <div className="w-full flex items-start py-3">
              <img
                src={product.image_Url[0].url}
                alt={product.name}
                className="w-[40px] h-[40px] mr-[10px]"
              />
              <h1>{product.name}</h1>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const Header = ({ activeHeading, selectedCategory }) => {
  const [searchItem, setSearchItem] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [showDropdown, setShowDropDown] = useState(false);
  // const {isAuthenticated, user} = useSelector((state) =>  state.user)

  const isAuthenticated = false; 

  // console.log(selectedCategory, 'select');

  const handleSearchChange = (e) => {
    const item = e.target.value;
    setSearchItem(item);

    // Simulate asynchronous search API call using setTimeout
    setTimeout(() => {
      const filteredProducts = productData.filter((product) =>
        product.name.toLowerCase().includes(item.toLowerCase())
      );
      setSearchData(filteredProducts);
    }, 300); // Add a delay to simulate API call (e.g., 300ms)
  };
  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img src="https://images.unsplash.com/photo-1690040158054-04a19549b43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" alt="header" className="w-[80px]" />
            </Link>
          </div>

          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product.... "
              value={searchItem}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData.length !== 0 ? (
              <SearchResults searchData={searchData} />
            ) : null}
          </div>
          <div className="space-x-2 items-center">
            {!isAuthenticated ? (
              <>
                <div className="inline-block px-4 py-2 bg-green-500 text-white rounded-md transition-colors duration-300 hover:bg-green-600">
              <Link to="/pharmacy">
                <h1 className="text-[#fff] flex items-center">
                  Own a Phamrcy? <IoIosArrowForward className="=ml-1" />
                </h1>
              </Link>
            </div>
            <div className="inline-block px-4 py-2 bg-green-500 text-white rounded-md transition-colors duration-300 hover:bg-green-600">
              <Link to="/register">
                {/* <p className="text-white text-sm">Don't have an account?</p>{" "} */}
                <h1 className="text-white flex items-center">
                  Register <IoIosArrowForward className="ml-1" />
                </h1>
              </Link>
            </div>
            <div className="inline-block px-4 py-2 bg-green-500 text-white rounded-md transition-colors duration-300 hover:bg-green-600">
              <Link to="/login">
                <h1 className="text-[#fff] flex items-center">
                  Sign In <IoIosArrowForward className="=ml-1" />
                </h1>
              </Link>
            </div>
              </>
            ) : null }
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#21c867] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          <div>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-Poppins text-lg font-[500] select-none rounded-t-md`}
                onClick={() => setShowDropDown(!showDropdown)}
              >
                {selectedCategory ?selectedCategory :"All Categories"}
                {showDropdown ? (
                  <IoIosArrowUp size={20} className="cursor-pointer" />
                ) : (
                  <IoIosArrowDown size={20} className="cursor-pointer" />
                )}
              </button>
              {/* <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              /> */}
              {showDropdown && (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              )}
            </div>
          </div>
          {/* navigation */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>
          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-yellow-500 w-4 h-4 top right p-0 m-0 text-white font-Poppins text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-yellow-500 w-4 h-4 top right p-0 m-0 text-white font-Poppins text-[12px] leading-tight text-center">
                  1
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                  <img src="" alt="profile" className="w-[35px] h-[35px] rounded-full" />
                </Link>
                ) : (
                  <Link to="/login">
                  <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
