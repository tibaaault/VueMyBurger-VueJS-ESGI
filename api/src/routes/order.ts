import { Router } from "express";
import { createOrder, getUserOrders, getOrderById } from "../controllers/orderController";

const router = Router();

router.post("/", createOrder);

router.get("/user/:userId", getUserOrders);

export default router;
