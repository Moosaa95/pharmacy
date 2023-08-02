// import React, { useState, useContext } from 'react';
// import AuthContext from '../../context/AuthContext';
// import "./Login.css"
// // import loginImage from '../../assets/login-image.png'; // Import the login image

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const { loginUser } = useContext(AuthContext);

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     loginUser(email, password);
//   };

//   return (
//     <div className="login-container">
//       <div className="login-image-container">
//         <img src={""} alt="Login" className="login-image" />
//       </div>
//       <div className="login-form-container">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="email">Email:</label>
//             <input type="email" id="email" value={email} onChange={handleEmailChange} required />
//           </div>
//           <div>
//             <label htmlFor="password">Password:</label>
//             <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
//           </div>
//           <div>
//             <button type="submit">Login</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import { React, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import styles from "../../styles/styles";

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [visible, setVisible] = useState(false);
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Login to your Account
//         </h2>
//       </div>
//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6">
// <div>
//   <label
//     htmlFor="email"
//     className="block text-sm font-medium text-gray-700"
//   >
//     Email Address
//   </label>
//   <div className="mt-1">
//     <input
//       type="email"
//       name="email"
//       autoComplete="email"
//       required
//       value={email}
//       onChange={e=> setEmail(e.target.value)}
//       className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//     />
//   </div>
// </div>
// <div>
//   <label
//     htmlFor="password"
//     className="block text-sm font-medium text-gray-700"
//   >
//     Password
//   </label>
//   <div className="mt-1 relative">
//     <input
//       type={visible ? "text" : "password"}
//       name="password"
//       autoComplete="current-password"
//       required
//       value={password}
//       onChange={(e) => setPassword(e.target.value)}
//       className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//     />
//     {visible ? (
//       <AiOutlineEye
//         className="absolute right-2 top-2 cursor-pointer"
//         size={25}
//         onClick={() => setVisible(false)}
//       />
//     ) : (
//       <AiOutlineEyeInvisible
//         className="absolute right-2 top-2 cursor-pointer"
//         size={25}
//         onClick={() => setVisible(true)}
//       />
//     )}
//   </div>
//   </div>

//   <div className={`${styles.normalFlex} justify-between`}>
//   <div className={`${styles.normalFlex}`}>
//     <input
//       type="checkbox"
//       name="remember-me"
//       id="remember-me"
//       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//     />
//     <label
//       htmlFor="remember-me"
//       className="ml-2 block text-sm text-gray-900"
//     >
//       Remember me
//     </label>
//   </div>
//   <div className="text-sm">
//     <a
//       href=".forgot-password"
//       className="font-medium text-blue-600 hover:text-blue-500"
//     >
//       Forgot your password?
//     </a>
//   </div>
// </div>
// <div>
//   <button
//     type="submit"
//     className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
//   >
//     Submit
//   </button>
// </div>
// <div className={`${styles.normalFlex} w-full`}>
//   <h4>Not have any account?</h4>
//   <Link to="/sign-up" className="text-blue-600 pl-2">
//     Sign Up
//   </Link>
// </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { React, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import AuthContext from "../../context/AuthContext";
import { useEffect } from "react";
// import backgroundImage from "../../path/to/background-image.jpg";
// import loginImage from "../../path/to/login-image.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = true;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here4
    loginUser(email, password);
  };

  const { loginUser } = useContext(AuthContext);

  //   const handleEmailChange = (event) => {
  //     setEmail(event.target.value);
  //   };

  //   const handlePasswordChange = (event) => {
  //     setPassword(event.target.value);
  //   };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     loginUser(email, password);
  //   };

  return (
    <div
      className="min-h-screen bg-gray-50 bg-cover bg-center flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1603555501671-8f96b3fce8b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBoYXJtYWN5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60)`,
      }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex items-center">
        {/* <img src={"https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBoYXJtYWN5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"} alt="Login Image" className="mr-4" /> */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Login to your Account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              {/* <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Forgot your password?
                </a>
              </div> */}
              <div className="text-sm">
                {/* Add the link to the Forgot Password page */}
                <Link
                  to="/forgot-password"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            {/* <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div> */}
            {/* <div className={`${styles.normalFlex} w-full`}>
              <h4>Not have any account?</h4>
              <Link to="/sign-up" className="text-blue-600 pl-2">
                Sign Up
              </Link>
            </div> */}

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-900"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10-10.582A7.962 7.962 0 0120 12h4c0-6.627-5.373-12-12-12v4zm2 5.291l3 2.647C22.865 17.824 24 15.042 24 12h-4a7.962 7.962 0 01-2 5.291z"
                    ></path>
                  </svg>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Don't have an account?</h4>
              <Link to="/register" className="text-green-600 pl-2">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
