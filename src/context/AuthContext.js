// // import React, { createContext, useState, useEffect } from "react";
// // import jwt_decode from "jwt-decode";
// // import { useNavigate } from "react-router-dom";

// // const AuthContext = createContext();

// // export default AuthContext;

// // export const AuthProvider = ({ children }) => {
// //   const [authTokens, setAuthTokens] = useState(() => {
// //     return localStorage.getItem("authTokens")
// //       ? JSON.parse(localStorage.getItem("authTokens"))
// //       : null;
// //   });

// //   const [user, setUser] = useState(() => {
// //     return localStorage.getItem("authToken")
// //       ? jwt_decode(localStorage.getItem("authTokens"))
// //       : null;
// //   });

// //   const [loading, setLoading] = useState(true);

// //   const navigate = useNavigate();

// //   const loginUser = async (email, password) => {
// //     const response = await fetch("http://localhost:8000/accounts/api/token/", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({ email, password }),
// //     });
// //     const data = await response.json();

// //     if (response.status === 200) {
// //       localStorage.setItem("authTokens", JSON.stringify(data));
// //       setAuthTokens(data);
// //       const decodedToken = jwt_decode(data.access);
// //       localStorage.setItem("authToken", decodedToken);
// //       setUser(decodedToken);
// //       navigate("/dashboard");
// //       // setAuthTokens(data)
// //       // setUser(jwt_decode(data.access))
// //       // localStorage.setItem("authTokens", JSON.stringify(data))
// //       // navigate.
// //     } else {
// //       console.log("something is wrong");
// //     }
// //   };

// //   const registerUser = async (email, user_name, password, password2) => {
// //     const response = await fetch(
// //       "http://localhost:8000/accounts/api/register/",
// //       {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ email, user_name, password, password2 }),
// //       }
// //     );

// //     const data = await response.json();

// //     if (response.status === 201) {
// //       // Registration successful
// //       loginUser(email, password); // Automatically log in the user after successful registration
// //     } else {
// //       console.log("Something went wrong");
// //     }
// //   };

// //   const logoutUser = () => {
// //     setAuthTokens(null);
// //     setUser(null);
// //     localStorage.removeItem("authTokens");
// //     navigate("/login");
// //   };

// //   const contextData = {
// //     user,
// //     setUser,
// //     authTokens,
// //     setAuthTokens,
// //     registerUser,
// //     loginUser,
// //     logoutUser,
// //   };

// //   useEffect(() => {
// //     if (authTokens) {
// //       setUser(jwt_decode(authTokens.access))
// //     }
// //     setLoading(false)
// //   }, [authTokens, loading])

// //   return (
// //     <AuthContext.Provider value={contextData}>
// //       {loading ? null : children}
// //     </AuthContext.Provider>
// //   );
// // };


import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext


