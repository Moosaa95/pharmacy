import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className={`${styles.normalFlex}`}>
      {navItems &&
        navItems.map((item, index) => (
          <div key={index} className="mx-4">
            <Link
              to={item.url}
              className={`${
                active === index + 1 ? "text-yellow-500" : "text-white"
              } font-semibold text-lg px-4 py-2 rounded transition-colors duration-300 hover:text-yellow-500`}
            >
              {item.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
