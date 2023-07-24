import React from "react";
import styles from "../../../styles/styles";

const Sponsored = () => {
  // Replace these URLs with the actual image URLs from medicine companies
  const sponsoredImages = [
    "https://previews.123rf.com/images/vectorgalaxy/vectorgalaxy1805/vectorgalaxy180500907/101157251-pharma-company-logo-isolated-on-white-background-for-your-web-and-mobile-app-design-colorful.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT9XTRXVcGWsHOFyXjWMbMa7dUIutPLyuq4A&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT9XTRXVcGWsHOFyXjWMbMa7dUIutPLyuq4A&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT9XTRXVcGWsHOFyXjWMbMa7dUIutPLyuq4A&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT9XTRXVcGWsHOFyXjWMbMa7dUIutPLyuq4A&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT9XTRXVcGWsHOFyXjWMbMa7dUIutPLyuq4A&usqp=CAU",
    
    // Add more image URLs as needed
  ];

  return (
    <div className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 mt-9 cursor-pointer rounded-xl`}>
      <div className="flex justify-between w-full">
        {sponsoredImages.map((imageUrl, index) => (
          <div className="flex items-start" key={index}>
            <img src={imageUrl} alt={`Company ${index + 1}`} style={{ width: "150px", objectFit: "contain" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsored;
