

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";


const Location = ({ locationData, setDropDown }) => {
  const navigate = useNavigate();

  const handleSubmit = (location) => {
    navigate(`/shops?location=${location}`);
    setDropDown(false);
    // Avoid using window.location.reload() as it reloads the entire page. Instead, let the React Router handle the navigation.
  };

  return (
    <div className="pb-4 w-72 bg-white absolute z-30 rounded-b-md shadow-sm">
      {locationData.map((location) => (
        <div
          className={`${styles.normalFlex} cursor-pointer py-2 px-4 hover:bg-gray-100`}
          key={location.id}
          onClick={() => handleSubmit(location.title)}
        >
          <img
            src={location.image_Url}
            style={{
              width: "30%",
              height: "auto",
              objectFit: "contain",
              marginLeft: "10px",
              userSelect: "none",
            }}
            alt=""
          />
          <h3 className="ml-3 select-none">{location.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Location;

