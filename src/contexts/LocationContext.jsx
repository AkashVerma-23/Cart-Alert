import { createContext, useState, useEffect, useContext } from "react";
import { ShoppingContext } from "./ShoppingContext";
import { checkProximity } from "../utils/LocationUtils";

export const LocationContext = createContext();

export const LocationProvider = ({ children, showNotification }) => {
  const { getItemsByStore } = useContext(ShoppingContext);

  // Initialize state
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem("locationApiKey") || "";
  });
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState(null);
  const [nearbyStores, setNearbyStores] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  // Save API key to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("locationApiKey", apiKey);
  }, [apiKey]);

  // Clean up location watcher when component unmounts
  useEffect(() => {
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  // Start location tracking
  const startTracking = () => {
    if (!apiKey) {
      showNotification("Please enter your location API key first!");
      return;
    }

    if (!navigator.geolocation) {
      showNotification("Geolocation is not supported by your browser");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      handlePositionUpdate,
      handlePositionError,
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }
    );

    setWatchId(id);
    setIsTracking(true);
    showNotification(
      "Location tracking started! You'll be notified when near stores with your items."
    );
  };

  // Stop location tracking
  const stopTracking = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setIsTracking(false);
    setNearbyStores([]);
    showNotification("Location tracking stopped");
  };

  // Handle position update from geolocation API
  const handlePositionUpdate = async (position) => {
    const { latitude, longitude } = position.coords;

    setCurrentLocation({ latitude, longitude });

    try {
      // In a real app, call the location API with your API key
      const stores = await fetchNearbyStores(latitude, longitude, apiKey);
      setNearbyStores(stores);

      // Check if any stores match our shopping list
      checkStoreMatches(stores);
    } catch (error) {
      console.error("Error fetching nearby stores:", error);
      showNotification(
        "Error detecting nearby stores. Please check your API key."
      );
    }
  };

  // Handle position error
  const handlePositionError = (error) => {
    showNotification(`Location error: ${error.message}`);
    stopTracking();
  };

  // Fetch nearby stores (in a real app, call the Places API)
  const fetchNearbyStores = async (lat, lng, key) => {
    // This is a simulation for demo purposes
    // In a real app, make an API call to Google Places or similar

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo, return simulated data
    return simulateNearbyStores(lat, lng);
  };

  // Simulate response from a places API for demonstration
  const simulateNearbyStores = (lat, lng) => {
    const storeTypes = [
      "grocery",
      "pharmacy",
      "hardware",
      "clothing",
      "electronics",
    ];
    const storeNames = {
      grocery: ["Grocery Store", "Supermarket", "Food Market"],
      pharmacy: ["Pharmacy", "Drugstore"],
      hardware: ["Hardware Store", "Home Improvement"],
      clothing: ["Clothing Store", "Fashion Outlet"],
      electronics: ["Electronics Store", "Tech Shop"],
    };

    // Random chance to find stores
    if (Math.random() > 0.3) {
      // Pick 1-3 random store types
      const numStores = Math.floor(Math.random() * 3) + 1;
      const stores = [];

      for (let i = 0; i < numStores; i++) {
        const type = storeTypes[Math.floor(Math.random() * storeTypes.length)];
        const nameOptions = storeNames[type];
        const name =
          nameOptions[Math.floor(Math.random() * nameOptions.length)];

        stores.push({
          id: `store-${Date.now()}-${i}`,
          name,
          type,
          distance: Math.floor(Math.random() * 100) + 10,
        });
      }

      return stores;
    }

    return [];
  };

  // Check if any nearby stores match our shopping list
  const checkStoreMatches = (stores) => {
    for (const store of stores) {
      const relevantItems = getItemsByStore(store.type);

      if (relevantItems.length > 0) {
        const itemNames = relevantItems.map((item) => item.name).join(", ");
        showNotification(
          `You're near ${store.name}! Remember to buy: ${itemNames}`
        );
        // Only show one notification to avoid spamming
        break;
      }
    }
  };

  return (
    <LocationContext.Provider
      value={{
        apiKey,
        setApiKey,
        isTracking,
        startTracking,
        stopTracking,
        nearbyStores,
        currentLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
