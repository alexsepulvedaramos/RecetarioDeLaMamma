export interface Foods {
  id:              string;
  name:            Name[];
  plannerCategory: PlannerCategory;
  iconURL:         string;
  selected:        boolean;
}

export interface Name {
  name:     string;
  language: Language;
}

export enum Language {
  En = "EN",
  Es = "ES",
}

export enum PlannerCategory {
  Carbs = "Carbs",
  DairyAndBeverages = "Dairy and Beverages",
  Fats = "Fats",
  Fruits = "Fruits",
  Proteins = "Proteins",
  Salad = "Salad",
  Vegetables = "Vegetables",
}
