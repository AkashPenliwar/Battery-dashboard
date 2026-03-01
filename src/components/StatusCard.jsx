const StatusCard = ({
  title,
  value,
  unit,
  highlight,
  statusText,
  showProgress = false,
}) => {
  const percentage = showProgress ? Math.min(Math.max(value, 0), 100) : 0;

  const progressColor =
    percentage < 20
      ? "bg-red-500"
      : percentage < 50
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <div
      className={`rounded-2xl shadow-md p-5 bg-white transition-all duration-300 ${
        highlight ? "border-2 border-red-500 bg-red-50" : ""
      }`}
    >
      <h3 className="text-sm text-gray-500 mb-2">{title}</h3>

      <div className="flex items-end justify-between mb-3">
        <p className="text-2xl font-bold text-gray-800">
          {value} {unit}
        </p>

        {statusText && (
          <span className="text-xs font-medium text-gray-600">
            {statusText}
          </span>
        )}
      </div>

      {showProgress && (
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`${progressColor} h-3 transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default StatusCard;