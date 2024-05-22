import 'server-only';

import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { OpenAIEmbeddings } from '@langchain/openai';
import { OpenAI } from 'openai';
import { config } from './config';
// import { functionCalling } from './function-calling';
// OPTIONAL: Use Upstash rate limiting to limit the number of requests per user

// 1. determine which inference model and embedding model to use based on config.tsx
// (2+3) define interfaces for search results and content results  
// 2. fetch search results from Brave Search API
// 3. fetch contents of top10 search results
// 4. process and vectorize content using Langchain
// 5. fetch image search results from Serper API
// 6. fetch video search results from Serper API
// 7. generate follow-up questions using OpenAI API
// 8. main function that orchestrates the entire process
// 9. define initial AI and UI states
// 10. export the AI instance

// 1. determine which inference model and embedding model to use based on config.tsx
let openai: OpenAI = config.useOllamaInference ? (
    new OpenAI({
        baseURL: "http://localhost:11434/v1",
        apiKey: 'ollama',
    })
) : (
    new OpenAI({
        baseURL: config.nonOllamaBaseURL,
        apiKey: config.inferenceAPIKey,
    })
);

let embeddings: OllamaEmbeddings | OpenAIEmbeddings = config.useOllamaEmbeddings ? (
    new OllamaEmbeddings({
        model: config.embeddingsModel,
        baseUrl: "http://localhost:11434"
    })
) : (
    new OpenAIEmbeddings({
        modelName: config.embeddingsModel
    })
);

// (2+3) define interfaces for search results and content results  
interface SearchResult {
    title: string;
    link: string;
    favicon: string;
}

interface ContentResult extends SearchResult {
    html: string;
}

// 2. fetch search results from Brave Search API

// 3. fetch contents of top10 search results

// 4. process and vectorize content using Langchain

// 5. fetch image search results from Serper API

// 6. fetch video search results from Serper API

// 7. generate follow-up questions using OpenAI API

// 8. main function that orchestrates the entire process

// 9. define initial AI and UI states

// 10. export the AI instance