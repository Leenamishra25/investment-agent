import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0.3,
});

export async function decisionAgent(
  research: string,
  risks: string
) {

  const response = await model.invoke(`

You are an investment decision analyst.

Company Research:
${research}

Risk Analysis:
${risks}

Based on this information decide:

Return ONLY valid JSON.
The score field is mandatory. Always return it.

{
 "recommendation": "BUY or WATCH or PASS",
 "confidence": "percentage",
 "score": "number out of 10",
 "reason": "short explanation"
}

`);

  const text = response.content.toString()
.replace(/```json/g,"")
.replace(/```/g,"")
.trim();

return JSON.parse(text);

}