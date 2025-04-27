import React, { useState, useEffect } from "react";

interface BudgetFormProps {
  onSave: (data: { category: string; month: string; amount: number }) => void;
  initialData?: { category: string; month: string; amount: number };
}

const categories = [
  "Food",
  "Transportation",
  "Utilities",
  "Entertainment",
  "Health",
  "Education",
  "Shopping",
  "Others",
];

const BudgetForm: React.FC<BudgetFormProps> = ({ onSave, initialData }) => {
  const [category, setCategory] = useState(initialData?.category || "");
  const [month, setMonth] = useState(initialData?.month || "");
  const [amount, setAmount] = useState(initialData?.amount || 0);
  const [errors, setErrors] = useState<{ category?: string; month?: string; amount?: string }>({});

  const validate = () => {
    const newErrors: { category?: string; month?: string; amount?: string } = {};
    if (!category) newErrors.category = "Category is required";
    if (!month) newErrors.month = "Month is required";
    if (amount <= 0) newErrors.amount = "Amount must be greater than zero";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ category, month, amount });
    setCategory("");
    setMonth("");
    setAmount(0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div>
        <label htmlFor="category" className="block font-semibold text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-600 mt-1">{errors.category}</p>}
      </div>
      <div>
        <label htmlFor="month" className="block font-semibold text-gray-700 mb-1">
          Month
        </label>
        <input
          type="month"
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.month && <p className="text-red-600 mt-1">{errors.month}</p>}
      </div>
      <div>
        <label htmlFor="amount" className="block font-semibold text-gray-700 mb-1">
          Budget Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          step="0.01"
          min="0"
        />
        {errors.amount && <p className="text-red-600 mt-1">{errors.amount}</p>}
      </div>
      <button
        type="submit"
        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition-colors duration-200"
      >
        Save Budget
      </button>
    </form>
  );
};

export default BudgetForm;
