import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", {
        success,
        orderId,
      });

      // Check if the response indicates success
    //   if (response.data.success) {
    //     navigate("https://food-del-frontend-i13g.onrender.com/myorders");
    //   } else {
    //     navigate("/");
    //     // navigate("https://food-del-frontend-i13g.onrender.com/");
    //   }
    // } catch (error) {
    //   console.error("Error verifying payment:", error);
    //   navigate("/");
    // }
       // Navigate based on success response
      if (response.data.success) {
        navigate("/myorders"); // Change this to the correct route
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      navigate("/");
    }
  }, [url, success, orderId, navigate]);
  };

  useEffect(() => {
    verifyPayment();
  }, [verifyPayment]);

  return (
    <div className="verify">
      <div className="spinner"> </div>
    </div>
  );
};

export default Verify;
