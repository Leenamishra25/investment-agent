import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0.3,
});

export async function financialAgent(company: string) {

  const response = await model.invoke(`
You are a financial analyst.

Analyze the financial health of ${company}.

Return ONLY a short report including:

- Revenue Growth
- Profitability
- Debt Level
- Financial Health Score (out of 10)

Keep the response under 150 words.
`);

  return response.content.toString();
}