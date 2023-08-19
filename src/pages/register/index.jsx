// import React, { useContext, useState } from 'react';
// import AuthContext from '../../context/AuthContext';
// import './Register.css'; // Import the CSS file
// // import registrationImage from '../assets/registration-image.png'; // Import the registration image

// const Register = () => {
// const { registerUser } = useContext(AuthContext);
// const [email, setEmail] = useState('');
// const [username, setUsername] = useState('');
// const [password, setPassword] = useState('');
// const [confirmPassword, setConfirmPassword] = useState('');
// const [businessName, setBusinessName] = useState('');
// const [userType, setUserType] = useState('user');
// const [error, setError] = useState('');

// const handleRegister = async (e) => {
//   e.preventDefault();
//   if (password !== confirmPassword) {
//     setError('Passwords do not match');
//     return;
//   }
//   try {
//     await registerUser(email, username, password, confirmPassword, businessName, userType);
//   } catch (error) {
//     setError('Registration failed');
//     console.log('Registration failed', error);
//   }
// };

//   return (
//     <div className="register-container">
//       <div className="register-image-container">
//         <img src={""} alt="Registration" className="register-image" />
//       </div>
//       <div className="register-form-container">
//         <h2>Register</h2>
//         <form onSubmit={handleRegister}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Business Name"
//             value={businessName}
//             onChange={(e) => setBusinessName(e.target.value)}
//           />
//           <select value={userType} onChange={(e) => setUserType(e.target.value)}>
//             <option value="user">User</option>
//             <option value="pharmacy">Pharmacy</option>
//           </select>
//           {error && <p className="error">{error}</p>}
//           <button type="submit">Register</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { React, useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import styles from "../../styles/styles";
import AuthContext from "../../context/AuthContext";
import { IoMdArrowDropdown } from "react-icons/io";
import { toast } from "react-toastify";
// import backgroundImage from "../../path/to/background-image.jpg";
// import loginImage from "../../path/to/login-image.png";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser, fetchStates } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [userType, setUserType] = useState("user");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setconfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const states = await fetchStates();
        setStates(states); // Update state with fetched categories
        setLoading(false);
      } catch (error) {
        console.error("Error fetching states:", error);
        toast.error(error);
      }
    };

    fetchData();
  }, [fetchStates]);

  // const nigerianStates = [
  //   "Abia",
  //   "Adamawa",
  //   "Akwa Ibom" /* ... Add other states here ... */,
  // ];

  const userTypes = [
    // { value: '', label: 'Select a user type' },
    { value: "user", label: "User" },
    { value: "pharmacy", label: "Pharmacy" },
  ];

  const handleSubmit = async (e) => {
    console.log("yes sir");
    e.preventDefault();
    setIsLoading(true);
    // Add your form submission logic here
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    try {
      await registerUser(
        email,
        username,
        password,
        confirmPassword,
        userType,
        state
      );
      setIsLoading(false);
    } catch (error) {
      setError("Registration failed");
      toast.error("failed");
      setIsLoading(false);
      console.log("Registration failed", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 bg-cover bg-center flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1603555501671-8f96b3fce8b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBoYXJtYWN5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60)`,
      }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex items-center">
        {/* <img src={"https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBoYXJtYWN5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"} alt="Register Image" className="mr-4" /> */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Register to your Account
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
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                UserName
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="username"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            {/* <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                User Type
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="usertype"
                  autoComplete="usertype"
                  hidden
                  required
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div> */}
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
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={confirmVisible ? "text" : "password"}
                  name="confirmPassword"
                  autoComplete="current-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {confirmVisible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setconfirmVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setconfirmVisible(true)}
                  />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State
              </label>
              <div className="mt-1">
                <select
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)} // Update selected state
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select a state
                  </option>
                  {loading ? (
                    <option disabled>Loading...</option>
                  ) : (
                    states.map((stat) => (
                      <option key={stat.id} value={stat.id}>
                        {stat.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
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
                  "Register"
                )}
              </button>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Already have an Account?</h4>
              <Link to="/login" className="text-green-600 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
