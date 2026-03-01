const WarningBanner = ({ soc }) => {
  if (soc >= 20) return null;

  return (
    <div className="bg-red-600 text-white p-4 rounded-xl shadow-md flex justify-between items-center animate-pulse">
      <span className="font-semibold">
        ⚠ Low Battery Warning — SoC is below 20%
      </span>
      <span className="text-sm">
        Immediate charging recommended
      </span>
    </div>
  );
};

export default WarningBanner;