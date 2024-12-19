// src/utils/prompts.ts

export const recipePrompt = `Given the following list of ingredients:

{{ingredients}}

And the following preferences:
{{preferences}}

Generate a detailed recipe including the name of the dish, a list of ingredients, and step-by-step instructions. Also provide an estimate for total time required.
`;


export const mealPlanPrompt = `Given the following list of recipes:

{{recipes}}

Generate a 3 day meal plan with an estimate of meal time (Breakfast, Lunch or Dinner).
`;
