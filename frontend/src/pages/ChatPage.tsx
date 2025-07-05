import { Sidebar } from "../components/Sidebar/Sidebar";
import { ChatMessage } from "../components/ChatMessage/ChatMessage";
import { ChatInput } from "../components/ChatInput/ChatInput";

export const ChatPage = () => {
  return (
    <div className="flex bg-background-page min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <ChatMessage />
        <ChatInput />
      </main>
    </div>
  );
};
