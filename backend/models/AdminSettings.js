import mongoose from "mongoose";

const adminSettingsSchema = new mongoose.Schema(
  {
    maintenanceMode: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("AdminSettings", adminSettingsSchema);
