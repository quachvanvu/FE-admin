import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:1406/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Đăng nhập thành công:", response.data);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error(
        "Lỗi đăng nhập:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage("Vui lòng kiểm tra chính xác thông tin đăng nhập.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Đăng nhập</h1>
        <div className="login-form">
          <input
            type="text"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={`password-toggle-icon ${
                showPassword ? "visible" : "hidden"
              }`}
              onClick={togglePasswordVisibility}
            >
              👁️
            </i>
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleLogin}>Đăng nhập</button>
      </div>
    </div>
  );
};

export default Login;
