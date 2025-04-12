import { createContext, useState, useEffect } from "react";

export const ShoppingContext = createContext();

export const ShoppingProvider = ({ children }) => {
  // Initialize items from localStorage
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("shopItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Save items to localStorage when they change
  useEffect(() => {
    localStorage.setItem("shopItems", JSON.stringify(items));
  }, [items]);

  // Add a new item to the list
  const addItem = (item) => {
    const newItem = {
      id: Date.now(),
      name: item.name,
      store: item.store,
      completed: false,
    };
    setItems([...items, newItem]);
  };

  // Remove an item from the list
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Toggle the completed status of an item
  const toggleCompleted = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Filter items by store type
  const getItemsByStore = (storeType) => {
    return items.filter((item) => item.store === storeType && !item.completed);
  };

  return (
    <ShoppingContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        toggleCompleted,
        getItemsByStore,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};
