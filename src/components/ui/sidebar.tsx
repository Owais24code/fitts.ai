"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const [chatHistory] = useState([
    { id: 1, title: "Summer outfit ideas" },
    { id: 2, title: "Formal wear for wedding" },
    { id: 3, title: "Casual Friday looks" },
  ]);

  return (
    <div className="w-64 bg-gradient-to-bl from-purple-200 to-slate-700 p-4 shadow-md">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Chat History</h2>
        <ul className="space-y-2">
          {chatHistory.map((chat) => (
            <li key={chat.id}>
              <Button
                variant="ghost"
                className="w-full justify-start text-left"
              >
                {chat.title}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
