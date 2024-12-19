// src/chains/recipe_generator.ts
import { Chain,  ChainValues } from "@arakoodev/edgechains";
import { OpenRouterLLM } from "../models/openrouter";
import { recipePrompt } from "../utils/prompts";

interface RecipeGeneratorOptions {
  llm?: OpenRouterLLM;
}

export class RecipeGenerator extends Chain {
    llm: OpenRouterLLM;
    constructor(options?: RecipeGeneratorOptions) {
        super();
       this.llm = options?.llm || new OpenRouterLLM();
    }

    async _call(values: ChainValues): Promise<ChainValues> {
        const { ingredients, preferences } = values;
        if (!ingredients || !preferences) {
          throw new Error("Ingredients and preferences are required.");
        }
         const prompt = recipePrompt.replace("{{ingredients}}", ingredients).replace("{{preferences}}", preferences)
        const result = await this.llm.call(prompt);
        return { recipe: result.text };
    }
}
