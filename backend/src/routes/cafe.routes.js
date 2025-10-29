import express from "express";
import {
  createCafe,
  getCafes,
  getCafeById,
  updateCafe,
  deleteCafe,
} from "../controllers/cafe.controllers.js";

const router = express.Router();

router.post("/", createCafe);
router.get("/", getCafes);
router.get("/:id", getCafeById);
router.put("/:id", updateCafe);
router.delete("/:id", deleteCafe);

export default router;
