import React, { useState } from "react";
import axios from "axios";
import "./css/Login.css";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/login`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        console.log("Đăng nhập thành công:", response.data);

        navigate("/dashboard");
      }
    } catch (error) {
      console.error(
        "Lỗi đăng nhập:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage("Vui lòng kiểm tra chính xác thông tin đăng nhập.");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Đăng nhập</h1>
        <div className="login-form">
          <input
            name="email"
            type="text"
            placeholder="Email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            autoComplete="current-password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            style={{
              position: "absolute",
              top: "40%",
              right: "80px",

              cursor: "pointer",
            }}
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <RiEyeCloseLine size={30} color="#808080" />
            ) : (
              <RiEyeLine size={30} color="#808080" />
            )}
          </span>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="button" onClick={handleLogin}>
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default Login;
