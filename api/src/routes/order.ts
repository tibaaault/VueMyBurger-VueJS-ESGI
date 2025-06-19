import express from "express";
import { createOrder, getUserOrders, getOrderById } from "../controllers/orderController";
import { authenticateJWT } from "../middleware/auth";

const router = express.Router();

router.post("/", authenticateJWT, createOrder);
router.get("/user", authenticateJWT, getUserOrders);
router.get("/:orderId", authenticateJWT, getOrderById);

export default router;
