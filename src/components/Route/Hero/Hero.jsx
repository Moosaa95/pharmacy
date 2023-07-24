// import React from 'react'
// import styles from '../../../styles/styles'
// import { Link } from 'react-router-dom'

// const Hero = () => {
//   return (
//     <div className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
//         style={{
//             backgroundImage: "url(https://images.unsplash.com/photo-1555633514-abcee6ab92e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60)"
//         }}
//     >
//         <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
//             <h1 className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}>
//                 Best Collection for <br /> Pharmacy
//             </h1>
//             <p className='pt-5 text-[16px] font-Poppins font-[400] text-[#000000ba]'>
//                 Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, aliquid et velit corrupti officia ipsum nulla molestiae voluptates adipisci ad architecto, voluptatibus, eligendi nihil? Eius repellendus vel magni sequi minima.
//             </p>
//             <Link to="/medicines" className='inline'>
//                 <div className={`${styles.button} mt-5`}>
//                     <span className='text-[#fff] font-Poppins text-[18px]'>
//                         Buy Now
//                     </span>

//                 </div>
//             </Link>

//         </div>


//     </div>
//   )
// }

// export default Hero
// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from '../../../styles/styles';

// const Hero = () => {
//   return (
//     <div
//       className={`relative min-h-[70vh] md:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
//       style={{
//         backgroundImage: "url(https://images.unsplash.com/photo-1555633514-abcee6ab92e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60)",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className={`${styles.section} w-full md:w-[60%] max-w-[800px] mx-auto text-center`}>
//         <h1 className="text-4xl md:text-6xl font-bold text-[#3d3a3a] capitalize leading-tight">
//           Best Collection for <br /> Pharmacy
//         </h1>
//         <p className="my-6 text-lg md:text-xl font-light text-[#000000ba]">
//           Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, aliquid et velit corrupti officia ipsum nulla molestiae voluptates adipisci ad architecto, voluptatibus, eligendi nihil? Eius repellendus vel magni sequi minima.
//         </p>
//         <Link to="/medicines" className="inline-block">
//           <div className={`${styles.button} mt-5 px-6 py-2`}>
//             <span className="text-white font-semibold text-lg">
//               Buy Now
//             </span>
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Hero;

import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/styles';

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] md:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
      style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1555633514-abcee6ab92e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={`${styles.section} w-full md:w-[60%] max-w-[800px] mx-auto text-center`}>
        <h1 className="text-4xl md:text-6xl font-bold text-[#3d3a3a] capitalize leading-tight">
          Discover Your Health Essentials
        </h1>
        <p className="my-6 text-lg md:text-xl font-bold text-[#000000ba] ">
          Welcome to our online pharmacy, where your health and well-being are our top priorities. Find a wide range of high-quality medicines, healthcare products, and personal care items all at your fingertips. From vitamins to prescription medications, we have everything you need to support your health journey.
        </p>
        <Link to="/medicines" className="inline-block">
          <div className={`${styles.button} mt-5 px-6 py-2`}>
            <span className="text-white font-semibold text-lg">
              Explore
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
