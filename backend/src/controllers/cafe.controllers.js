import { Cafe } from "../models/cafe.models.js";

// Create new cafe
export const createCafe = async (req, res) => {
  try {
    const cafe = new Cafe(req.body);
    await cafe.save();
    res.status(201).json({ message: "Cafe created successfully", cafe });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all cafes
export const getCafes = async (req, res) => {
  try {
    const cafes = await Cafe.find();
    res.status(200).json(cafes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single cafe
export const getCafeById = async (req, res) => {
  try {
    const cafe = await Cafe.findById(req.params.id);
    if (!cafe) return res.status(404).json({ message: "Cafe not found" });
    res.status(200).json(cafe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update cafe
export const updateCafe = async (req, res) => {
  try {
    const cafe = await Cafe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cafe) return res.status(404).json({ message: "Cafe not found" });
    res.status(200).json({ message: "Cafe updated successfully", cafe });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete cafe
export const deleteCafe = async (req, res) => {
  try {
    const cafe = await Cafe.findByIdAndDelete(req.params.id);
    if (!cafe) return res.status(404).json({ message: "Cafe not found" });
    res.status(200).json({ message: "Cafe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
