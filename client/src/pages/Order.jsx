import { useState, useEffect } from "react";
import "../css/order.css";
import ShopNav from "./ShopnowNav";

export default function OrderPage() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    const storedTotal = localStorage.getItem("orderTotal");
    if (storedTotal) {
      setOrderTotal(parseFloat(storedTotal));
    }
  }, []);

  const fetchUserDetails = async () => {
    try {
      const res = await fetch(`/api/user?phone=${phone}`);
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      setName(data.name);
    } catch (error) {
      console.error(error);
      setName("");
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
  return (
    <div>
        <ShopNav />
    <div className="order-page">
      <h2>Ready to order? Let's go!</h2>

      <label>Phone Number</label>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        onBlur={fetchUserDetails}
      />

      <label>First Name</label>
      <input type="text" value={name} readOnly />

      <label>Address</label>
      <input type="text" value={address} readOnly />
      <button onClick={getLocation}>Get Position</button>

      {/* Show Order Total */}
      <h3>Total Amount: €{orderTotal.toFixed(2)}</h3>

      <button>Order Now</button>
    </div>
    </div>

  );
}
