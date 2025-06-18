export interface Burger {
  id: number;
  name: string;
  description: string;
  price: number;
  img?: string;
  ingredients: string[];
  category:
    | "classic"
    | "cheese"
    | "premium"
    | "vegetarian"
    | "spicy"
    | "gourmet";
}

export interface CreateBurgerDto {
  name: string;
  description: string;
  price: number;
  img?: string;
  ingredients: string[];
  category:
    | "classic"
    | "cheese"
    | "premium"
    | "vegetarian"
    | "spicy"
    | "gourmet";
}


