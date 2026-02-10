import express from "express";
import { body, validationResult } from "express-validator";
import Category from "../models/Category.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
});

router.post(
  "/",
  protect,
  adminOnly,
  [body("name").notEmpty().withMessage("Name required")],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      return next(new Error(errors.array()[0].msg));
    }
    const category = await Category.create({
      name: req.body.name,
      description: req.body.description
    });
    res.status(201).json(category);
  }
);

router.put(
  "/:id",
  protect,
  adminOnly,
  async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404);
      return next(new Error("Category not found"));
    }
    category.name = req.body.name || category.name;
    category.description = req.body.description ?? category.description;
    await category.save();
    res.json(category);
  }
);

router.delete("/:id", protect, adminOnly, async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(404);
    return next(new Error("Category not found"));
  }
  await category.deleteOne();
  res.json({ message: "Category deleted" });
});

export default router;
