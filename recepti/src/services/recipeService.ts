import { Recipe, RecipesResponse } from "@/types/recipe";
import axios from "axios";


const api = axios.create({
    baseURL: "https://dummyjson.com",
})

export async function getAllRecipes(limit: number = 0): Promise<Recipe[]> {

    try {
        const response = await api.get<RecipesResponse>(`/recipes?limit=${limit}`)
        return response.data.recipes
    } catch (error) {
        console.error("Greška pri dobavljanju recepata:", error);
        return [];
    }

}

export async function getRecipeById(id: string | number): Promise<Recipe | null> {

    try {

        const numericId = typeof id === "string" ? parseInt(id, 10) : id

        const response = await api.get<Recipe>(`/recipes/${numericId}`)
        return response.data
    } catch {
        return null;
    }

}

export async function getRecipeByTag(tag: string): Promise<Recipe[]> {

    try {
        const encodedTag = encodeURIComponent(tag)
        const response = await api.get<RecipesResponse>(`/recipes/tag/${encodedTag}`)
        return response.data.recipes
    } catch (error) {
        console.error(`Greška pri dobavljanju recepata za tag ${tag}:`, error);
        return [];
    }
}

export async function getRecipeByCusion(cuisine: string): Promise<Recipe[]> {

    try {
        const allRecipes = await getAllRecipes(0)
        return allRecipes.filter((recipe) => recipe.cuisine.toLowerCase() === cuisine.toLowerCase())


    } catch (error) {
        console.error(`Greška pri dobavljanju recepata za kuhinju ${cuisine}:`, error);
        return [];
    }

}

export async function getPaginatedRecipes(page: number = 1, limit: number = 9): Promise<{ recipes: Recipe[], total: number }> {

    try {
        const skip = (page - 1) * limit
        const response = await api.get<RecipesResponse>(`/recipes?limit=${limit}&skip=${skip}`)

        return {
            recipes: response.data.recipes,
            total: response.data.total,
        };
    } catch (error) {
        console.error("Greška pri dobavljanju paginiranih recepata:", error);
        return { recipes: [], total: 0 };
    }


}

export async function getRecipesByMealType(mealType: string): Promise<Recipe[]> {

    try {
        const encodedType = encodeURIComponent(mealType);
        const response = await api.get<RecipesResponse>(`/recipes/meal-type/${encodedType}`)
        return response.data.recipes
    } catch (error) {
        console.error(`Greška pri dobavljanju recepata za obrok ${mealType}:`, error);
        return [];
    }

}