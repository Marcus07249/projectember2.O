import express from "express";
import { body, validationResult } from "express-validator";
import Order from "../models/Order.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/my", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

router.post(
  "/",
  protect,
  [
    body("items").isArray({ min: 1 }).withMessage("Items required"),
    body("shippingAddress.fullName").notEmpty().withMessage("Name required"),
    body("paymentMethod").notEmpty().withMessage("Payment method required")
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      return next(new Error(errors.array()[0].msg));
    }
    const order = await Order.create({
      user: req.user._id,
      items: req.body.items,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      totalPrice: req.body.totalPrice
    });
    res.status(201).json(order);
  }
);

router.get("/", protect, adminOnly, async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json(orders);
});

router.put("/:id/status", protect, adminOnly, async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    return next(new Error("Order not found"));
  }
  order.status = req.body.status || order.status;
  order.paymentStatus = req.body.paymentStatus || order.paymentStatus;
  await order.save();
  res.json(order);
});

router.delete("/:id", protect, adminOnly, async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    return next(new Error("Order not found"));
  }
  await order.deleteOne();
  res.json({ message: "Order removed" });
});

export default router;
