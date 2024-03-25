import React from "react";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

const Barchart = () => {
  // Sample data for the bar chart
  const data = [
    { name: "G1", value: 200 },
    { name: "G2", value: 300 },
    { name: "G3", value: 500 },
    { name: "G4", value: 100 },
    { name: "G5", value: 800 },
    { name: "G6", value: 100 },
    { name: "G7", value: 700 },
    { name: "G8", value: 600 },
    { name: "G9", value: 500 },
    { name: "G0", value: 800 },
  ];

  return (
    <div>
      <h2>Bar Chart Example</h2>
      <ResponsiveContainer width="50%" height="50%">
        <BarChart width={100} height={200} data={data}>
          <Bar
            dataKey="value"
            fill="#0e8e60"
            radius={[5, 5, 0, 0]} // Set the border radius (top-left, top-right, bottom-right, bottom-left)
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Barchart;
