import { GoogleGenAI, Type } from "@google/genai";
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const ai = new GoogleGenAI({ apiKey });

const main = async (prompt) => {
  if (!apiKey) {
    throw new Error("Missing GOOGLE_API_KEY");
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              eventName: {
                type: Type.STRING,
                description: "Name of the event",
                nullable: false,
              },
              eventDate: {
                type: Type.STRING,
                description: "Date of the event",
                nullable: false,
              },
              eventParticipants: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                  description: "Participants of the event",
                  nullable: false,
                },
                nullable: false,
              },
            },
            required: ["eventName", "eventDate", "eventParticipants"],
          },
        },
      },
    });

    // console.debug(response.text);
    const result = response.text;
    const jsonObj = JSON.parse(result);
    console.log(jsonObj);
    return jsonObj;
  } catch (e) {
    console.log(e);
  }
};
export default main;
