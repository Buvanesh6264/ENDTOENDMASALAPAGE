import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../css/cart.css"; 
import ShopNav from "./ShopnowNav";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
  
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:5000/getuser", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!res.ok) {
          throw new Error("Failed to fetch cart data");
        }
  
        const data = await res.json();
        setCart(data.cart || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
  
    fetchCart();

  }, [navigate]);
  
  const updateQuantity = async (productId, amount) => {
    const updatedItem = cart.find(item => item.productId === productId);
    if (!updatedItem) return;
  
    const newQuantity = updatedItem.quantity + amount;
  
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch("http://localhost:5000/update-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
  
      const data = await res.json();
      if (res.ok) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  
  

  const removeItem = async (productId) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch("http://localhost:5000/remove-from-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
  
      const data = await res.json();
      if (res.ok) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };
  
  

  const clearCart = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch("http://localhost:5000/clear-cart", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });  
      if (res.ok) {
        setCart([]);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
  

const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
const totalWeight = cart.reduce((total, item) => total + parseFloat(item.size) * item.quantity, 0);
useEffect(()=>{
  sessionStorage.setItem("orderTotal" , subtotal);
},[subtotal])


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
                  <div key={item.productId} className="cart-item">
                  {/* <img src={item.image} alt={item.name} className="cart-item-image" /> */}
                  <div className="cart-item-details">
                    <h2>{item.name}</h2>
                    <p>₹ {item.price}</p>
                    <p>Size: {item.size} kg</p>
                  </div>
                  <div className="cart-quantity">
                    <button onClick={() => updateQuantity(item.productId, -1)}>−</button>
                    <input type="text" value={item.quantity} readOnly />
                    <button onClick={() => updateQuantity(item.productId, 1)}>+</button>
                  </div>
                  <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => removeItem(item.productId)} />
                  <p className="cart-item-price">₹ {item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button>

            <div className="cart-summary">
              <p>Subtotal: <strong>₹ {subtotal}</strong></p>
              <p>Total Order Weight: <strong>{totalWeight.toFixed(2)} kg</strong></p>

              <p>Shipping calculated at checkout</p>
              <button className="checkout-button" onClick={() => navigate("/order")}>Checkout</button>
            </div>
          </>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Cart;
