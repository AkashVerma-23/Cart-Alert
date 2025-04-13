import { useContext } from "react";
import { LocationContext } from "../contexts/LocationContext";
import "./NearbyStores.css";

const NearbyStores = () => {
  const { isTracking, startTracking, stopTracking, nearbyStores } =
    useContext(LocationContext);

  return (
    <div className="nearby-stores">
      <h2>Nearby Stores</h2>

      {!isTracking ? (
        <div className="tracking-inactive">
          <p>
            Location tracking is not active. Start tracking to see nearby
            stores.
          </p>
          <button onClick={startTracking}>Start Location Tracking</button>
        </div>
      ) : nearbyStores.length === 0 ? (
        <div className="no-stores">
          <p>No stores detected nearby. Move around to discover stores.</p>
          <button className="danger" onClick={stopTracking}>
            Stop Tracking
          </button>
        </div>
      ) : (
        <div className="stores-list">
          {nearbyStores.map((store) => (
            <div key={store.id} className="store-item">
              <div className="store-details">
                <div className="store-name">{store.name}</div>
                <div className="store-distance">
                  Approximately {store.distance}m away
                </div>
              </div>
            </div>
          ))}

          <div className="tracking-controls">
            <button className="danger" onClick={stopTracking}>
              Stop Tracking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyStores;
