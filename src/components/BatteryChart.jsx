import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { formatTimestamp } from "../utils/formatTimestamp";

const BatteryChart = ({ data, dataKey, title, unit }) => {
  const formattedData = data.map((item) => ({
    ...item,
    formattedTime: formatTimestamp(item.time),
  }));

  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        {title}
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="formattedTime"
            tick={{ fontSize: 10 }}
            interval="preserveStartEnd"
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BatteryChart;