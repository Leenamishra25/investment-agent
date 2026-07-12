import { StateGraph, END } from "@langchain/langgraph";
import { researchAgent } from "./researchAgent";
import { riskAgent } from "./riskAgent";
import { decisionAgent } from "./decisionAgent";
import { financialAgent } from "./financialAgent";
import { newsAgent } from "./newsAgent";

type InvestmentState = {
  company: string;
  research?: string;
  risks?: string;
  financial?: string;
  news?: string;
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

    financial: {
  value: (prev, next) => next,
},

news: {
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

workflow.addNode("financialNode", async (state) => {

  const result = await financialAgent(state.company);

  return {
    financial: result
  };

});

workflow.addNode("newsNode", async (state) => {

  const result = await newsAgent(state.company);

  return {
    news: result
  };

});


workflow.addNode("decisionNode", async (state) => {

  const result = await decisionAgent(
    state.research || "",
    state.risks || "",
      state.financial || "",
        state.news || ""


  );

  return {
    decision: result
  };

});


workflow.setEntryPoint("researchNode" as any);

workflow.addEdge("researchNode" as any, "riskNode" as any);
workflow.addEdge("riskNode" as any, "financialNode" as any);
workflow.addEdge("financialNode" as any, "newsNode" as any);
workflow.addEdge("newsNode" as any, "decisionNode" as any);

workflow.addEdge("decisionNode" as any, END);

export const investmentWorkflow = workflow.compile();