import { useContext, useState } from "react";
import { LocationContext } from "../contexts/LocationContext";
import "./Settings.css";

const Settings = () => {
  const { apiKey, setApiKey } = useContext(LocationContext);
  const [tempApiKey, setTempApiKey] = useState(apiKey);

  const handleSave = () => {
    setApiKey(tempApiKey);
    alert("API key saved successfully!");
  };

  const handleClear = () => {
    setTempApiKey("");
    setApiKey("");
    alert("API key cleared!");
  };

  return (
    <div className="settings">
      <h2>Location API Settings</h2>

      <div className="api-section">
        <div className="form-group">
          <label htmlFor="api-key">Location API Key:</label>
          <input
            type="text"
            id="api-key"
            value={tempApiKey}
            onChange={(e) => setTempApiKey(e.target.value)}
            placeholder="Enter your location API key"
          />
        </div>

        <p className="api-info">
          This key will be used to access location services like Google Places
          API to detect nearby stores. Your key is stored locally and never sent
          to our servers.
        </p>

        <div className="button-group">
          <button onClick={handleSave}>Save API Key</button>
          <button className="danger" onClick={handleClear}>
            Clear API Key
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
