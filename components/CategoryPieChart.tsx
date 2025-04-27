import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Transaction {
  amount: number;
  category: string;
}

interface CategoryPieChartProps {
  transactions: Transaction[];
}

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
  "#ffc0cb",
];

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ transactions }) => {
  // Aggregate expenses by category
  const data = transactions.reduce((acc: { name: string; value: number }[], tx) => {
    const existing = acc.find((item) => item.name === tx.category);
    if (existing) {
      existing.value += tx.amount;
    } else {
      acc.push({ name: tx.category, value: tx.amount });
    }
    return acc;
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
