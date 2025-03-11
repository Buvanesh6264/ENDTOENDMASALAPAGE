import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/placed.css";
import ShopNav from "./ShopnowNav";

const generateOrderId = () => {
  return `#${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
};

const OrderConfirmation = () => {
  const [cart, setCart] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedTotal = localStorage.getItem("orderTotal") || 0;
    setCart(storedCart);
    setOrderTotal(storedTotal);

    let storedOrderId = localStorage.getItem("orderId");
    if (!storedOrderId) {
      storedOrderId = generateOrderId();
      localStorage.setItem("orderId", storedOrderId);
    }
    setOrderId(storedOrderId);

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
        <div className="order-details">
          <h3>Items Ordered:</h3>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="order-item">
                <p>
                  <strong>
                    {item.quantity}× {item.name}
                  </strong>
                </p>
                <p>{item.weight}</p>
                <p>₹ {item.price * item.quantity}</p>
              </div>
            ))
          ) : (
            <p>Your cart was empty.</p>
          )}
        </div>
        <div className="order-total">
          <p>
            <strong>To pay on delivery:</strong> ₹ {orderTotal}
          </p>
        </div>
        <button className="gohome" onClick={() => navigate("/") }>Go to Home</button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
