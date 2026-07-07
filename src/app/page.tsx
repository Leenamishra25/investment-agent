"use client";

import { useState } from "react";

export default function Home() {

  const [company, setCompany] = useState("");
  const [result, setResult] = useState("");

  async function analyzeCompany() {

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

    setResult(data.result);

  }


  return (

    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">

        <h1 className="text-3xl font-bold mb-6 text-center">
          AI Investment Research Agent
        </h1>


        <input

          value={company}

          onChange={(e)=>setCompany(e.target.value)}

          placeholder="Enter company name"

          className="border p-3 w-full rounded mb-4"

        />


        <button

          onClick={analyzeCompany}

          className="bg-black text-white px-5 py-3 rounded w-full"

        >

          Analyze

        </button>


        <div className="mt-6 border p-4 rounded">

          <h2 className="font-bold">
            Result
          </h2>


          <p>
            {result}
          </p>


        </div>


      </div>

    </main>

  );
}