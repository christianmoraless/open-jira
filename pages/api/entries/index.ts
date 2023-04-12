import { db } from "@/database";
import { Entry } from "@/models";
import { IEntry } from "@/models/Entry";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IEntry[] | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      getEntries(res);
      break;

    default:
      return res.status(400).json({ message: "Endpoint no encontrado" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();
  const entries = await Entry.find().sort({ createdAt: "ascending" });
  await db.disconnect();
  res.status(200).json(entries);
};
