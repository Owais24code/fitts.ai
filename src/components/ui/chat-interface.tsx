"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useChat } from "ai/react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-3 transition-opacity",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Avatar className={cn("h-8 w-8", isUser ? "ml-2" : "mr-2")}>
        <AvatarFallback className={isUser ? "bg-blue-500" : "bg-zinc-800"}>
          {isUser ? (
            <User className="h-4 w-4 text-white" />
          ) : (
            <Bot className="h-4 w-4 text-white" />
          )}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "flex max-w-sm flex-col gap-1",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2",
            isUser ? "bg-blue-500 text-white" : "bg-zinc-100 dark:bg-zinc-800"
          )}
        >
          {message.content}
        </div>
        <span className="px-2 text-xs text-zinc-500">
          {format(message.timestamp, "HH:mm")}
        </span>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-zinc-800">
          <Bot className="h-4 w-4 text-white" />
        </AvatarFallback>
      </Avatar>
      <div className="flex space-x-1 bg-zinc-100 dark:bg-zinc-800 rounded-full px-4 py-2">
        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" />
      </div>
    </div>
  );
}

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
    });
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const formattedMessages: Message[] = messages
    .filter(
      (msg): msg is Message => msg.role === "user" || msg.role === "assistant"
    )
    .map((msg) => ({
      ...msg,
      timestamp: new Date(),
    }));

  return (
    <div className="flex h-full flex-col bg-white dark:bg-zinc-950">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {formattedMessages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && <TypingIndicator />}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Ask about fashion trends, outfit ideas, or style tips..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