export const AuthProvider = ({ children }) => {
  console.log('autho');
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() => {
    const storedTokens = localStorage.getItem("authTokens");
    return storedTokens ? JSON.parse(storedTokens) : null;
  });

  const [user, setUser] = useState(() => {
    const storedToken = localStorage.getItem("authToken");
    return storedToken ? jwt_decode(storedToken) : null;
  });
 

  // const loginUser = async (email, password) => {
  //   try {
  //     const response = await fetch("http://localhost:8000/accounts/api/token/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     console.log(response, 'pop');

  //     if (response.ok) {
  //       const data = await response.json();
  //       localStorage.setItem("authTokens", JSON.stringify(data));
  //       setAuthTokens(data);
  //       const decodedToken = jwt_decode(data.access);
  //       localStorage.setItem("authToken", decodedToken);
  //       setUser(decodedToken);
  //       navigate("/dashboard");
  //     } else {
  //       console.log("Login failed");
  //     }
  //   } catch (error) {
  //     console.log("Something went wrong during login", error);
  //   }
  // };
  const loginUser = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8000/accounts/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      console.log(response, 'pop');
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authTokens", JSON.stringify(data));
        setAuthTokens(data);
        const decodedToken = jwt_decode(data.access);
        localStorage.setItem("authToken", decodedToken);
        
        if (decodedToken.usertype === "pharmacy") {
          setUser(decodedToken);
          navigate("/dashboard");
        } else if (decodedToken.usertype === "user") {
          setUser(decodedToken);
          navigate("/shop");
        }
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log("Something went wrong during login", error);
    }
  };
  

  const registerUser = async (email, user_name, password, password2, business_name, usertype) => {
    try {
      const response = await fetch("http://localhost:8000/accounts/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, user_name, password, password2, business_name, usertype }),
      });

      if (response.ok) {
        const data = await response.json();
        loginUser(email, password); // Automatically log in the user after successful registration
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.log("Something went wrong during registration", error);
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  const contextData = {
    user,
    authTokens,
    registerUser,
    loginUser,
    logoutUser,
  };


  useEffect(() => {
    if (authTokens) {
      try {
        const decodedToken = jwt_decode(authTokens.access);
        setUser(decodedToken);
      } catch (error) {
        console.log("Invalid token specified:", error.message);
      }
      // setUser(jwt_decode(authTokens.access));
    }
  }, [authTokens]);


  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

// export default AuthContext;


// import {createContext, useState, useEffect} from "react";
// import jwt_decode from "jwt-decode";
// import {useNavigate} from "react-router-dom";
// // const swal = require('sweetalert2')

// const AuthContext = createContext();

// export default AuthContext

// export const AuthProvider = ({ children }) => {
    // const [authTokens, setAuthTokens] = useState(() =>
    //     localStorage.getItem("authTokens")
    //         ? JSON.parse(localStorage.getItem("authTokens"))
    //         : null
    // );
    

    // const [user, setUser] = useState(() => 
    //     localStorage.getItem("authTokens")
    //         ? jwt_decode(localStorage.getItem("authTokens"))
    //         : null
    // );


//     const [loading, setLoading] = useState(true);

//     const history = useNavigate();

//     const loginUser = async (email, password) => {
//         const response = await fetch("http://127.0.0.1:8000/api/token/", {
//             method: "POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body: JSON.stringify({
//                 email, password
//             })
//         })
//         const data = await response.json()
//         console.log(data);

//         if(response.status === 200){
//             console.log("Logged In");
//             setAuthTokens(data)
//             setUser(jwt_decode(data.access))
//             localStorage.setItem("authTokens", JSON.stringify(data))
//             history.push("/")
//             // swal.fire({
//             //     title: "Login Successful",
//             //     icon: "success",
//             //     toast: true,
//             //     timer: 6000,
//             //     position: 'top-right',
//             //     timerProgressBar: true,
//             //     showConfirmButton: false,
//             // })

//         } else {    
//             console.log(response.status);
//             console.log("there was a server issue");
//             // swal.fire({
//             //     title: "Username or passowrd does not exists",
//             //     icon: "error",
//             //     toast: true,
//             //     timer: 6000,
//             //     position: 'top-right',
//             //     timerProgressBar: true,
//             //     showConfirmButton: false,
//             // })
//         }
//     }

//     const registerUser = async (email, username, password, password2) => {
//         const response = await fetch("http://127.0.0.1:8000/api/register/", {
//             method: "POST",
//             headers: {
//                 "Content-Type":"application/json"
//             },
//             body: JSON.stringify({
//                 email, username, password, password2
//             })
//         })
//         if(response.status === 201){
//             history.push("/login")
//             // swal.fire({
//             //     title: "Registration Successful, Login Now",
//             //     icon: "success",
//             //     toast: true,
//             //     timer: 6000,
//             //     position: 'top-right',
//             //     timerProgressBar: true,
//             //     showConfirmButton: false,
//             // })
//         } else {
//             console.log(response.status);
//             console.log("there was a server issue");
//             // swal.fire({
//             //     title: "An Error Occured " + response.status,
//             //     icon: "error",
//             //     toast: true,
//             //     timer: 6000,
//             //     position: 'top-right',
//             //     timerProgressBar: true,
//             //     showConfirmButton: false,
//             // })
//         }
//     }

//     const logoutUser = () => {
//         setAuthTokens(null)
//         setUser(null)
//         localStorage.removeItem("authTokens")
//         history.push("/login")
//         // swal.fire({
//         //     title: "YOu have been logged out...",
//         //     icon: "success",
//         //     toast: true,
//         //     timer: 6000,
//         //     position: 'top-right',
//         //     timerProgressBar: true,
//         //     showConfirmButton: false,
//         // })
//     }

//     const contextData = {
//         user, 
//         setUser,
//         authTokens,
//         setAuthTokens,
//         registerUser,
//         loginUser,
//         logoutUser,
//     }

//     useEffect(() => {
//         if (authTokens) {
//             setUser(jwt_decode(authTokens.access))
//         }
//         setLoading(false)
//     }, [authTokens, loading])

//     return (
//         <AuthContext.Provider value={contextData}>
//             {loading ? null : children}
//         </AuthContext.Provider>
//     )

// }