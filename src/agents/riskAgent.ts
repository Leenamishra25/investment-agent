import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0.3,
});

export async function riskAgent(company: string) {

  const response = await model.invoke(`

You are a risk analysis expert.

Analyze this company:

${company}

List the major investment risks.

Return only the risks.

`);

  return response.content.toString();

}