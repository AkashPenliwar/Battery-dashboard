import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import WarningBanner from "./components/WarningBanner";
import StatusOverview from "./components/StatusOverview";
import InsightsPanel from "./components/InsightsPanel";
import BatteryChart from "./components/BatteryChart";

const socket = io("http://localhost:5000");

function App() {
  const [selectedBattery, setSelectedBattery] = useState("batteryA");
  const [batteryData, setBatteryData] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");

  useEffect(() => {
    // Socket connection events
    socket.on("connect", () => setConnectionStatus("Connected"));
    socket.on("disconnect", () => setConnectionStatus("Disconnected"));
    socket.on("connect_error", () => setConnectionStatus("Connection Error"));

    // Battery updates
    socket.on(`batteryUpdate-${selectedBattery}`, (data) => {
      setBatteryData(data);
    });

    return () => {
      socket.off(`batteryUpdate-${selectedBattery}`);
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
    };
  }, [selectedBattery]);

  if (batteryData.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-xl font-semibold bg-gray-100">
        <p>Waiting for Live Data...</p>
        <p className="mt-2 text-sm text-gray-500">{connectionStatus}</p>
      </div>
    );
  }

  const latestData = batteryData[batteryData.length - 1];

  // Warnings based on thresholds
  const warnings = [];
  if (latestData.soc < 20) warnings.push("SOC Low ⚠️");
  if (latestData.battery_voltage < 45 || latestData.battery_voltage > 52)
    warnings.push("Voltage Out of Range ⚠️");
  if (latestData.battery_temp > 45) warnings.push("Overheating ⚠️");

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Real-Time IoT Battery Monitoring
      </h1>

      {/* Connection status */}
      <p className="text-sm text-gray-600 mb-4">Status: {connectionStatus}</p>

      {/* Device selector */}
      <div className="mb-4">
        <label className="mr-2 font-semibold text-gray-700">Select Battery:</label>
        <select
          value={selectedBattery}
          onChange={(e) => setSelectedBattery(e.target.value)}
          className="p-2 border rounded shadow-sm focus:ring focus:ring-blue-200"
        >
          <option value="batteryA">Battery A</option>
          <option value="batteryB">Battery B</option>
        </select>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="bg-red-100 text-red-700 p-4 rounded shadow-md space-y-1">
          {warnings.map((w, i) => (
            <p key={i} className="font-medium">{w}</p>
          ))}
        </div>
      )}

      {/* Warning Banner */}
      <div className="bg-white p-4 rounded shadow-md">
        <WarningBanner soc={latestData.soc} />
      </div>

      {/* Status Overview */}
      <div className="bg-white p-4 rounded shadow-md">
        <StatusOverview latestData={latestData} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow-md">
          <BatteryChart data={batteryData} dataKey="soc" title="State of Charge" unit="%" />
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <BatteryChart data={batteryData} dataKey="battery_voltage" title="Voltage" unit="V" />
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <BatteryChart data={batteryData} dataKey="current" title="Current" unit="A" />
        </div>
        <div className="bg-white p-4 rounded shadow-md">
          <BatteryChart data={batteryData} dataKey="battery_temp" title="Temperature" unit="°C" />
        </div>
      </div>

      {/* Insights Panel */}
      <div className="bg-white p-4 rounded shadow-md">
        <InsightsPanel data={batteryData} />
      </div>
    </div>
  );
}

export default App;
