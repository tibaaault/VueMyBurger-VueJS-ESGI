import { Router } from "express";
import fs from "fs";
import path from "path";
import type { Burger } from "../types/burger";


const router = Router();

const burgersFilePath = path.join(__dirname, "../data/burgers.json");

// lire les burgers
const getBurgersFromFile = (): Burger[] => {
  try {
    const data = fs.readFileSync(burgersFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier burgers.json:", error);
    return [];
  }
};

// récupérer tous les burgers
router.get("/", (req, res) => {
  try {
    const burgers = getBurgersFromFile();
    res.json(burgers);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des burgers" });
  }
});

export default router;
