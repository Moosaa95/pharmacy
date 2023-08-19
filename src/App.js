import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoute";
// import Login from "./components/Login";
// import Register from "./components/Register";
import "./App.css";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import ShopHome from "./pages/shophome";
import Medicines from "./pages/medicines/Index";
import ShopList from "./pages/shops";
import ShopDetail from "./pages/shop-details/ShopDetail";
import { MedicineDetailPage } from "./pages/medicine-detail/MedicineDetail";
import ForgotPassword from "./pages/forgot-password";
import VerifySuccess from "./pages/verify-success";
import Profile from "./pages/profile";
import CheckoutPage from "./pages/checkout";
import PaymentPage from "./pages/payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import OrderSuccessPage from "./pages/order-success/OrderSuccessPage";

const App = () => {
  const [stripeKey, setStripeKey] = useState("");

  async function getStripeKey() {
    setStripeKey("pk_test_51Ht2LZEgtC2DrQ3YXgX734Wnx5vQjZGQCQu7fM0CKlYXpbsyP7jDWGb8RFXa7yNzBuPTlCQt0enDUwa2rumzYQPf00b4NFPy4M");
  }

  useEffect(() => {
    getStripeKey();
  }, []);

  return (
    <div className="app">
      {/* <Router> */}
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} path="/dashboard" exact />
          <Route element={<Medicines />} path="/medicines" />
          <Route element={<ShopList />} path="/shops" />
          <Route path="shop/:pharmacyId" element={<ShopDetail />} />
          <Route path="medicine/:medicineId" element={<MedicineDetailPage />} />
          {/* <Route path="category/:medicineId" element={<CategoryPage />} /> */}
          <Route exact path="/profile" element={<Profile />} />
        <Route path="/order/success" element={<OrderSuccessPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/payment"
            element={
              <Elements stripe={loadStripe(stripeKey)}>
                <PaymentPage />
              </Elements>
            }
          />
        </Route>
        <Route element={<ShopHome />} path="/" exact />
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/accounts/api/activate/:uidb64/:token" element={<VerifySuccess />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
};

export default App;
