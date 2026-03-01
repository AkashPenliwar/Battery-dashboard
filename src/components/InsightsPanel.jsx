// src/components/InsightsPanel.jsx
import React from "react";

const InsightsPanel = ({ data }) => {
  if (!data || data.length === 0) return null;

  const latest = data[data.length - 1];

  // Calculate averages (optional)
  const avgSoc =
    data.reduce((sum, d) => sum + d.soc, 0) / data.length;
  const avgVoltage =
    data.reduce((sum, d) => sum + d.battery_voltage, 0) / data.length;
  const avgCurrent =
    data.reduce((sum, d) => sum + d.current, 0) / data.length;
  const avgTemp =
    data.reduce((sum, d) => sum + d.battery_temp, 0) / data.length;

  const stats = [
    { label: "State of Charge", value: `${latest.soc.toFixed(2)} %` },
    { label: "State of Health", value: `${latest.soh} %` },
    { label: "Voltage", value: `${latest.battery_voltage.toFixed(2)} V` },
    { label: "Current", value: `${latest.current.toFixed(2)} A` },
    { label: "Temperature", value: `${latest.battery_temp.toFixed(2)} °C` },
    { label: "Charge Cycles", value: latest.charge_cycle },
    { label: "Avg SOC", value: `${avgSoc.toFixed(2)} %` },
    { label: "Avg Voltage", value: `${avgVoltage.toFixed(2)} V` },
    { label: "Avg Current", value: `${avgCurrent.toFixed(2)} A` },
    { label: "Avg Temp", value: `${avgTemp.toFixed(2)} °C` },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center"
        >
          <span className="text-gray-500 text-sm font-medium">{stat.label}</span>
          <span className="text-xl font-bold mt-2">{stat.value}</span>
        </div>
      ))}
    </div>
  );
};

export default InsightsPanel;