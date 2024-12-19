// src/models/openrouter.ts
import { BaseLLM, LLMResult, LLMOptions } from "@arakoodev/edgechains";
import { Configuration, OpenAIApi } from "openai";
import { OPENROUTER_API_KEY, OPENROUTER_MODEL } from "../config";

export class OpenRouterLLM extends BaseLLM {
    model: string;
    openRouterApi: any;
    constructor(options?: LLMOptions) {
        super(options);
        this.model = OPENROUTER_MODEL;
        this.openRouterApi = new OpenAIApi(new Configuration({
            apiKey: OPENROUTER_API_KEY,
            basePath: 'https://openrouter.ai/api/v1'
        }))
    }

    async call(prompt: string, options?: LLMOptions): Promise<LLMResult> {
        try {
            const completion = await this.openRouterApi.createChatCompletion({
                model: this.model,
                messages: [{ role: "user", content: prompt }],
              });

            return {
                text: completion.data.choices[0].message?.content || '',
            };
        } catch (error: any) {
            console.error("Error calling Open Router API", error.response?.data || error.message);
            return { text: `Error: ${error.message}` };
        }
    }

    _get_llm_type(): string {
        return "openrouter";
    }
}
