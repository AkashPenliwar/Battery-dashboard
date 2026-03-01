export const computeInsights = (data) => {
  if (!data || data.length === 0) return null;

  const totalPoints = data.length;

  const averageSoc =
    data.reduce((sum, item) => sum + item.soc, 0) / totalPoints;

  const peakVoltage = Math.max(
    ...data.map((item) => item.battery_voltage)
  );

  const dischargingCount = data.filter((item) => item.current > 0).length;
  const idleCount = data.filter((item) => item.current === 0).length;

  return {
    totalPoints,
    averageSoc: averageSoc.toFixed(2),
    peakVoltage,
    dischargingCount,
    idleCount,
  };
};