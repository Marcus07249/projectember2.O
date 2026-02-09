import express from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import BrandingSettings from "../models/BrandingSettings.js";
import ThemeSettings from "../models/ThemeSettings.js";
import PaymentSettings from "../models/PaymentSettings.js";
import AdminSettings from "../models/AdminSettings.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required")
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      return next(new Error(errors.array()[0].msg));
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email, role: "admin" });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      return next(new Error("Invalid admin credentials"));
    }
    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user._id)
    });
  }
);

router.get("/settings/branding", async (req, res) => {
  const branding = await BrandingSettings.findOne();
  res.json(branding || { storeName: "Ember Store", logoUrl: "" });
});

router.put(
  "/settings/branding",
  protect,
  adminOnly,
  async (req, res) => {
    const updated = await BrandingSettings.findOneAndUpdate(
      {},
      { storeName: req.body.storeName, logoUrl: req.body.logoUrl },
      { new: true, upsert: true }
    );
    res.json(updated);
  }
);

router.get("/settings/theme", async (req, res) => {
  const theme = await ThemeSettings.findOne();
  res.json(theme || { defaultTheme: "light" });
});

router.put("/settings/theme", protect, adminOnly, async (req, res) => {
  const updated = await ThemeSettings.findOneAndUpdate(
    {},
    { defaultTheme: req.body.defaultTheme || "light" },
    { new: true, upsert: true }
  );
  res.json(updated);
});

router.get("/settings/payment", async (req, res) => {
  const payment = await PaymentSettings.findOne();
  res.json(
    payment || { upiEnabled: true, cardEnabled: true, codEnabled: true }
  );
});

router.put("/settings/payment", protect, adminOnly, async (req, res) => {
  const updated = await PaymentSettings.findOneAndUpdate(
    {},
    {
      upiEnabled: req.body.upiEnabled,
      cardEnabled: req.body.cardEnabled,
      codEnabled: req.body.codEnabled
    },
    { new: true, upsert: true }
  );
  res.json(updated);
});

router.get("/settings/admin", protect, adminOnly, async (req, res) => {
  const settings = await AdminSettings.findOne();
  res.json(settings || { maintenanceMode: false });
});

router.put("/settings/admin", protect, adminOnly, async (req, res) => {
  const updated = await AdminSettings.findOneAndUpdate(
    {},
    { maintenanceMode: req.body.maintenanceMode },
    { new: true, upsert: true }
  );
  res.json(updated);
});

router.get("/users", protect, adminOnly, async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
});

router.put("/users/:id/block", protect, adminOnly, async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    return next(new Error("User not found"));
  }
  user.isBlocked = req.body.isBlocked ?? user.isBlocked;
  await user.save();
  res.json({ id: user._id, isBlocked: user.isBlocked });
});

export default router;
