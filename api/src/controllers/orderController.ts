import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { OrderRequest } from "../types/OrderRequest";

const prisma = new PrismaClient();

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, address, items } = req.body as OrderRequest;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }

    let totalPrice = 0;

    const dbBurgerItems = items.filter(
      (item) => item.burgerId != null && item.burgerId !== undefined
    );
    const manualBurgerItems = items.filter(
      (item) => item.burgerId == null || item.burgerId === undefined
    );

    let burgers: any[] = [];

    if (dbBurgerItems.length > 0) {
      const burgerIds = dbBurgerItems.map((item) => item.burgerId!);
      burgers = await prisma.burger.findMany({
        where: { id: { in: burgerIds } },
      });

      if (burgers.length !== burgerIds.length) {
        res.status(400).json({
          error: "Un ou plusieurs burgers non trouvés en base de données",
        });
        return;
      }
    }

    const orderItems = [];

    for (const item of dbBurgerItems) {
      const burger = burgers.find((b) => b.id === item.burgerId);
      if (!burger) {
        throw new Error(`Burger avec l'ID ${item.burgerId} non trouvé`);
      }
      const unitPrice = burger.price;
      totalPrice += unitPrice * item.quantity;

      orderItems.push({
        burgerId: item.burgerId,
        quantity: item.quantity,
        unitPrice,
      });
    }

    // Traiter les burgers créés manuellement
    for (const item of manualBurgerItems) {
      const unitPrice = item.burgerPrice;
      totalPrice += unitPrice * item.quantity;

      orderItems.push({
        burgerId: null,
        burgerName: item.burgerName,
        quantity: item.quantity,
        unitPrice,
      });
    }
    // creer
    const order = await prisma.order.create({
      data: {
        userId,
        address,
        totalPrice: Math.round(totalPrice * 100) / 100,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            burger: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      message: "Commande créée avec succès",
      order,
    });
  } catch (error) {
    console.error("Erreur lors de la création de la commande:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la commande" });
  }
};

export const getUserOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;

  try {
    const orders = await prisma.order.findMany({
      where: { userId: parseInt(userId) },
      include: {
        items: {
          include: {
            burger: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des commandes" });
  }
};

export const getOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { orderId } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
      include: {
        items: {
          include: {
            burger: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });

    if (!order) {
      res.status(404).json({ error: "Commande non trouvée" });
      return;
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Erreur lors de la récupération de la commande:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de la commande" });
  }
};
