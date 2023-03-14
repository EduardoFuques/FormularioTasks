import { Schema, model } from "mongoose";

const counterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
const Counter = model("Counter", counterSchema);

export const getNextSequenceValue = async function (counterId) {
  const result = await Counter.findOneAndUpdate(
    { _id: counterId },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return result.seq;
}

const counterSchemaPJ = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const CounterPJ = model("CounterPJ", counterSchemaPJ);

export const getNextSequenceValuePJ = async function (counterId) {
  const result = await CounterPJ.findOneAndUpdate(
    { _id: counterId },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return result.seq;
};
