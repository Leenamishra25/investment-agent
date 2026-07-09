"use client";

import { useState } from "react";

export default function Home() {

  const [company, setCompany] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function analyzeCompany() {
    try{
    if (!company.trim()) {
  alert("Please enter a company name");
  return;
}
    setLoading(true);

    const response = await fetch("/api/research", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        company: company,
      }),

    });


    const data = await response.json();
    if (data.error) {

  alert("Unable to analyze company. Please try again.");

  setLoading(false);

  return;
}

    setResult(data);
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
          AI Investment Research Agent
        </h1>


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


        <div className="mt-6 border p-4 rounded">

          <h2 className="font-bold text-gray-900">
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

  <p className="mt-2">
    {result.overview}
  </p>
</div>

<div className={`p-4 rounded-lg text-gray-900 ${
  result.recommendation === "BUY"
  ? "bg-green-100"
  : result.recommendation === "PASS"
  ? "bg-red-100"
  : "bg-yellow-100"
}`}>  <h3 className="font-bold">
    Recommendation
  </h3>

  <p className="text-xl font-bold">
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


        </div>


      </div>

    </main>

  );
}