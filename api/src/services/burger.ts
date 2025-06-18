import fs from "fs";
import path from "path";
import type { Burger } from "../types/burger";

export class BurgerService {
  private static burgersFilePath = path.join(__dirname, "../data/burgers.json");

  // Récupérer tous les burgers depuis le fichier JSON
  static getAllBurgers(): Burger[] {
    try {
      const data = fs.readFileSync(this.burgersFilePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error(
        "Erreur lors de la lecture du fichier burgers.json:",
        error
      );
      return [];
    }
  }

  // Récupérer un burger par son ID
  static getBurgerById(id: number): Burger | null {
    const burgers = this.getAllBurgers();
    return burgers.find((burger) => burger.id === id) || null;
  }

  // Récupérer les burgers par catégorie
  static getBurgersByCategory(category: string): Burger[] {
    const burgers = this.getAllBurgers();
    return burgers.filter((burger) => burger.category === category);
  }

  // Rechercher des burgers par nom ou description
  static searchBurgers(searchTerm: string): Burger[] {
    const burgers = this.getAllBurgers();
    const term = searchTerm.toLowerCase();

    return burgers.filter(
      (burger) =>
        burger.name.toLowerCase().includes(term) ||
        burger.description.toLowerCase().includes(term) ||
        burger.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(term)
        )
    );
  }

  // Filtrer les burgers par prix
  static filterBurgersByPrice(minPrice?: number, maxPrice?: number): Burger[] {
    const burgers = this.getAllBurgers();

    return burgers.filter((burger) => {
      if (minPrice !== undefined && burger.price < minPrice) return false;
      if (maxPrice !== undefined && burger.price > maxPrice) return false;
      return true;
    });
  }
}
