import mongoose from "mongoose";

const paymentSettingsSchema = new mongoose.Schema(
  {
    upiEnabled: { type: Boolean, default: true },
    cardEnabled: { type: Boolean, default: true },
    codEnabled: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("PaymentSettings", paymentSettingsSchema);
