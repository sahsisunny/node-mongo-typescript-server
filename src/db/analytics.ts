import { Document, Schema, model } from "mongoose";

interface Features {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
}

interface Analytics extends Document {
  day: Date;
  age: "15-25" | ">25";
  gender: "Male" | "Female";
  features: Features;
}

const analyticsSchema = new Schema<Analytics>({
  day: { type: Date, required: true },
  age: { type: String, enum: ["15-25", ">25"], required: true },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  features: {
    A: { type: Number, required: true },
    B: { type: Number, required: true },
    C: { type: Number, required: true },
    D: { type: Number, required: true },
    E: { type: Number, required: true },
    F: { type: Number, required: true },
  },
});

export const AnalyticsModel = model<Analytics>("Analytics", analyticsSchema);

export const getAnalytics = async () => {
  return await AnalyticsModel.find();
};

export const getAnalyticsByDay = async (day: Date) => {
  return await AnalyticsModel.findOne({ day });
};

export const createAnalytics = async (value: Record<string, any>) => {
  return await AnalyticsModel.create(value);
};

export const updateAnalytics = async (analytics: Record<string, any>) => {
  return await AnalyticsModel.updateOne({ _id: analytics._id }, analytics);
};

export const deleteAnalytics = async (analyticsId: string) => {
  return await AnalyticsModel.deleteOne({ _id: analyticsId });
};



