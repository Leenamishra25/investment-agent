import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
  model: "llama-3.3-70b-versatile",
  temperature: 0.3,
});

export async function newsAgent(company: string) {

  const response = await model.invoke(`

You are a financial news analyst.

Analyze the latest market news and overall sentiment for ${company}.

Return a short report with:

- Positive News
- Negative News
- Overall Market Sentiment
- Expected Market Impact

Keep the response under 150 words.

`);

  return response.content.toString();
}