import express from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Min 6 chars")
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      return next(new Error(errors.array()[0].msg));
    }
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400);
      return next(new Error("Email already in use"));
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user._id)
    });
  }
);

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
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401);
      return next(new Error("Invalid credentials"));
    }
    if (user.isBlocked) {
      res.status(403);
      return next(new Error("Account blocked"));
    }
    res.json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user._id)
    });
  }
);

router.get("/me", protect, async (req, res) => {
  res.json({ user: req.user });
});

router.put(
  "/me",
  protect,
  [
    body("name").optional().notEmpty(),
    body("password").optional().isLength({ min: 6 })
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      return next(new Error(errors.array()[0].msg));
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      return next(new Error("User not found"));
    }
    if (req.body.name) user.name = req.body.name;
    if (req.body.password) user.password = req.body.password;
    await user.save();
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  }
);

export default router;
