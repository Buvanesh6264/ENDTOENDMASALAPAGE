import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPhone, faEnvelope, faMapMarkerAlt, faShoppingCart, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import ShopNav from "./ShopnowNav";
import "../css/profile.css";
import Footer from "./Footer";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/getuser", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <ShopNav />
      <div className="profile-container">
        <h1 className="profile-title">My Profile</h1>

        {user ? (
          <div className="profile-card">
            <FontAwesomeIcon icon={faUser} className="profile-icon" />
            <h2>{user.name}</h2>

            <p>
              <FontAwesomeIcon icon={faPhone} className="profile-icon-small" />
              <strong> Phone:</strong> {user.phone}
            </p>
            {/* <p>
              <FontAwesomeIcon icon={faEnvelope} className="profile-icon-small" />
              <strong> Email:</strong> {user.email || "Not Provided"}
            </p>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="profile-icon-small" />
              <strong> Address:</strong> {user.address || "Not Provided"}
            </p> */}

            <button className="profile-btn cart-btn" onClick={() => navigate("/cart")}>
              <FontAwesomeIcon icon={faShoppingCart} /> My Cart
            </button>

            <button className="profile-btn logout-btn" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </button>
          </div>
        ) : (
          <p className="loading">Loading profile...</p>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Profile;
