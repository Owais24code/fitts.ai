"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface MessageBubbleProps {
  message: Message;
}

function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex",
        message.role === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div className="flex items-start gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            {message.role === "user" ? (
              <User className="h-4 w-4" />
            ) : (
              <Bot className="h-4 w-4" />
            )}
          </AvatarFallback>
        </Avatar>
        <div
          className={cn(
            "rounded-lg px-3 py-2 max-w-md",
            message.role === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          )}
        >
          <p className="text-sm">{message.content}</p>
          <time className="text-xs text-muted-foreground mt-1">
            {format(message.timestamp, "HH:mm")}
          </time>
        </div>
      </div>
    </div>
  );
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// Static messages data
const staticMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! How can I help you with fashion today?",
    timestamp: new Date(),
  },
  {
    id: "2",
    role: "user",
    content: "What are the trending colors this season?",
    timestamp: new Date(),
  },
  {
    id: "3",
    role: "assistant",
    content:
      "This season's trending colors include sage green, lavender, and warm terracotta.",
    timestamp: new Date(),
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2">
      <Avatar className="h-8 w-8">
        <AvatarFallback>
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="flex space-x-2">
        <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-300"></div>
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-zinc-300"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-zinc-300"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(staticMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    const botResponses = {
      // Fashion Basics
      "What are the basic fashion rules?":
        "Key fashion rules include: dress for your body type, invest in quality basics, and ensure proper fit.",
      "How do I build a capsule wardrobe?":
        "Start with versatile pieces: neutral colors, classic cuts, and items that can be mixed and matched easily.",
      "What's business casual attire?":
        "Business casual typically includes slacks, button-downs, blazers, knee-length skirts, and closed-toe shoes.",

      // Seasonal Fashion
      "What should I wear in spring?":
        "Light layers, floral prints, pastels, and breathable fabrics work well for spring weather.",
      "What are summer fashion essentials?":
        "Light fabrics, sundresses, shorts, sandals, and breathable materials are summer must-haves.",
      "What's trending for fall fashion?":
        "Layered looks, earth tones, boots, and cozy knits are perfect for fall.",
      "How do I dress for winter?":
        "Focus on warm layers, wool coats, boots, scarves, and thermal materials.",

      // Style Advice
      "How do I dress for my body type?":
        "Focus on highlighting your favorite features and choose cuts that complement your natural shape.",
      "What colors suit pale skin?":
        "Jewel tones like emerald, sapphire, and ruby often complement pale skin tones beautifully.",
      "How do I mix patterns?":
        "Start with similar color families and vary pattern sizes - larger with smaller prints usually work well.",

      // Accessories
      "How to choose the right bag?":
        "Consider your lifestyle, daily needs, and ensure it complements your usual outfits.",
      "What jewelry goes with everything?":
        "Classic pieces like pearl studs, simple gold chains, and minimal rings are versatile choices.",
      "How to style a scarf?":
        "Scarves can be worn as neck accessories, head wraps, bag accessories, or even as tops.",

      // Shoes
      "What shoes are office appropriate?":
        "Closed-toe pumps, loafers, oxford shoes, and conservative flats work well in most offices.",
      "How many pairs of shoes do I need?":
        "A basic wardrobe should include everyday sneakers, formal shoes, casual flats, and weather-appropriate boots.",
      "How to match shoes with outfits?":
        "Consider the occasion, outfit color scheme, and comfort level needed for the activity.",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          botResponses[input as keyof typeof botResponses] ||
          "I'm not sure about that. Could you try asking something about fashion trends or styling advice?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-full flex-col bg-white dark:bg-zinc-950">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
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
            onChange={(e) => setInput(e.target.value)}
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
