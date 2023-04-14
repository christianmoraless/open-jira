import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "@/database";
import { Entry } from "@/models";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Id no valido" });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(res, req);

    default:
      res.status(400).json({ message: "Metodo no encontrado" });
      break;
  }
}

const updateEntry = async (res: NextApiResponse, req: NextApiRequest) => {
  try {
    const { id } = req.query;
    await db.connect();
    const entryToUpdate = await Entry.findById(id);
    if (!entryToUpdate) {
      await db.disconnect();
      res.status(400).json({ message: "No existe entrada con ese id" });
    }
    const {
      description = entryToUpdate.description,
      status = entryToUpdate.status,
    } = req.body;
    const updateEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );
    res.status(200).json(updateEntry!);
    await db.disconnect();
  } catch (error) {
    console.log(error);
  }
};
