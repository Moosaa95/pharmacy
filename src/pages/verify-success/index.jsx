// Create a new file named "VerifySuccess.js"
import React from "react";
import { Link } from "react-router-dom";

const VerifySuccess = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-semibold mb-6">Verification Successful</h2>
        <p className="text-green-600 mb-4">Your account has been successfully verified!</p>
        <p>You can now log in and access your account.</p>
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
