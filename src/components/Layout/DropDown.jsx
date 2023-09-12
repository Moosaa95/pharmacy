// import React from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "../../styles/styles";

// const DropDown = ({ categoriesData, setDropDown }) => {
//   const navigate = useNavigate();

//   const handleSubmit = (i) => {
//     navigate(`/medicines?category=${i.title}`);
//     setDropDown(false);
//     window.location.reload();
//   };
//   return (
//     <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
//       {categoriesData &&
//         categoriesData.map((i, index) => (
//           <div
//             className={`${styles.normalFlex}`}
//             key={index}
//             onClick={() => handleSubmit(i)}
//           >
//             <img
//               src={i.image_Url}
//               style={{
//                 width: "25%",
//                 height: "25%",
//                 objectFit: "contain",
//                 marginLeft: "10px",
//                 userSelect: "none",
//               }}
//               alt=""
//             />
//             <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default DropDown;

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown, endpoint }) => {
  const navigate = useNavigate();

  console.log('nav drop down', categoriesData);

  const handleSubmit = (category) => {
    navigate(`/medicines?category=${category}`);
    setDropDown(false);
    // Avoid using window.location.reload() as it reloads the entire page. Instead, let the React Router handle the navigation.
  };

  return (
    <div className="pb-4 w-[270px] bg-white absolute z-30 rounded-b-md shadow-sm">
      {categoriesData && categoriesData.map((category, index) => (
        <div
          className={`${styles.normalFlex} cursor-pointer py-2 px-4 hover:bg-gray-100`}
          key={index}
          onClick={() => handleSubmit(category.name)}
        >
          <img
            src={category.image}
            style={{
              width: "30%",
              height: "auto",
              objectFit: "contain",
              marginLeft: "10px",
              userSelect: "none",
            }}
            alt=""
          />
          <h3 className="ml-3 select-none">{category.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default DropDown;

