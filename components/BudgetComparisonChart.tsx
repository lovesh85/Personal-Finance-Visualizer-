import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface BudgetComparisonChartProps {
  budgets: { category: string; amount: number }[];
  actuals: { category: string; amount: number }[];
}

const COLORS = ["#82ca9d", "#8884d8"];

const BudgetComparisonChart: React.FC<BudgetComparisonChartProps> = ({ budgets, actuals }) => {
  // Merge budgets and actuals by category
  const categories = Array.from(new Set([...budgets.map(b => b.category), ...actuals.map(a => a.category)]));
  const data = categories.map(category => {
    const budget = budgets.find(b => b.category === category)?.amount || 0;
    const actual = actuals.find(a => a.category === category)?.amount || 0;
    return { category, Budget: budget, Actual: actual };
  });

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budget" fill={COLORS[0]} />
          <Bar dataKey="Actual" fill={COLORS[1]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetComparisonChart;
