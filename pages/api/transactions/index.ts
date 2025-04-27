import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db();

  if (req.method === "GET") {
    // Get all transactions
    const transactions = await db
      .collection("transactions")
      .find({})
      .sort({ date: -1 })
      .toArray();
    res.status(200).json(transactions);
  } else if (req.method === "POST") {
    // Add a new transaction
    const { amount, date, description, category } = req.body;
    if (!amount || !date || !category) {
      res.status(400).json({ error: "Amount, date, and category are required" });
      return;
    }
    const newTransaction = {
      amount: parseFloat(amount),
      date: new Date(date),
      description: description || "",
      category,
    };
    const result = await db.collection("transactions").insertOne(newTransaction);
    res.status(201).json(result.insertedId ? { _id: result.insertedId, ...newTransaction } : newTransaction);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
