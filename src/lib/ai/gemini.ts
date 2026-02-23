import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function generateSummary(text: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
Summarize the following text clearly and concisely:

${text}
`,
  });

  return response.text;
}