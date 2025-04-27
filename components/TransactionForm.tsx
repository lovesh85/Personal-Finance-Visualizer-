import React, { useState, useEffect } from "react";

interface TransactionFormProps {
  onSubmit: (data: { amount: number; date: string; description: string }) => void;
  initialData?: { amount: number; date: string; description: string };
  submitLabel?: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
  initialData,
  submitLabel = "Add Transaction",
}) => {
  const [amount, setAmount] = useState(initialData?.amount || 0);
  const [date, setDate] = useState(initialData?.date || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [errors, setErrors] = useState<{ amount?: string; date?: string; category?: string }>({});

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

  const validate = () => {
    const newErrors: { amount?: string; date?: string; category?: string } = {};
    if (amount <= 0) {
      newErrors.amount = "Amount must be greater than zero";
    }
    if (!date) {
      newErrors.date = "Date is required";
    }
    if (!category) {
      newErrors.category = "Category is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ amount, date, description, category });
    setAmount(0);
    setDate("");
    setDescription("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div>
        <label htmlFor="amount" className="block font-semibold text-gray-700 mb-1">
          Amount
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
      <div>
        <label htmlFor="date" className="block font-semibold text-gray-700 mb-1">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.date && <p className="text-red-600 mt-1">{errors.date}</p>}
      </div>
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
      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
      >
        {submitLabel}
      </button>
    </form>
  );
};

export default TransactionForm;
