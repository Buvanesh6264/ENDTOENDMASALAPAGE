import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/placed.css";
import ShopNav from "./ShopnowNav";
import Footer from "./Footer";


const OrderConfirmation = () => {
  const [orderTotal, setOrderTotal] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedTotal = sessionStorage.getItem("orderamount") || 0;
    setOrderTotal(storedTotal);

      const randomStr = Math.random().toString(36).substr(2, 6).toUpperCase(); 
      setOrderId(randomStr)

    const daysToAdd = Math.floor(Math.random() * 3) + 3;
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + daysToAdd);
    setDeliveryDate(delivery.toDateString());
  }, []);

  return (
    <div>
      <ShopNav />
      <div className="order-confirmation">
        <h2>Order {orderId} Status</h2>
        <div className="status-box">
          <span className="status">ORDER PLACED</span>
        </div>
        <div className="delivery-time">
          <p>Estimated delivery: {deliveryDate}</p>
        </div>
        <div className="order-total">
          <p>
            <strong>To pay on delivery:</strong> ₹ {orderTotal}
          </p>
        </div>
        <button className="gohome" onClick={() => {navigate("/"); sessionStorage.removeItem("orderamount")}}>Go to Home</button>
      </div>
      <Footer/>
    </div>
  );
};

export default OrderConfirmation;
