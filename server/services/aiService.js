import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Production model chain using active 3.x series
const models = [
  "gemini-3.5-flash-lite",
  "gemini-3.5-flash",
  "gemini-2.5-flash",
];

const getLanguageRules = (language = "English") => {
  const normalized = language.trim().toLowerCase();

  if (normalized === "marathi") {
    return `
CRITICAL LANGUAGE REQUIREMENT: MARATHI (मराठी)
- The entire output MUST be written 100% in Marathi using the Devanagari script (मराठी भाषा).
- Do NOT output English words or Romanized script (no Marathlish).
- Use formal Marathi letter/email conventions:
  * Subject: विषय: ...
  * Salutation: आदरणीय महोदय / सस्नेह नमस्कार,
  * Sign-off: कळावे, आपला/आपली नम्र
`;
  }

  if (normalized === "hindi") {
    return `
CRITICAL LANGUAGE REQUIREMENT: HINDI (हिंदी)
- The entire output MUST be written 100% in Hindi using the Devanagari script (हिंदी भाषा).
- Do NOT output English words or Hinglish.
- Use formal Hindi business etiquette:
  * Subject: विषय: ...
  * Salutation: सादर प्रणाम / महोदय,
  * Sign-off: धन्यवाद, भवदीय
`;
  }

  return `
CRITICAL LANGUAGE REQUIREMENT: ENGLISH
- Write the entire email in fluent, natural, professional English.
`;
};

const aiService = async (topic, tone = "Professional", language = "English") => {
  const languageInstruction = getLanguageRules(language);

  const prompt = `
You are an expert multilingual email writer for "MailKaro".

${languageInstruction}

Email Details:
- Topic / Request: "${topic}"
- Desired Tone: "${tone}"

Structure:
- Clear Subject line (in the target language)
- Appropriate Greeting
- Body Paragraphs
- Professional Closing

Formatting Rules:
- Return ONLY the final email text.
- Do NOT include markdown code blocks (no \`\`\` or \`\`\`email).
`;

  let lastError;

  for (const model of models) {
    try {
      console.log(`[aiService] Calling ${model} with Language: ${language}`);
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      return response.text.replace(/```email|```/g, "").trim();
    } catch (error) {
      lastError = error;
      console.error(`[aiService] ${model} failed:`, error.message);
    }
  }

  throw lastError;
};

export const smartReplyService = async (
  incomingEmail,
  intent = "accept",
  tone = "professional",
  language = "English"
) => {
  const languageInstruction = getLanguageRules(language);

  const prompt = `
You are an expert multilingual email assistant for "MailKaro".

Incoming Email:
"${incomingEmail}"

Intent: ${intent}
Tone: ${tone}

${languageInstruction}

Generate 2 distinct reply variations strictly in valid JSON format without markdown code blocks:
{
  "quickReply": "A 1-2 sentence response written strictly in the target language",
  "detailedReply": "A formal, structured full response written strictly in the target language"
}
`;

  let lastError;

  for (const model of models) {
    try {
      console.log(`[smartReplyService] Calling ${model} with Language: ${language}`);
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      const cleanText = response.text.replace(/```json|```/g, "").trim();
      return JSON.parse(cleanText);
    } catch (error) {
      lastError = error;
      console.error(`[smartReplyService] ${model} failed:`, error.message);
    }
  }

  throw lastError;
};

export default aiService;