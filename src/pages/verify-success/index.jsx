import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";

const VerifySuccess = () => {
  const { uidb64, token } = useParams();
  const { ActivateAccount } = useContext(AuthContext);
  const [verificationStatus, setVerificationStatus] = useState("pending"); // possible values: "pending", "success", "error"
  const [verificationMsg, setVerificationMsg] = useState(""); // possible values: "pending", "success", "error"

  useEffect(() => {
    // Call the account verification logic
    const activateAccount = async () => {
      try{

        const activate = await ActivateAccount(uidb64, token);
        console.log(activate, "this is activate");
          if (activate && activate.status === true){
            setVerificationStatus(true)
            setVerificationMsg(activate.message)
          }else{
            setVerificationStatus(false)
            setVerificationMsg(activate.message)
          }
        // if (activate?.status){
        // }else{
        //   setVerificationStatus(activate.message)
        // }
      }
      catch (error){
        toast.error(error)
        setVerificationMsg('try again')
        console.log(error, 'catch');
      }
    };
    // .then((response) => {
    //   if (response.status === 200) {
    //     setVerificationStatus("success");
    //   } else {
    //     setVerificationStatus("error");
    //   }
    // })
    // .catch(() => {
    //   setVerificationStatus("error");
    // });
    activateAccount();
  }, [uidb64, token]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-semibold mb-6">
          {verificationStatus === true
            ? "Verification Successful"
            : "Verification Error"}
        </h2>
        {verificationStatus === true ? (
          <>
            <p className="text-green-600 mb-4">
              {verificationMsg}
            </p>
            <p>You can now log in and access your account.</p>
          </>
        ) : (
          <p className="text-red-600 mb-4">
            {verificationMsg} 
          </p>
        )}
        {/* Add a button to redirect to the login page */}
        <Link
          to="/login"
          className="block mt-6 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default VerifySuccess;
