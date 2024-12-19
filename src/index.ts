// src/index.ts

import { RecipeGenerator } from "./chains/recipe_generator";
import { MealPlanner } from "./chains/meal_planner";

async function main() {
    const recipeGenerator = new RecipeGenerator();
    const mealPlanner = new MealPlanner();

    const ingredients = "chicken, rice, vegetables";
    const preferences = "healthy, low-carb";

    console.log("Generating recipe...");

    const { recipe } = await recipeGenerator.call({ ingredients, preferences });
    console.log("Generated Recipe:", recipe);

    console.log("Generating meal plan...");

    const { mealPlan } = await mealPlanner.call({recipes: recipe});
     console.log("Generated Meal Plan", mealPlan);
}
main();
