import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/order.css";
import ShopNav from "./ShopnowNav";
import Footer from "./Footer";

export default function OrderPage() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);
  const navigate = useNavigate();

useEffect(() => {
  const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const storedTotal = sessionStorage.getItem("orderTotal");
    if (storedTotal) {
      setOrderTotal(parseFloat(storedTotal));
      sessionStorage.setItem("orderamount",storedTotal)
    }

    fetchUserDetails(); 
  }, []);

const fetchUserDetails = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/getuser", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch user data");

      const data = await res.json();
      setName(data.name);
      setPhone(data.phone); 
      setAddress(data.address || ""); 
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

const getLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          if (!res.ok) throw new Error("Failed getting address");

          const data = await res.json();
          console.log("Location Data:", data);

          const fullAddress = `${data.locality}, ${data.city}, ${data.principalSubdivision}, ${data.countryName}`;
          setAddress(fullAddress || "Address not found");
        } catch (error) {
          console.error(error);
          setAddress("Error fetching address");
        }
      },
      (error) => alert("Failed to get location: " + error.message),
      { enableHighAccuracy: true }
    );
  };

  const placeOrder = async () => {
    const token = sessionStorage.getItem("token");
    if (!name || !phone || !address.trim()) {
      alert("Please fill in all details before placing the order.");
      return;
    }
    else{
    try {
      const res = await fetch("http://localhost:5000/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address }),
      });

      if (!res.ok) throw new Error("Failed to place order");

      await fetch("http://localhost:5000/clear-cart", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      sessionStorage.setItem("orderTotal",0)
      navigate("/placed");
    } catch (error) {
      console.error(error);
    }
  };
  }
  
  return (
    <div>
      <ShopNav />
      <div className="order-page">
        <h2>Ready to order? Let's go!</h2>

        <label>Phone Number</label>
        <input type="text" value={phone} readOnly />

        <label>Name</label>
        <input type="text" value={name} readOnly />

        <label>Address</label>
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Enter your address"
        />
        <button onClick={getLocation}>Get Position</button>

        <h3>Total Amount: ₹ {orderTotal.toFixed(2)}</h3>

        <button onClick={placeOrder}>Order Now</button>
      </div>
      <Footer/>
    </div>
  );
}
