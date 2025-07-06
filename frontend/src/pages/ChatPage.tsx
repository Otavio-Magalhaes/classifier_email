import { Sidebar } from "../components/Sidebar/Sidebar";
import { ChatMessage } from "../components/ChatMessage/ChatMessage";
import { ChatInput } from "../components/ChatInput/ChatInput";
import { useState } from "react";
import { processarEmail } from "../services/emailService";


export const ChatPage = () => {
  const [messages, setMessages] = useState<any[]>([]);

  const handleSendMessage = async (message: string, file?: File) => {
    const newMessage = {
      id: Date.now(),
      email: message,
      file,
      result: null,
      status: "loading",
    };

    console.log(newMessage)
    setMessages((prev) => [...prev, newMessage]);

    try {
      const result = await processarEmail(message, file);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id
            ? { ...msg, result, status: "done" }
            : msg
        )
      );
    } catch (error) {
      console.error(error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id
            ? { ...msg, status: "error" }
            : msg
        )
      );
    }
  };

  return (
    <div className="flex bg-background-page justify-center min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center p-6">
        <div className="w-full max-w-3xl flex flex-col space-y-4 mb-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
        <div className="w-full max-w-3xl">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </main>

    </div>
  );
};
