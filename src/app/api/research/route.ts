import { NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

console.log("API KEY:", process.env.GOOGLE_API_KEY);

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  temperature: 0.3,
});


export async function POST(request: Request) {

  try {

    const body = await request.json();

    const company = body.company;


    const response = await model.invoke(`



You are an expert investment research analyst.

Analyze this company:

${company}

Return ONLY valid JSON.

Do not write markdown.
Do not add any extra explanation.

Use this exact format:

{
  "company": "company name",
  "overview": "short company description",
  "strengths": [
    "strength 1",
    "strength 2"
  ],
  "risks": [
    "risk 1",
    "risk 2"
  ],
  "recommendation": "INVEST or WATCH or PASS",
  "confidence": "percentage number"
}



`);

const cleanResponse = response.content
  .toString()
  .replace("```json", "")
  .replace("```", "")
  .trim();


const result = JSON.parse(cleanResponse);


return NextResponse.json(result);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
  {
    result: String(error)
  },
  {
    status: 500
  }
);

}
}