import mongoose from "mongoose";

const mongooConnection = {
  isConnected: 0,
};

export const connect = async () => {
  if (mongooConnection.isConnected) {
    console.log("Conectado");
    return;
  }

  if (mongoose.connections.length > 1) {
    mongooConnection.isConnected = mongoose.connections[0].readyState;
    if (mongooConnection.isConnected === 1) {
      console.log("Usando conexion anterior");
      return;
    }
    await mongoose.disconnect();
  }
  await mongoose.connect(process.env.MONGO_URL || "");
  mongooConnection.isConnected = 1;
  console.log("Conectadon a MongoDB", process.env.MONGO_URL);
};

export const disconnect = async () => {
  if (mongooConnection.isConnected === 0) return;
  await mongoose.disconnect();
  console.log("Desconectado de MongoDB");
};
