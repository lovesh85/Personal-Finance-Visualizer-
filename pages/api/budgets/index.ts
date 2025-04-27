import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db();

  if (req.method === "GET") {
    // Get all budgets
    const budgets = await db.collection("budgets").find({}).toArray();
    res.status(200).json(budgets);
  } else if (req.method === "POST") {
    // Add or update a budget
    const { category, month, amount } = req.body;
    if (!category || !month || !amount) {
      res.status(400).json({ error: "Category, month, and amount are required" });
      return;
    }
    const filter = { category, month };
    const update = { $set: { amount: parseFloat(amount) } };
    const options = { upsert: true };
    await db.collection("budgets").updateOne(filter, update, options);
    res.status(200).json({ message: "Budget set successfully" });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
