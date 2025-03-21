import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const url = "http://localhost:4000"; // backend URL
  const url = "https://food-del-backend-3vxn.onrender.com"; // backend URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/admin/register`, {
        name: username,
        email,
        password,
      });

      if (response.data.success) {
        toast.success(
          "Registration successful! Awaiting approval from the main admin."
        );
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error during registration: " + error.message);
    }
  };

  const handleSignIn = () => {
    navigate("/login");
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
              <form onSubmit={handleSubmit} className="loginform">
                <div className="form-group">
                  <label htmlFor="username" className="form-control-label">USERNAME</label>
                  <input
                    type="text"
                    className="form-control login-email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    id="username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-control-label">EMAIL</label>
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
                      Submit
                    </button>
                  </div>
                </div>
                <div className="text-white text-center mb-4">
                  Already have an account?
                  <span
                    onClick={handleSignIn}
                    style={{
                      color: "#0DB8DE",
                      cursor: "pointer",
                      paddingLeft: "3px",
                    }}
                  >
                    Login here
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

export default Register;
