import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0.3,
});

export async function researchAgent(company: string) {

  const response = await model.invoke(`

You are a company research analyst.

Analyze this company:

${company}

Give only a short company overview.

`);

  return response.content.toString();
}