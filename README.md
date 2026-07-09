# AI Investment Research Agent

An AI-powered investment research assistant that analyzes companies using multiple AI agents and provides insights, risks, recommendations, confidence score, and investment score.

## Features

- AI-based company research
- Risk analysis using a dedicated AI agent
- Investment decision generation
- Confidence score prediction
- Investment score rating
- Multi-agent workflow using LangGraph
- Interactive Next.js dashboard

## How It Works

User enters a company name.

The request goes through:

User
↓
Next.js Frontend
↓
API Route
↓
LangGraph Workflow
↓
Research Agent
↓
Risk Agent
↓
Decision Agent
↓
Final Investment Report


## AI Agents

### 1. Research Agent
Analyzes company background, business model, and market presence.

### 2. Risk Agent
Identifies possible business, financial, market, and technology risks.

### 3. Decision Agent
Combines research and risks to generate:
- Recommendation (BUY/WATCH/PASS)
- Confidence score
- Investment score


## Tech Stack

Frontend:
- Next.js
- React
- Tailwind CSS

Backend:
- Next.js API Routes
- LangGraph

AI:
- Groq LLM
- LangChain

Language:
- TypeScript


## Future Improvements

- Real-time stock market data integration
- Portfolio tracking
- Historical analysis
- More financial indicators
- User authentication


## Author

Leena Mishra