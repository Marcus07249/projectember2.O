import mongoose from "mongoose";

const brandingSettingsSchema = new mongoose.Schema(
  {
    storeName: { type: String, default: "Ember Store" },
    logoUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("BrandingSettings", brandingSettingsSchema);
