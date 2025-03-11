import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../css/cart.css"; 
import ShopNav from "./ShopnowNav";
import { useNavigate } from "react-router-dom";

// const initialCart = [
//   { id: 1, name: "Hotel Sambar Powder", price: 41, weight: "0.1", image: "sambar.png", quantity: 1 },
//   { id: 2, name: "Chettinadu Biryani Masala Paste", price: 70, weight: "0.167", image: "biryani.png", quantity: 1 },
//   { id: 3, name: "Kashmiri Chilli Powder", price: 103, weight: "0.1", image: "chilli.png", quantity: 1 },
//   { id: 4, name: "Hotel Sambar Powder", price: 41, weight: "0.1", image: "sambar.png", quantity: 1 },
//   { id: 5, name: "Chettinadu Biryani Masala Paste", price: 70, weight: "0.167", image: "biryani.png", quantity: 1 },
//   { id: 6, name: "Kashmiri Chilli Powder", price: 103, weight: "0.1", image: "chilli.png", quantity: 1 }
// ];


const Cart = () => {
  const [cart, setCart] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const token = sessionStorage.getItem("token");
    if(!token){
      navigate("/login")
    }
  },[])
  const updateQuantity = (id, amount) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  // const totalWeight = cart.reduce((total, item) => total + parseFloat(item.weight) * item.quantity, 0);

  // sessionStorage.setItem("orderTotal", "subtotal");

  return (
    <div>
      <ShopNav />
      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty 🛒</h2>
            <p>Browse our products and add some items to your cart.</p>
            <button className="continue-shopping" onClick={() => navigate("/shop")}>
               Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-message">🔥 Fantastic choice! This is one of our favorites 😍</div>

            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h2>{item.name}</h2>
                    <p>₹ {item.price}</p>
                    <p>Size: {item.weight} kg</p>
                  </div>
                  <div className="cart-quantity">
                    <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                    <input type="text" value={item.quantity} readOnly />
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => removeItem(item.id)} />
                  <p className="cart-item-price">₹ {item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button>

            <div className="cart-summary">
              <p>Subtotal: <strong>₹ {"subtotal"}</strong></p>
              <p>Total Order Weight: <strong>{"totalWeight".toFixed(2)} kg</strong></p>
              <p>Shipping calculated at checkout</p>
              <button className="checkout-button" onClick={() => navigate("/order")}>Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
