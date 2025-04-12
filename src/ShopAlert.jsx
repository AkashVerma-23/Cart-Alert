import React from "react";
import "./App.css";
import ShoppingList from "./components/ShoppingList";
import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import { LocationProvider } from "./contexts/LocationContext";
import { ShoppingProvider } from "./contexts/ShoppingContext";

const ShopAlert = () => {
  const [activeTab, setActiveTab] = useState("items");
  const [notification, setNotification] = useState(null);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <ShoppingProvider>
      <LocationProvider showNotification={showNotification}>
        <div className="app-container">
          <header className="app-header">
            <h1>Cart Alert</h1>
          </header>

          <div className="tab-container">
            <button
              className={`tab-button ${activeTab === "items" ? "active" : ""}`}
              onClick={() => setActiveTab("items")}
            >
              Shopping List
            </button>
            <button
              className={`tab-button ${activeTab === "stores" ? "active" : ""}`}
              onClick={() => setActiveTab("stores")}
            >
              Nearby Stores
            </button>
            <button
              className={`tab-button ${
                activeTab === "settings" ? "active" : ""
              }`}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
          </div>

          <main className="app-content">
            {activeTab === "items" && <ShoppingList />}
          </main>

          {notification && <Notification message={notification} />}
        </div>
      </LocationProvider>
    </ShoppingProvider>
  );
};

export default ShopAlert;
