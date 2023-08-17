import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const StarRating = ({ rating }) => {
  const MAX_STARS = 5;
  const filledStars = Math.floor(rating);
  const remainingStars = MAX_STARS - filledStars;




  const filledStarIcons = Array.from({ length: filledStars }, (_, index) => (
    <AiFillStar
      key={index}
      size={20}
      color="#f6ba68"
      className="mr-2 cursor-pointer"
    />
  ));

  const remainingStarIcons = Array.from({ length: remainingStars }, (_, index) => (
    <AiOutlineStar
      key={index}
      size={20}
      color="#f6ba68"
      className="mr-2 cursor-pointer"
    />
  ));

  return (
    <div className="flex">
      {filledStarIcons}
      {remainingStarIcons}
    </div>
  );
};

export default StarRating;
