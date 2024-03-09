import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customer from './pages/Customer';
import Products from './pages/Products';
import Orders from './pages/Orders';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/products" element={<Products />} />
          <Route path="/order" element={<Orders />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
