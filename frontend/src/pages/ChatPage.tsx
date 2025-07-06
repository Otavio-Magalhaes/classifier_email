import { Sidebar } from "../components/Sidebar/Sidebar";
import { ChatMessage } from "../components/ChatMessage/ChatMessage";
import { ChatInput } from "../components/ChatInput/ChatInput";
import { useState } from "react";
import { processarEmail } from "../services/emailService";

export const ChatPage = () => {
  const [chats, setChats] = useState<
    { id: number; title: string; messages: any[] }[]
  >([]);
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);

  const handleSendMessage = async (message: string, file?: File) => {
    if (currentChatId === null) return;

    const newMessage = {
      id: Date.now(),
      email: message,
      file,
      result: null,
      status: "loading",
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );

    try {
      const result = await processarEmail(message, file);
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: chat.messages.map((msg) =>
                  msg.id === newMessage.id
                    ? { ...msg, result, status: "done" }
                    : msg
                ),
              }
            : chat
        )
      );
    } catch (error) {
      console.error(error);
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: chat.messages.map((msg) =>
                  msg.id === newMessage.id
                    ? { ...msg, status: "error" }
                    : msg
                ),
              }
            : chat
        )
      );
    }
  };

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: `Email ${chats.length + 1}`,
      messages: [],
    };
    setChats((prev) => [...prev, newChat]);
    setCurrentChatId(newChat.id);
  };

  const renameChat = (id: number, newTitle: string) => {
  setChats((prev) =>
    prev.map((chat) =>
      chat.id === id ? { ...chat, title: newTitle } : chat
    )
  );
};

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  return (
    <div className="flex h-screen">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={createNewChat}
        onSelectChat={setCurrentChatId}
        onRenameChat={renameChat}

      />
      <main className="flex-1 flex flex-col bg-background-page items-center">
        <div className="w-full max-w-3xl flex flex-col  flex-1 overflow-auto p-6 space-y-4">
          {currentChat ? (
            currentChat.messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))
          ) : (
            <div className="text-text text-center m-auto">
              <h1 className="text-xl">
                Inicie um novo chat para enviar o seu email para verifição
              </h1>
            </div>
          )}
        </div>
        {currentChat && (
          <div className="w-full max-w-3xl p-4 border-t border-border bg-background-page sticky bottom-0">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        )}
      </main>
    </div>
  );
};
