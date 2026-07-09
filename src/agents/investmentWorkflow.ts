import { StateGraph, END } from "@langchain/langgraph";
import { researchAgent } from "./researchAgent";
import { riskAgent } from "./riskAgent";
import { decisionAgent } from "./decisionAgent";


type InvestmentState = {
  company: string;
  research?: string;
  risks?: string;
  decision?: any;
};


const workflow = new StateGraph<InvestmentState>({
  channels: {
    company: {
      value: (prev, next) => next,
    },

    research: {
      value: (prev, next) => next,
    },

    risks: {
      value: (prev, next) => next,
    },

    decision: {
      value: (prev, next) => next,
    },
  },
});


workflow.addNode("researchNode", async (state) => {

  const result = await researchAgent(state.company);

  return {
    research: result
  };

});


workflow.addNode("riskNode", async (state) => {

  const result = await riskAgent(state.company);

  return {
    risks: result
  };

});


workflow.addNode("decisionNode", async (state) => {

  const result = await decisionAgent(
    state.research || "",
    state.risks || ""
  );

  return {
    decision: result
  };

});


workflow.setEntryPoint("researchNode" as any);

workflow.addEdge("researchNode" as any, "riskNode" as any);
workflow.addEdge("riskNode" as any, "decisionNode" as any);
workflow.addEdge("decisionNode" as any, END);

export const investmentWorkflow = workflow.compile();