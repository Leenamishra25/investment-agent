import { NextResponse } from "next/server";
import { runInvestmentAgent } from "@/agents/investmentGraph";


export async function POST(request: Request) {

  try {

    const body = await request.json();

    const company = body.company;


    if (!company) {
      return NextResponse.json(
        {
          error: "Company name is required"
        },
        {
          status: 400
        }
      );
    }


    const result = await runInvestmentAgent(company);


    return NextResponse.json(result);


  } catch (error) {

    console.log("ERROR HERE");
    console.log(error);


    return NextResponse.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    );

  }

}