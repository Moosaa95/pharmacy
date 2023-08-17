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

import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


// const server = "http://localhost:8000"
const server = "https://pharmexxx.pythonanywhere.com"


const AuthContext = createContext();


export default AuthContext;

export const AuthProvider = ({ children }) => {
  console.log("autho");
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() => {
    const storedTokens = localStorage.getItem("authTokens");
    return storedTokens ? JSON.parse(storedTokens) : null;
  });


  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authTokens) {
      try {
        const decodedToken = jwt_decode(authTokens.access);
        setUser(decodedToken);
      } catch (error) {
        console.log("Invalid token specified:", error.message);
        setUser(null); // Set user to null if decoding fails
      }
    } else {
      setUser(null); // Clear user if no authTokens
    }
  }, [authTokens]);


  const loginUser = async (email, password) => {
    try {
      const response = await fetch(
        `${server}/accounts/api/token/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      console.log(response, "pop");

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authTokens", JSON.stringify(data));
        setAuthTokens(data);
        const decodedToken = jwt_decode(data.access);
        localStorage.setItem("authToken", decodedToken);
        toast.success("login successful")

        if (decodedToken.usertype === "pharmacy") {
          setUser(decodedToken);
          navigate("/dashboard");
        } else if (decodedToken.usertype === "user") {
          console.log("hey");
          setUser(decodedToken);
          navigate("/");
        }
      } else {
        console.log("Login failed");
        toast.error("Login failed")
      }
    } catch (error) {
      console.log("Something went wrong during login", error);
    }
  };

  const registerUser = async (
    email,
    user_name,
    password,
    password2,
    usertype,
    state
  ) => {
    try {
      if (password !== password2) {
        toast.error("Passwords do not match");
        return;
      }
  
      const response = await fetch(
        `${server}/accounts/api/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            user_name,
            password,
            password2,
            state,
            usertype,
          }),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        if (data) {
          toast.success(data.message);
        }
        // loginUser(email, password); // Automatically log in the user after successful registration
      } else {
        console.log("Registration failed");
        toast.error("Registration Failed")
      }
    } catch (error) {
      console.log("Something went wrong during registration", error);
    }
  };
  

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${server}/accounts/categories/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return null;
    }
  };


  const fetchDrugs = async () => {
    try {
      const response = await fetch(
        `${server}/accounts/drugs/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching drugs:", error);
      return null;
    }
  };


  const fetchPharmacies = async () => {
    try {
      const response = await fetch(
        `${server}/accounts/pharmacies/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching pharmacies:", error);
      return null;
    }
  };

  const fetchStates = async () => {
    try {
      const response = await fetch(
        `${server}/accounts/states/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching states:", error);
      return null;
    }
  };

  const fetchDeals = async () => {
    try {
      const response = await fetch(
        `${server}/accounts/best-deal/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching deal:", error);
      return null;
    }
  };


  const fetchPharmacy = async (pharmacy_id) => {
    try {
      const response = await fetch(
        `${server}/accounts/pharmacy/?pharmacy_id=${pharmacy_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching pharmacy:", error);
      return null;
    }
  };

  const fetchPharmacyDrugs = async (pharmacy_id) => {
    try {
      const response = await fetch(
        `${server}/accounts/pharmacydrugs/?pharmacy_id=${pharmacy_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); 

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching drugs:", error);
      return null;
    }
  };

  const createOrder = async (formData) => {
    try {
      const response = await fetch(`${server}/accounts/create-order/`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json;  charset=UTF-8',
        // },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      return null;
    }
  };

  const savePrescription = async (formData) => {
    try {
      const response = await fetch(`${server}/accounts/save-prescription/`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        // },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating prescription:', error);
      return null;
    }
  };

  const updateProfile = async (formData) => {
    try {
        const response = await fetch(`${server}/accounts/update-profile/`, {
            method: 'POST',
            // headers: {
            //   'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
            // },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Show a success toast message
        toast.success('Profile updated successfully');

        return data;
    } catch (error) {
        console.error('Error updating profile:', error);

        // Show an error toast message
        toast.error('Error updating profile');

        return null;
    }
};


const fetchProfile = async (user_id) => {
  try {
    const response = await fetch(
      `${server}/accounts/get-profile/?user_id=${user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

const fetchOrder = async (user_id) => {
  try {
    const response = await fetch(
      `${server}/accounts/get-order/?user_id=${user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
};

const fetchDrug = async (drug_id) => {
  try {
    const response = await fetch(
      `${server}/accounts/get-drug/?drug_id=${drug_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching drug:", error);
    return null;
  }
};

const changePassword = async (formData) => {
  try {
    const response = await fetch(`${server}/accounts/change-password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;  charset=UTF-8',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error change password not successful:', error);
    return null;
  }
};


  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("lastestOrders");
    navigate("/login");
  };

  const contextData = {
    user,
    authTokens,
    registerUser,
    loginUser,
    logoutUser,
    fetchCategories,
    fetchDrugs,
    fetchPharmacies,
    fetchStates,
    fetchPharmacy,
    fetchPharmacyDrugs,
    fetchDeals,
    createOrder,
    savePrescription,
    updateProfile, 
    fetchProfile,
    fetchOrder,
    changePassword,
    fetchDrug,
  };


 

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

  // useEffect(() => {
  //   if (authTokens) {
  //     try {
  //       const decodedToken = jwt_decode(authTokens.access);
  //       setUser(decodedToken);
  //     } catch (error) {
  //       console.log("Invalid token specified:", error.message);
  //     }
  //     // setUser(jwt_decode(authTokens.access));
  //   }
  // }, [authTokens]);

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
