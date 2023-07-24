// import React from "react";
// import {
//   AiFillFacebook,
//   AiFillInstagram,
//   AiFillYoutube,
//   AiOutlineTwitter,
// } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import {
//   footercompanyLinks,
//   footerProductLinks,
//   footerSupportLinks,
// } from "../../static/data";

// const Footer = () => {
//   return (
//     <div className="bg-[#000] text-white">
//       <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7">
//         <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
//           <span className="text-[#56d879]">Subscribe</span> us for get news{" "}
//           <br />
//           events and offers
//         </h1>
//         <div>
//           <input
//             type="text"
//             required
//             placeholder="Enter your email..."
//             className="text-gray-800
//                 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
//           />
//           <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-whie md:w-auto w-full">
//             Submit
//           </button>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
//         <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
//           <img
//             src=""
//             alt="compnay name"
//             style={{ filter: "brightness(0) invert(1)" }}
//           />
//           <br />
//           <p>The home and elements needeed to create beatiful products.</p>
//           <div className="flex items-center mt-[15px]">
//             <AiFillFacebook size={25} className="cursor-pointer" />
//             <AiOutlineTwitter
//               size={25}
//               style={{ marginLeft: "15px", cursor: "pointer" }}
//             />
//             <AiFillInstagram
//               size={25}
//               style={{ marginLeft: "15px", cursor: "pointer" }}
//             />
//             <AiFillYoutube
//               size={25}
//               style={{ marginLeft: "15px", cursor: "pointer" }}
//             />
//           </div>
//         </ul>

//         <ul className="text-center sm:text-start">
//           <h1 className="mb-1 font-semibold">Company</h1>
//           {footerProductLinks.map((link,index) => (
//             <li key={index}>
//               <Link
//                 className="text-gray-400 hover:text-teal-400 duration-300
//                    text-sm cursor-pointer leading-6"
//                 to={link.link}
//               >
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         <ul className="text-center sm:text-start">
//           <h1 className="mb-1 font-semibold">Shops</h1>
//           {footercompanyLinks.map((link,index) => (
//             <li key={index}>
//               <Link
//                 className="text-gray-400 hover:text-teal-400 duration-300
//                    text-sm cursor-pointer leading-6"
//                 to={link.link}
//               >
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>

        
//       </div>

//       <div
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
//          text-center pt-2 text-gray-400 text-sm pb-8"
//       >
//         <span>© 2023 All rights reserved.</span>
//         <span>Terms · Privacy Policy</span>
        
//       </div>
//     </div>
//   );
// };

// export default Footer;


import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { footerCompanyLinks, footerProductLinks } from "../../static/data";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="px-8 py-12 md:flex md:justify-between md:items-center">
        <div className="md:w-2/5">
          <h1 className="lg:text-4xl text-3xl font-semibold">
            <span className="text-[#56d879]">Subscribe</span> for news, events, and offers
          </h1>
          <div className="mt-4 flex items-center">
            <input
              type="text"
              required
              placeholder="Enter your email..."
              className="w-full sm:w-72 py-2.5 px-4 rounded focus:outline-none"
            />
            <button className="ml-4 bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded text-white">
              Submit
            </button>
          </div>
        </div>
        <div className="mt-8 md:mt-0">
          <h1 className="text-xl font-semibold mb-4">Follow Us</h1>
          <div className="flex items-center space-x-4">
            <AiFillFacebook size={30} className="cursor-pointer" />
            <AiOutlineTwitter size={30} className="cursor-pointer" />
            <AiFillInstagram size={30} className="cursor-pointer" />
            <AiFillYoutube size={30} className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-8">
        <ul className="text-center sm:text-left">
          <h1 className="text-xl font-semibold mb-4">Company</h1>
          {footerProductLinks.map((link, index) => (
            <li key={index} className="mb-3">
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-left">
          <h1 className="text-xl font-semibold mb-4">Shops</h1>
          {footerCompanyLinks.map((link, index) => (
            <li key={index} className="mb-3">
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* Add more columns as needed */}
      </div>
      <div className="flex justify-between items-center px-8 pb-4 text-gray-400 text-sm">
        <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
      </div>
    </footer>
  );
};

export default Footer;
