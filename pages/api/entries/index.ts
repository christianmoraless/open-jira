import { db } from "@/database";
import { Entry, IEntry } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { message: string } | IEntry[] | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);
    case "POST":
      return postEntry(res, req);

    default:
      return res.status(400).json({ message: "Endpoint no encontrado" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const entries = await Entry.find().sort({ createdAt: "ascending" });
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(entries);
    await db.disconnect();
  } catch (error) {
    console.log(error);
  }
};

const postEntry = async (res: NextApiResponse, req: NextApiRequest) => {
  const { description } = req.body;
  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  });

  try {
    await db.connect();
    res.setHeader("Access-Control-Allow-Origin", "*");
    await newEntry.save();
    await db.disconnect();
    return res.status(201).json(newEntry);
  } catch (error) {
    await db.disconnect();
    return res
      .status(500)
      .json({ Message: "Ops algo salio mal, revisar logs del servidor" });
  }
};
