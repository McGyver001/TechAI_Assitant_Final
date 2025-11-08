import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const EfficiencyWidget = () => {
  const [data, setData] = useState([
    { time: "10:00", value: 78 },
    { time: "10:05", value: 82 },
    { time: "10:10", value: 85 },
    { time: "10:15", value: 83 },
  ]);

  // Simulate live updates every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const nextValue = Math.max(
          60,
          Math.min(100, prev[prev.length - 1].value + (Math.random() * 6 - 3))
        );
        const nextTime = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const updated = [...prev.slice(-9), { time: nextTime, value: nextValue }];
        return updated;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const current = data[data.length - 1]?.value ?? 0;

  return (
    <div className="bg-white shadow-md rounded-2xl p-4">
      <h2 className="text-xl font-bold mb-2">Efficiency</h2>
      <p className="text-3xl font-semibold text-blue-600">{current.toFixed(1)}%</p>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[60, 100]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={3}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EfficiencyWidget;
