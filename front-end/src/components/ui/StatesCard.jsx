const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className={`${color} p-6 rounded-lg flex items-center justify-between`}>
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className="bg-white p-3 rounded-full">{icon}</div>
    </div>
  );
};

export default StatsCard;