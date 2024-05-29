import 'server-only';

import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { OpenAIEmbeddings } from '@langchain/openai';
import { OpenAI } from 'openai';
import { config } from './config';
import cheerio from "cheerio";
import { TIMEOUT } from 'dns';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { error } from 'console';
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
export async function getSources(message: string, numberOfPagesToScan = config.numberOfPagesToScan): Promise<SearchResult[]> {
    try {
        const response = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(message)}&count=${numberOfPagesToScan}`, {
            headers: {
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip',
                'X-Subscription-Token': process.env.BRAVE_SEARCH_API_KEY as string
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        if (!jsonResponse.web || !jsonResponse.web.results) {
            throw new Error("Invalid API response format");
        }

        const final = jsonResponse.web.results.map((result: any): SearchResult => ({
            title: result.title,
            link: result.url,
            favicon: result.profile.img,
        }));

        return final;
    } catch (err) {
        console.log("Error fetching search result: ", err);
        throw err;
    }
}

// 3. fetch contents of search results
export const getBlueLinksContent = async (sources: SearchResult[]): Promise<ContentResult[]> => {
    const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 800): Promise<Response> => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(timeoutId);

            return response;
        } catch (err) {
            if (err) {
                console.log(`skipping ${url}!`);
            }
            throw err;
        }
    };

    // b.parse and extract needful content
    const extractMainContent = (html: string): string => {
        try {
            const $ = cheerio.load(html);
            $("script, style, head, footer, nav, iframe, img").remove();

            return $("body").text().replace(/\s+/g, " ").trim();
        } catch (err) {
            console.log("Error extracting main content: ", err);
            throw error;
        }
    };

    const contentPromises = sources.map(async (source): Promise<ContentResult | null> => {
        try {
            const response = await fetchWithTimeout(source.link, {}, 800);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${source.link}. Status: ${response.status}`);
            }

            const mainContent = extractMainContent(await response.text());
            return { ...source, html: mainContent };
        } catch (err) {
            return null;
        }
    });

    try {
        const results = await Promise.all(contentPromises);
        return results.filter((content): content is ContentResult => content !== null);
    } catch (err) {
        console.log(`Error fetching and processing blue links contents: `, err);
        throw err;
    }
}

// 4. process and vectorize content using Langchain

// 5. fetch image search results from Serper API

// 6. fetch video search results from Serper API

// 7. generate follow-up questions using OpenAI API

// 8. main function that orchestrates the entire process

// 9. define initial AI and UI states

// 10. export the AI instance