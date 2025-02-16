import React, { useState } from "react";

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [siteName, setSiteName] = useState("My Food Delivery");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = () => {
    alert("Settings saved successfully!");
    // Logic to save settings to backend
  };

  return (
    <div className="p-6 space-y-6 overflow-y-scroll bg-gray-100 h-screen">
      <h1 className="text-3xl font-bold">Admin Settings</h1>

      {/* Site Configuration */}
      <div className="bg-white shadow p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Site Configuration</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Site Name</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter site name"
            />
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={() => setMaintenanceMode(!maintenanceMode)}
              className="cursor-pointer"
            />
            <label className="font-semibold">Enable Maintenance Mode</label>
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="bg-white shadow p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Theme Settings</h2>
        <div>
          <label className="block font-semibold mb-2">Select Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white shadow p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Notifications</h2>
        <div className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="cursor-pointer"
          />
          <label className="font-semibold">Enable Notifications</label>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white shadow p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">User Management</h2>
        <p className="text-sm text-gray-600">
          Manage admin and customer accounts from the User Management section.
          <button
            onClick={() => alert("Redirect to User Management")}
            className="ml-2 text-blue-500 underline"
          >
            Go to User Management
          </button>
        </p>
      </div>

      {/* Save Button */}
      <div>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
