import { GoogleGenAI } from "@google/genai";

//
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const runChat = async (prompt) => {
  try {
   
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return response.text;
  } catch (error) {
    console.error("Gemini 3.1 API Error:", error);
    return "Service temporarily unavailable.";
  }
};

export default runChat;