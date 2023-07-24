// import { useContext, useState } from "react";
// import AuthContext from "../context/AuthContext";

// const Register = () => {
//     const { registerUser } = useContext(AuthContext);
//     const [email, setEmail] = useState('');
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
  
//     const handleRegister = async (e) => {
//       e.preventDefault();
//       if (password !== confirmPassword) {
//         console.log('Passwords do not match');
//         return;
//       }
//       try {
//         await registerUser(email, username, password, confirmPassword);
//       } catch (error) {
//         console.log('Registration failed', error);
//       }
//     };
  
//     return (
//       <div>
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
//           <button type="submit">Register</button>
//         </form>
//       </div>
//     );
//   };
  
//   export default Register;
  


// import React, { useContext, useState } from 'react';
// import AuthContext from '../context/AuthContext';

// const Register = () => {
//   const { registerUser } = useContext(AuthContext);
//   const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [userType, setUserType] = useState('user');

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       console.log('Passwords do not match');
//       return;
//     }
//     try {
//       const formData = new FormData();
//       formData.append('email', email);
//       formData.append('username', username);
//       formData.append('password', password);
//       formData.append('confirmPassword', confirmPassword);
//       formData.append('userType', userType);

//       console.log(formData.get("email"), 'b')

//       await registerUser(formData);
//     } catch (error) {
//       console.log('Registration failed', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//         <select value={userType} onChange={(e) => setUserType(e.target.value)}>
//           <option value="user">User</option>
//           <option value="pharmacy">Pharmacy</option>
//         </select>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
