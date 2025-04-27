import type { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise;
  const db = client.db();
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    res.status(400).json({ error: "Invalid transaction ID" });
    return;
  }

  if (req.method === "PUT") {
    // Update a transaction
    const { amount, date, description, category } = req.body;
    if (!amount || !date || !category) {
      res.status(400).json({ error: "Amount, date, and category are required" });
      return;
    }
    const updatedTransaction = {
      amount: parseFloat(amount),
      date: new Date(date),
      description: description || "",
      category,
    };
    const result = await db
      .collection("transactions")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedTransaction });
    if (result.matchedCount === 0) {
      res.status(404).json({ error: "Transaction not found" });
      return;
    }
    res.status(200).json({ message: "Transaction updated" });
  } else if (req.method === "DELETE") {
    // Delete a transaction
    const result = await db
      .collection("transactions")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: "Transaction not found" });
      return;
    }
    res.status(200).json({ message: "Transaction deleted" });
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
