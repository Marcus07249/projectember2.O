import mongoose from "mongoose";

const themeSettingsSchema = new mongoose.Schema(
  {
    defaultTheme: { type: String, enum: ["light", "dark"], default: "light" }
  },
  { timestamps: true }
);

export default mongoose.model("ThemeSettings", themeSettingsSchema);
