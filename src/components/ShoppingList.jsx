import { useState, useContext } from "react";
import { ShoppingContext } from "../contexts/ShoppingContext";
import { LocationContext } from "../contexts/LocationContext";
import "./ShoppingList.css";
import { STORE_TYPES } from "../utils/constants";

const ShoppingList = () => {
  const { items, addItem, removeItem, toggleCompleted } =
    useContext(ShoppingContext);
  const { isTracking, startTracking, stopTracking } =
    useContext(LocationContext);

  const [newItem, setNewItem] = useState("");
  const [selectedStore, setSelectedStore] = useState("grocery");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    addItem({
      name: newItem,
      store: selectedStore,
    });

    setNewItem("");
  };

  return (
    <div className="shopping-list">
      <form className="add-item-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="item-name">Item Name:</label>
          <input
            type="text"
            id="item-name"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Enter item name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="store-type">Store Type:</label>
          <select
            id="store-type"
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
          >
            {STORE_TYPES.map((store) => (
              <option key={store.value} value={store.value}>
                {store.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Add Item</button>
      </form>

      <div className="items-container">
        <h2>Your Shopping List</h2>
        {items.length === 0 ? (
          <p className="empty-list">
            Your shopping list is empty. Add some items above.
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="item">
              <div className="item-details">
                <div
                  className={`item-name ${item.completed ? "completed" : ""}`}
                >
                  {item.name}
                </div>
                <div className="item-store">
                  {STORE_TYPES.find((store) => store.value === item.store)
                    ?.label || item.store}
                </div>
              </div>
              <div className="item-actions">
                <button
                  className={item.completed ? "danger" : "success"}
                  onClick={() => toggleCompleted(item.id)}
                >
                  {item.completed ? "Undo" : "Complete"}
                </button>
                <button className="danger" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="tracking-controls">
        {!isTracking ? (
          <button onClick={startTracking}>Start Location Tracking</button>
        ) : (
          <button className="danger" onClick={stopTracking}>
            Stop Tracking
          </button>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;
