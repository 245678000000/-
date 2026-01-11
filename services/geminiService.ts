import { GoogleGenAI } from "@google/genai";
import { UserSettings } from "../types";

const apiKey = process.env.API_KEY || '';
// Initialize conditionally to prevent crashes if key is missing during initial render, 
// though the prompt implies we assume it's there.
const ai = new GoogleGenAI({ apiKey });

export const generateEmergencyEmail = async (
  settings: UserSettings, 
  daysMissed: number
): Promise<{ subject: string; body: string }> => {
  if (!apiKey) {
    return {
      subject: "API KEY MISSING",
      body: "Please configure your API Key to generate the email."
    };
  }

  const model = "gemini-3-flash-preview";
  
  const prompt = `
    You are an automated alert system for an app called "怀了吗" (Pregnant?).
    The app requires the user to "Check-in" (implying sexual activity) daily.
    
    User: ${settings.userName}
    Partner/Emergency Contact: ${settings.partnerName}
    
    The user has missed their check-in for ${daysMissed} day(s).
    
    Task: Write a humorous, slightly urgent, and witty email to the Partner/Emergency Contact.
    The tone should be playful but reminding them that consistency is key (or warning them of the "consequences" of not checking in).
    
    Return the response in JSON format with "subject" and "body" fields.
    Language: Chinese (Simplified).
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      subject: "⚠️ 紧急提醒：每日打卡中断",
      body: `${settings.partnerName} 您好，检测到 ${settings.userName} 今日尚未完成打卡。请尽快联系确认状况。`
    };
  }
};