'use client';

import { CoreMessage } from "ai";
import { useState } from "react";
import { continueConversation } from "./action";
import { readStreamableValue } from "ai/rsc";

export default function Chat() {

    const [messages, setMessages] = useState<CoreMessage[]>([]);
    const [input, setInput] = useState("");

    return (
        <div>
            {messages.map((m, i) => (
                <div key={i} className="whitespace-pre-wrap">
                    {m.role === "user" ? "User: " : "AI: "}
                    {m.content as string}
                </div>
            ))}
            <form onSubmit={async () => {
                const newMessages: CoreMessage[] = [
                    ...messages,
                    { role: "user", content: input },
                ];

                setMessages(newMessages);
                setInput("");

                const result = await continueConversation(newMessages);

                for await (const content of readStreamableValue(result)) {
                    setMessages([
                        ...newMessages,
                        { role: "assistant", content: content as string }
                    ]);
                }
            }}>
                <input
                    value={input}
                    placeholder="enter sth..."
                    onChange={(e) => setInput(e.target.value)}
                />
            </form>
        </div >
    );
}