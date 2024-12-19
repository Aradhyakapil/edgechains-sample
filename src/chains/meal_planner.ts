// src/chains/meal_planner.ts
import { Chain,  ChainValues } from "@arakoodev/edgechains";
import { OpenRouterLLM } from "../models/openrouter";
import { mealPlanPrompt } from "../utils/prompts";

interface MealPlannerOptions {
    llm?: OpenRouterLLM;
}

export class MealPlanner extends Chain {
    llm: OpenRouterLLM;
    constructor(options?: MealPlannerOptions) {
        super();
        this.llm = options?.llm || new OpenRouterLLM();
    }

    async _call(values: ChainValues): Promise<ChainValues> {
        const { recipes } = values;
        if (!recipes) {
            throw new Error("Recipes are required");
        }
        const prompt = mealPlanPrompt.replace("{{recipes}}", recipes);
        const result = await this.llm.call(prompt);
        return { mealPlan: result.text };
    }
}
