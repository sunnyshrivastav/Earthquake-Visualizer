import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useState, useEffect } from "react";

export default function Charts({ quakes }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640); // sm breakpoint
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Process data
  const magCounts = {};
  quakes.forEach((q) => {
    const mag = Math.floor(q.properties.mag);
    magCounts[mag] = (magCounts[mag] || 0) + 1;
  });

  const chartData = Object.keys(magCounts).map((m) => ({
    magnitude: m,
    count: magCounts[m],
  }));

  return (
    <div className="p-2">
      <h2 className="text-lg font-semibold mb-2 text-center">
        📊 Quakes by Magnitude
      </h2>

      <ResponsiveContainer width="100%" height={isMobile ? 180 : 300}>
        <BarChart data={chartData}>
          <XAxis
            dataKey="magnitude"
            tick={{ fontSize: isMobile ? 10 : 12 }}
          />
          <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
          <Tooltip />
          <Bar dataKey="count" fill="#3182ce" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
