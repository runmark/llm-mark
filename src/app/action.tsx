'use server';

import { CoreMessage, streamText } from "ai";
import { openai } from "./api/chat/route";
import { createStreamableValue } from "ai/rsc";

export const continueConversation = async (messages: CoreMessage[]) => {
    const result = await streamText({
        model: openai('gpt-3.5-turbo'),
        messages,
    });

    return createStreamableValue(result.textStream).value;
};