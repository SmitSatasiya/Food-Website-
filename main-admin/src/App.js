import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  Ecommerce,
  Products,
  Orders,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  AddProduct,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorMapping,
} from "./pages";
import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import AdminApproval from "./pages/AdminApproval/AdminApproval.js";

const App = () => {
  const url = "http://localhost:4000";
  const url = "https://food-del-backend-3vxn.onrender.com";
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }

    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {isAuthenticated && activeMenu && (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          )}
          {isAuthenticated && !activeMenu && (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}

          {/* Main content */}
          <div
            className={
              isAuthenticated
                ? activeMenu
                  ? "dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full"
                  : "bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2"
                : "bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2"
            }
          >
            {isAuthenticated && (
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
            )}

            <div>
              {themeSettings && <ThemeSettings />}
              <Routes>
                {/* Public Routes */}
                <Route
                  path="/login"
                  element={<Login setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    isAuthenticated ? <Ecommerce /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/ecommerce"
                  element={
                    isAuthenticated ? <Ecommerce /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/products"
                  element={
                    isAuthenticated ? (
                      <Products url={url} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/employees"
                  element={
                    isAuthenticated ? (
                      <Employees url={url} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/customers"
                  element={
                    isAuthenticated ? (
                      <Customers url={url} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/addProduct"
                  element={
                    isAuthenticated ? (
                      <AddProduct url={url} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/orders"
                  element={
                    isAuthenticated ? (
                      <Orders url={url} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/orders"
                  element={
                    isAuthenticated ? (
                      <Orders url={url} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/admin/approval"
                  element={
                    isAuthenticated ? (
                      <AdminApproval url={url} />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                {/* Charts */}
                <Route
                  path="/line"
                  element={
                    isAuthenticated ? <Line /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/area"
                  element={
                    isAuthenticated ? <Area /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/bar"
                  element={isAuthenticated ? <Bar /> : <Navigate to="/login" />}
                />
                <Route
                  path="/pie"
                  element={isAuthenticated ? <Pie /> : <Navigate to="/login" />}
                />
                <Route
                  path="/financial"
                  element={
                    isAuthenticated ? <Financial /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/color-mapping"
                  element={
                    isAuthenticated ? (
                      <ColorMapping />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/pyramid"
                  element={
                    isAuthenticated ? <Pyramid /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/stacked"
                  element={
                    isAuthenticated ? <Stacked /> : <Navigate to="/login" />
                  }
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
