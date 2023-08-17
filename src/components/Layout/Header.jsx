import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { productData } from "../../static/data";
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
import { useSelector, useDispatch } from "react-redux";
import Cart from "../cart/Cart";
import WishList from "../wishlist/WishList.jsx";
import { RxCross2 } from "react-icons/rx";
import AuthContext from "../../context/AuthContext";

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
          <Link to={`/medicine/${ProductName}`} key={index}>
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

const Header = ({
  activeHeading,
  selectedCategory,
  categoriesData,
  endpoint,
}) => {
  const [searchItem, setSearchItem] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [showDropdown, setShowDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    email: "",
    phone: "",
    state: "",
  });
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  // const {isAuthenticated, user} = useSelector((state) =>  state.user)
  const { user, fetchProfile } = useContext(AuthContext);

  console.log('user now', user);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await fetchProfile(user.user_id);
        if (profile) {
          const {first_name, last_name, middle_name, image, phone, state, email} = profile;
          setUsers({
            first_name: first_name,
            last_name: last_name,
            middle_name: middle_name,
            email: email,
            phone: phone,
            state: state,
            image:image
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, [fetchProfile, user]);

  console.log(user, "this is header user ");

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
              <img
                src="https://images.unsplash.com/photo-1690040158054-04a19549b43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
                alt="header"
                className="w-[80px]"
              />
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
            {!user ? (
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
            ) : null}
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
                {selectedCategory ? selectedCategory : "All"}
                {showDropdown ? (
                  <IoIosArrowUp size={20} className="cursor-pointer" />
                ) : (
                  <IoIosArrowDown size={20} className="cursor-pointer" />
                )}
              </button>
              {showDropdown && (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                  endpoint={endpoint}
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
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishList(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-yellow-500 w-4 h-4 top right p-0 m-0 text-white font-Poppins text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-yellow-500 w-4 h-4 top right p-0 m-0 text-white font-Poppins text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {user  ? (
                  <Link to="/profile">
                    <img
                      src={users && users.image}
                      alt="profile"
                      className="w-[35px] h-[35px] rounded-full"
                    />
                  </Link>
                ) : (
                  <Link to="/profile">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
            <div className="bg-green-500 p-4 text-white">
              <h1 className="text-1xl font-semibold">
                Welcome {user ?  user.first_name : "user"}
              </h1>
            </div>
            {/* carts */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            {/* white list */}
            {openWishList ? (
              <WishList setOpenWishList={setOpenWishList} />
            ) : null}
          </div>
        </div>
      </div>
      {/* mobile */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } w-full h-[60px]  bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img src="https://images.unsplash.com/photo-1690040158054-04a19549b43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" alt="logo" className="mt-3 cursor-pointer w-[35px] h-[36px]" />
            </Link>
          </div>
          <div>
            <div className="relative mr-[20px]"  onClick={() => setOpenCart(true)}>
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-yellow-500 w-4 h-4 top right p-0 m-0 text-white font-Poppins text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishList ? <WishList setOpenWishList={setOpenWishList} /> : null}
        </div>
        {/* header siderbar */}
        {open && (
          <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
            <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 transform transition-transform ease-in-out duration-300">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-[15px]" onClick={() => setOpenWishList(true) || setOpen(false)}>
                    <AiOutlineHeart
                      size={30}
                      className="mt-5 ml-3 transform transition-transform hover:scale-110"
                    />
                    <span className="absolute right-0 top-0 rounded-full bg-yellow-500 w-4 h-4 top right p-0 m-0 text-white font-Poppins text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross2
                  size={30}
                  className="ml-4 mt-5 cursor-pointer transform transition-transform hover:scale-110"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="my-8 w-[92%] m-auto h-[40px] relative">
                <input
                  type="text"
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  placeholder="Search for drugs"
                  value={searchItem}
                  onChange={handleSearchChange}
                />
                {searchData.length !== 0 ? (
                  <SearchResults searchData={searchData} />
                ) : null}
              </div>
              <Navbar active={activeHeading} />
              <br />
              <br />

              <div className="space-x-2 pt-10 items-center">
                {!user ? (
                  <>
                    <div className="inline-block m-4 px-4 py-2 bg-green-500 text-white rounded-[4px] transition-colors duration-300 hover:bg-green-600">
                      <Link to="/pharmacy">
                        <h1 className="text-[#fff] flex items-center">
                          Own a Phamrcy? <IoIosArrowForward className="=ml-1" />
                        </h1>
                      </Link>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="flex w-full justify-around">
                      <Link to="/register">
                        {/* <p className="text-white text-sm">Don't have an account?</p>{" "} */}
                        <h1 className="text-[18px] text-[#000000b7] flex items-center">
                          Register
                        </h1>
                      </Link>
                      <Link to="/login">
                        <h1 className="text-[18px] text-[#000000b7] flex items-center">
                          Sign In
                        </h1>
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center">
                    <Link to="/profile">
                      <img
                        src={users && users.image}
                        alt="profile pic"
                        className="w-[60px] h-[60px] rounded-full border-[#0eac88] border-[3px]"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
