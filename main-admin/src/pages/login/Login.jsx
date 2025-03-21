import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("authToken", data.token);
        setIsAuthenticated(true);

        // Redirect based on role
        if (data.role === "main") {
          navigate("/admin/approval");
        } else {
          navigate("/ecommerce");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="body1">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-2" />
          <div className="col-lg-6 col-md-8 login-box">
            <div className="col-lg-12 login-key">
              <i className="fa fa-key" aria-hidden="true" />
            </div>
            <div className="col-lg-12 login-title">ADMIN PANEL</div>
            <div className="col-lg-12 login-form">
              <form onSubmit={handleLogin} className="loginform">
                <div className="form-group">
                  <label htmlFor='email' className="form-control-label">EMAIL</label>
                  <input
                    type="email"
                    className="form-control login-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    id="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="form-control-label">PASSWORD</label>
                  <input
                    type="password"
                    className="form-control login-pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    id="password"
                  />
                </div>
                <div className="col-lg-12 loginbttm">
                  <div className="col-lg-12 login-btm login-button">
                    <button type="submit" className="btn btn-outline-primary">
                      Login
                    </button>
                  </div>
                </div>
                <div className="text-white text-center mb-4">
                  Don't have an account?
                  <span
                    onClick={handleSignUp}
                    style={{
                      color: "#0DB8DE",
                      cursor: "pointer",
                      paddingLeft: "3px",
                    }}
                  >
                    SignUp here
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
