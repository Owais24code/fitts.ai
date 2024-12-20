import { Sidebar } from "@/components/ui/sidebar";
import { ChatInterface } from "@/components/ui/chat-interface";

export default function Home() {
  return (
    <main className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Fashion Chatbot
            </h1>
          </div>
        </header>
        <ChatInterface />
      </div>
    </main>
  );
}
