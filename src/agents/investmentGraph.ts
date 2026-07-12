import { investmentWorkflow } from "./investmentWorkflow";


export async function runInvestmentAgent(company:string){

  const result = await investmentWorkflow.invoke({
    company: company
  });


  const decision = result.decision as {
  recommendation: string;
  confidence: string;
  score: string;
  reason: string;
};
console.log("DECISION OUTPUT:", decision);


  return {
    company: company,

    overview: result.research,
    financial: result.financial,
    news: result.news,

    strengths: [
      "Strong market presence",
      "Technology and innovation capabilities",
      "Growing business opportunities"
    ],

    risks: typeof result.risks === "string"
  ? result.risks
      .split("\n")
      .filter((item:string)=>item.trim() !== "")
  : [],


   recommendation: decision.recommendation,
   

    confidence: decision.confidence,
    timestamp: new Date().toLocaleString(),
    score: decision.score

  };

}