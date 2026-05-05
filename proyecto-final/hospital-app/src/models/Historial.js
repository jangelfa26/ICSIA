import mongoose from "mongoose";

const schema = new mongoose.Schema({
  id_paciente: Number,
  diagnostico: String,
  observaciones: String,
  fecha: { type: Date, default: Date.now },

  receta: [
    {
      id_medicamento: Number,
      nombre: String,
      dosis: String,
      frecuencia: String,
      duracion: String
    }
  ]
}, {
  collection: "historial" 
});

export const Historial = mongoose.models.Historial || mongoose.model("Historial", schema);