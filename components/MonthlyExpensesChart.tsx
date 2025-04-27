import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Transaction {
  amount: number;
  date: string;
}

interface MonthlyExpensesChartProps {
  transactions: Transaction[];
}

const MonthlyExpensesChart: React.FC<MonthlyExpensesChartProps> = ({ transactions }) => {
  // Aggregate expenses by month
  const data = transactions.reduce((acc: { month: string; total: number }[], tx) => {
    const date = new Date(tx.date);
    const month = date.toLocaleString("default", { month: "short", year: "numeric" });
    const existing = acc.find((item) => item.month === month);
    if (existing) {
      existing.total += tx.amount;
    } else {
      acc.push({ month, total: tx.amount });
    }
    return acc;
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpensesChart;
