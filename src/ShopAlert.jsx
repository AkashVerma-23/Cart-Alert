import React from "react";
import "./App.css";
import NearbyStores from "./components/NearbyStores";
import Settings from "./components/Settings";
import ShoppingList from "./components/ShoppingList";
import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import { LocationProvider } from "./contexts/LocationContext";
import { ShoppingProvider } from "./contexts/ShoppingContext";
import About from "./components/About";

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
            <button
              className={`tab-button ${activeTab === "about" ? "active" : ""}`}
              onClick={() => setActiveTab("about")}
            >
              About
            </button>
          </div>
          <div className="word-slide">
            <pre>
              {`Be in the right place,at the right time,with the right list! | Enhancing shopping efficiency with real-time location tracking | Oops!,forgot to buy that again? Not anymore! | Location-based shopping reminders made easy`}
            </pre>
          </div>

          <main className="app-content">
            {activeTab === "items" && <ShoppingList />}
            {activeTab === "settings" && <Settings />}
            {activeTab === "stores" && <NearbyStores />}
            {activeTab === "about" && <About />}
          </main>

          {notification && <Notification message={notification} />}
        </div>
      </LocationProvider>
    </ShoppingProvider>
  );
};

export default ShopAlert;
