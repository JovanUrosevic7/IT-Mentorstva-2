

export interface Recipe {

    id: number
    name: string,
    ingredients: string[],
    instructions: string[],
    prepTimeMinutes: number,
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    rating: number;
    reviewCount: number;
    image: string;
    tags: string[];

}

export interface RecipesResponse{
    recipes: Recipe[],
    total: number,
    skip: number,
    limit: number
}

