import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import AddProduct from "./pages/addProduct.jsx";
import ParentComponent from "./components/ParentComponent/ParentComponent.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ParentComponent sidebar={true} childComponent={<Dashboard />} />
            }
          />
          <Route
            path="/customers"
            element={
              <ParentComponent sidebar={true} childComponent={<Customer />} />
            }
          />
          <Route
            path="/products"
            element={
              <ParentComponent sidebar={true} childComponent={<Products />} />
            }
          />
          <Route
            path="/orders"
            element={
              <ParentComponent sidebar={true} childComponent={<Orders />} />
            }
          />
          <Route
            path="addProduct"
            element={
              <ParentComponent sidebar={true} childComponent={<AddProduct />} />
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
