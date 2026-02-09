import express from "express";
import { body, validationResult } from "express-validator";
import Product from "../models/Product.js";
import { protect, adminOnly } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { category } = req.query;
  const query = category ? { category } : {};
  const products = await Product.find(query).populate("category").sort({ createdAt: -1 });
  res.json(products);
});

router.get("/:id", async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) {
    res.status(404);
    return next(new Error("Product not found"));
  }
  res.json(product);
});

router.post(
  "/",
  protect,
  adminOnly,
  upload.array("images", 5),
  [
    body("name").notEmpty().withMessage("Name required"),
    body("price").isNumeric().withMessage("Price required"),
    body("description").notEmpty().withMessage("Description required")
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      return next(new Error(errors.array()[0].msg));
    }
    let images = req.files?.map((file) => `/uploads/${file.filename}`) || [];
    if (!images.length && req.body.images) {
      images = Array.isArray(req.body.images)
        ? req.body.images
        : JSON.parse(req.body.images);
    }
    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      stock: Number(req.body.stock || 0),
      category: req.body.category || null,
      images
    });
    res.status(201).json(product);
  }
);

router.put("/:id", protect, adminOnly, async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    return next(new Error("Product not found"));
  }
  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.price = req.body.price ?? product.price;
  product.stock = req.body.stock ?? product.stock;
  product.category = req.body.category ?? product.category;
  if (req.body.images) product.images = req.body.images;
  await product.save();
  res.json(product);
});

router.delete("/:id", protect, adminOnly, async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    return next(new Error("Product not found"));
  }
  await product.deleteOne();
  res.json({ message: "Product deleted" });
});

export default router;
