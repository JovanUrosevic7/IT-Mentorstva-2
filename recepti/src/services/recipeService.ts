import { Recipe, RecipesResponse } from "@/types/recipe";
import axios from "axios";
import { Rewrite } from "next/dist/lib/load-custom-routes";


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

export async function getRecipeById(id: string): Promise<Recipe[] | null> {

    try {
        const response = await api.get<RecipesResponse>(`/response/${id}`)
        return response.data.recipes
    } catch {
        return null;
    }

}

export async function getRecipeByTag(tag: string): Promise<Recipe[]> {

    try {
        const response = await api.get<RecipesResponse>(`/recipes/tag/${tag}`)
        return response.data.recipes
    } catch (error) {
        console.error(`Greška pri dobavljanju recepata za tag ${tag}:`, error);
        return [];
    }
}