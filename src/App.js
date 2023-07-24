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

const App = () => {
  return (
    <div className="app">
      {/* <Router> */}
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} path="/dashboard" exact />
        </Route>
          <Route element={<ShopHome />} path="/" />
          <Route element={<Medicines />} path="/medicines" />
          <Route element={<ShopList />} path="/shops" />
        <Route element={<Login />} path="/login" exact />
        <Route element={<Register />} path="/register" exact />
        <Route path="shops/:shopId" element={<ShopDetail />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
};

export default App;
