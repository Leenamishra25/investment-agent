"use client";

import { useState } from "react";
function cleanText(text:string) {
  return text
    ?.replace(/\*\*/g, "")
    .replace(/\*/g, "•")
    .trim();
}
function getRecommendationColor(recommendation:string) {
  if (recommendation === "BUY") {
    return "bg-green-100 text-green-700";
  }

  if (recommendation === "PASS") {
    return "bg-red-100 text-red-700";
  }

  return "bg-yellow-100 text-yellow-700";
}
export default function Home() {

  const [company, setCompany] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function analyzeCompany() {
    try{
    if (!company.trim()) {
  alert("Please enter a company name");
  return;
}
    setLoading(true);
    setStatus("🔍 Research Agent analyzing...");

setTimeout(() => {
  setStatus("⚠️ Risk Agent analyzing...");
}, 1000);

setTimeout(() => {
  setStatus("💰 Financial Agent analyzing...");
}, 2000);

setTimeout(() => {
  setStatus("📰 News Agent analyzing...");
}, 3000);

setTimeout(() => {
  setStatus("🤖 Decision Agent preparing recommendation...");
}, 4000);

    const response = await fetch("/api/research", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        company: company,
      }),

    });

setStatus("📊 Risk, Financial & News Agents analyzing...");
    const data = await response.json();
    if (data.error) {

  alert("Unable to analyze company. Please try again.");

  setLoading(false);

  return;
}
await new Promise(resolve => setTimeout(resolve, 2000));

    setResult(data);
    setStatus("✅ Final decision generated");
    setLoading(false);

  } catch(error) {

    alert("Server error. Please try again.");

    setLoading(false);

  }

}


  return (

    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

<div className="bg-white text-gray-900 p-8 rounded-xl shadow-lg w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          InvestIQ
        </h1>
        <p className="text-center text-gray-500 mb-6">
  AI-Powered Multi-Agent Investment Research Platform
</p>


        <input

          value={company}

          onChange={(e)=>setCompany(e.target.value)}

          placeholder="Enter company name"

          className="border p-3 w-full rounded mb-4 text-gray-900 placeholder-gray-500"

        />


        <button

  onClick={analyzeCompany}

  disabled={loading}

  className="bg-black text-white px-5 py-3 rounded w-full disabled:opacity-50"

>

  {loading ? "🤖 AI Agents Running..." : "Analyze"}

</button>

{loading && (
  <p className="mt-4 text-center text-gray-500">
    {status}
  </p>
)}


        <div className="mt-6 border p-4 rounded">

          <h2 className="font-bold text-gray-400">
            Result
          </h2>


          {result && (
  <div className="mt-4 space-y-3">

    <div className="bg-black text-white p-4 rounded-lg">
  <h3 className="text-2xl font-bold">
    {result.company}
  </h3>

  <p className="mt-1">
    AI Investment Research Report
  </p>
</div>

<div className="bg-gray-100 text-gray-900 p-4 rounded-lg">  <h3 className="font-bold text-lg">
    Overview
  </h3>

<p className="mt-3 whitespace-pre-line leading-relaxed text-gray-700">
    {cleanText(result.overview)}
  </p>
</div>

<div className="bg-cyan-100 text-gray-900 p-4 rounded-lg">
  <h3 className="font-bold text-lg">
  
    Financial Analysis
  </h3>

  <p className="mt-3 whitespace-pre-line leading-relaxed text-gray-700">

    {cleanText(result.financial)}
  </p>
</div>

<div className="bg-purple-100 text-gray-900 p-4 rounded-lg">
  <h3 className="font-bold text-lg">
    News Analysis
  </h3>

<p className="mt-3 whitespace-pre-line leading-relaxed text-gray-700">
    {cleanText(result.news)}
  </p>
</div>

<div className={`p-4 rounded-lg ${getRecommendationColor(result.recommendation)}`}>

  <h3 className="font-bold">
    Recommendation
  </h3>

  <p className="text-2xl font-bold mt-2">
    {result.recommendation}
  </p>

</div>

<div className="bg-blue-100 text-gray-900 p-4 rounded-lg">  <h3 className="font-bold">
    Confidence
  </h3>

  <p className="text-xl font-bold">
    {result.confidence}
  </p>
</div>

<div className="bg-purple-100 text-gray-900 p-4 rounded-lg">
  <h3 className="font-bold">
    Analysis Time
  </h3>

  <p className="mt-2">
    {result.timestamp}
  </p>
</div>
<div className="bg-yellow-100 text-gray-900 p-4 rounded-lg">
  <h3 className="font-bold">
    Investment Score
  </h3>

  <p className="text-xl font-bold mt-2">
    {"⭐".repeat(Number(result.score))}{"☆".repeat(10 - Number(result.score))} 
({result.score}/10)
  </p>
</div>

<div className="bg-green-100 text-gray-900 p-4 rounded-lg">  <h3 className="font-bold text-lg">
    Strengths
  </h3>

  <ul className="list-disc ml-5 mt-2">
    {Array.isArray(result.strengths) ? (
  result.strengths.map((item:string, index:number)=>(
    <li key={index}>
      {item}
    </li>
  ))
) : (
  <li>{result.strengths}</li>
)}
  </ul>
</div>

<div className="bg-red-100 text-gray-900 p-4 rounded-lg">  <h3 className="font-bold text-lg">
    Risks
  </h3>

  <ul className="list-disc ml-5 mt-2">
 {Array.isArray(result.risks) ? (
  result.risks.slice(0,5).map((item:string, index:number)=>(
    <li key={index}>
      {item.replace(/^\d+\.\s*/, "")}
    </li>
  ))
) : (
  <li>{result.risks}</li>
)}
  </ul>
</div>

  </div>
)}

<div className="bg-gray-100 p-5 rounded-lg">

  <h3 className="font-bold text-lg text-gray-800 mb-4">
    Multi-Agent AI Workflow
  </h3>

  <div className="flex flex-col items-center gap-3 text-center">

    <div className="bg-blue-100 p-3 rounded-lg w-full">
      🔍 Research Agent
    </div>

    <div className="text-gray-500">
      ↓
    </div>

    <div className="bg-yellow-100 p-3 rounded-lg w-full">
      ⚠️ Risk Analysis Agent
    </div>

    <div className="text-gray-500">
      ↓
    </div>

    <div className="bg-green-100 p-3 rounded-lg w-full">
      💰 Financial Agent
    </div>

    <div className="text-gray-500">
      ↓
    </div>

    <div className="bg-purple-100 p-3 rounded-lg w-full">
      📰 News Agent
    </div>

    <div className="text-gray-500">
      ↓
    </div>

    <div className="bg-gray-200 p-3 rounded-lg w-full font-bold">
      🤖 Decision Agent
    </div>

  </div>

</div>


        </div>


      </div>

    </main>

  );
}