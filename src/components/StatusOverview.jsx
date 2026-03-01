function StatusOverview({ latestData }) {
  return (
    <div className="bg-white p-4 rounded shadow-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div className="flex flex-col">
        <span className="text-gray-500 font-semibold text-sm">State of Charge</span>
        <span className="text-lg font-bold truncate">{latestData.soc.toFixed(2)}%</span>
      </div>

      <div className="flex flex-col">
        <span className="text-gray-500 font-semibold text-sm">State of Health</span>
        <span className="text-lg font-bold truncate">{latestData.soh}%</span>
      </div>

      <div className="flex flex-col">
        <span className="text-gray-500 font-semibold text-sm">Voltage</span>
        <span className="text-lg font-bold truncate">{latestData.battery_voltage.toFixed(2)} V</span>
      </div>

      <div className="flex flex-col">
        <span className="text-gray-500 font-semibold text-sm">Current</span>
        <span className="text-lg font-bold truncate">{latestData.current.toFixed(2)} A</span>
      </div>

      <div className="flex flex-col">
        <span className="text-gray-500 font-semibold text-sm">Temperature</span>
        <span className="text-lg font-bold truncate">{latestData.battery_temp.toFixed(2)} °C</span>
      </div>

      <div className="flex flex-col">
        <span className="text-gray-500 font-semibold text-sm">Charge Cycles</span>
        <span className="text-lg font-bold truncate">{latestData.charge_cycle}</span>
      </div>

      <div className="flex flex-col">
        <span className="text-gray-500 font-semibold text-sm">Discharging</span>
        <span className="text-lg font-bold">{latestData.current > 0 ? "Yes" : "No"}</span>
      </div>
    </div>
  );
}

export default StatusOverview;