import express from "express";
import Budget from "../models/BudgetModel.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();


// ADD BUDGET

router.post(
  "/add",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        category,
        limit,
        month,
      } = req.body;
      

      // CHECK EXISTING BUDGET

      const existingBudget = await Budget.findOne({
        userId: req.user.id,
        category,
        month,
      });

      if (existingBudget) {

        return res.status(400).json({
          success: false,
          message: "Budget already exists for this category and month",
        });

      }

      // CREATE

      const budget = await Budget.create({
        userId: req.user.id,
        category,
        limit,
        month,
      });

      res.status(201).json({
        success: true,
        budget,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }
);


// GET BUDGETS

router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const budgets = await Budget.find({
        userId: req.user.id,
      });

      res.status(200).json(budgets);

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }
);

// DELETE BUDGET

router.delete(
  "/delete/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const budget = await Budget.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
      });

      if (!budget) {
        return res.status(404).json({
          success: false,
          message: "Budget not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Budget deleted successfully",
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }
);

export default router;