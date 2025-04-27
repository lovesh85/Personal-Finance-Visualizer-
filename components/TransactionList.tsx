import React from "react";

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Transactions</h2>
      <table className="w-full border-collapse border border-gray-300 rounded-md overflow-hidden shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-3 text-left text-gray-700">Date</th>
            <th className="border border-gray-300 p-3 text-left text-gray-700">Description</th>
            <th className="border border-gray-300 p-3 text-right text-gray-700">Amount</th>
            <th className="border border-gray-300 p-3 text-center text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="border border-gray-300 p-3">{new Date(tx.date).toLocaleDateString()}</td>
              <td className="border border-gray-300 p-3">{tx.description}</td>
              <td className="border border-gray-300 p-3 text-right">${tx.amount.toFixed(2)}</td>
              <td className="border border-gray-300 p-3 text-center space-x-3">
                <button
                  onClick={() => onEdit(tx)}
                  className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(tx._id)}
                  className="text-red-600 hover:underline focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {transactions.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-6 text-gray-500">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
