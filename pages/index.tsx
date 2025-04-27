import React, { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import MonthlyExpensesChart from "../components/MonthlyExpensesChart";
import CategoryPieChart from "../components/CategoryPieChart";
import BudgetForm from "../components/BudgetForm";
import BudgetComparisonChart from "../components/BudgetComparisonChart";

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

interface Budget {
  _id?: string;
  category: string;
  month: string;
  amount: number;
}

const Home: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState<string>("");

  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transactions");
      if (!res.ok) throw new Error("Failed to fetch transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const fetchBudgets = async () => {
    try {
      const res = await fetch("/api/budgets");
      if (!res.ok) throw new Error("Failed to fetch budgets");
      const data = await res.json();
      setBudgets(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  const addTransaction = async (data: { amount: number; date: string; description: string; category: string }) => {
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to add transaction");
      await fetchTransactions();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const updateTransaction = async (id: string, data: { amount: number; date: string; description: string; category: string }) => {
    try {
      const res = await fetch(`/api/transactions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update transaction");
      setEditingTransaction(null);
      await fetchTransactions();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      const res = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete transaction");
      await fetchTransactions();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const saveBudget = async (data: { category: string; month: string; amount: number }) => {
    try {
      const res = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to save budget");
      await fetchBudgets();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleSubmit = (data: { amount: number; date: string; description: string; category: string }) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction._id, data);
    } else {
      addTransaction(data);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
  };

  // Calculate summary cards data
  const totalExpenses = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const categoryTotals = transactions.reduce((acc: Record<string, number>, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});
  const mostRecentTransactions = transactions.slice(0, 5);

  // Calculate actual expenses by category for current month
  const currentMonth = new Date().toISOString().slice(0, 7);
  const actualsThisMonth = transactions
    .filter((tx) => tx.date.startsWith(currentMonth))
    .reduce((acc: Record<string, number>, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {});

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-5xl mx-auto mb-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-700">
          Personal Finance Visualizer
        </h1>
      </header>
      {error && (
        <div className="max-w-5xl mx-auto mb-6 p-4 bg-red-100 text-red-700 rounded shadow">
          {error}
        </div>
      )}
      <main className="max-w-5xl mx-auto space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Expenses</h2>
            <p className="text-2xl font-bold text-blue-600">${totalExpenses.toFixed(2)}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Category Breakdown</h2>
            <ul className="text-left max-h-40 overflow-auto">
              {Object.entries(categoryTotals).map(([category, amount]) => (
                <li key={category} className="mb-1">
                  <span className="font-medium">{category}:</span> ${amount.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Most Recent Transactions</h2>
            <ul className="text-left max-h-40 overflow-auto">
              {mostRecentTransactions.map((tx) => (
                <li key={tx._id} className="mb-1">
                  {new Date(tx.date).toLocaleDateString()} - {tx.description} - ${tx.amount.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="bg-white p-6 rounded-lg shadow-md">
          <TransactionForm
            onSubmit={handleSubmit}
            initialData={
              editingTransaction
                ? {
                    amount: editingTransaction.amount,
                    date: editingTransaction.date.split("T")[0],
                    description: editingTransaction.description,
                    category: editingTransaction.category,
                  }
                : undefined
            }
            submitLabel={editingTransaction ? "Update Transaction" : "Add Transaction"}
          />
          {editingTransaction && (
            <div className="text-right mt-2">
              <button
                onClick={handleCancelEdit}
                className="text-gray-600 underline hover:text-gray-800"
              >
                Cancel Edit
              </button>
            </div>
          )}
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TransactionList
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={deleteTransaction}
          />
          <CategoryPieChart transactions={transactions} />
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BudgetForm onSave={saveBudget} />
          <BudgetComparisonChart budgets={budgets} actuals={Object.entries(actualsThisMonth).map(([category, amount]) => ({ category, amount }))} />
        </section>
        <section className="bg-white p-6 rounded-lg shadow-md">
          <MonthlyExpensesChart transactions={transactions} />
        </section>
      </main>
      <footer className="max-w-5xl mx-auto mt-12 text-center text-gray-500 text-sm">
        &copy; 2024 Personal Finance Visualizer
      </footer>
    </div>
  );
};

export default Home;
