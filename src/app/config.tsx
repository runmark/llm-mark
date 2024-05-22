

export const config = {
    useOllamaInference: false,
    inferenceModel: 'llama3-8b-8192', // Groq: 'mixtral-8x7b-32768', 'gemma-7b-it' // OpenAI: 'gpt-3.5-turbo', 'gpt-4' // Ollama 'mistral', 'llama3' etc

    useOllamaEmbeddings: false,
    embeddingsModel: 'text-embedding-3-small', // Ollama: 'llama2', 'nomic-embed-text' // OpenAI 'text-embedding-3-small', 'text-embedding-3-large'

    nonOllamaBaseURL: 'https://api.groq.com/openai/v1', //Groq: https://api.groq.com/openai/v1 // OpenAI: https://api.openai.com/v1 
    inferenceAPIKey: process.env.GROQ_API_KEY, // Groq: process.env.GROQ_API_KEY // OpenAI: process.env.OPENAI_API_KEY // Ollama: 'ollama' is the default

    searchProvider: 'serper', // 'serper', 'google' // 'serper' is the default

    textChunkSize: 1000, // Recommended to decrease for Ollama
    textChunkOverlap: 400, // Recommended to decrease for Ollama

    numberOfSimilarityResults: 4, // Number of similarity results to return per page
    numberOfPagesToScan: 10, // Recommended to decrease for Ollama

    useFunctionCalling: true, // Set to true to enable function calling and conditional streaming UI (currently in beta)
    useRateLimiting: false, // Uses Upstash rate limiting to limit the number of requests per user
};