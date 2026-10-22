import { generateText, Output } from "ai";
import { z } from "zod";

export const chatModel = "openai/gpt-4.1-mini";

const extractedFactsSchema = z.object({
    facts: z.array(z.string()),
});

/**
 * Extracts useful facts from a user chat message input
 * @param input - User chat message input
 * @returns - list of facts taken from the input
 */
export async function extractFacts(input: string): Promise<string[]> {
    const { output } = await generateText({
        model: chatModel,
        output: Output.object({
            schema: extractedFactsSchema,
        }),
        system: `
            Extract useful information about the user that many help personalize future conversations.

            Rules:
            - Return only facts supported by the message.
            - Do not turn questions of hypothetical statements into facts about the user.
            - Prefer concise, self-contained statements.
            - Avoid extracting trivial or temporary details.
            - Return an empty array if there is nothing useful to remember.
        `,
        prompt: input,
    });

    return output.facts;
}
