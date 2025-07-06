import { Sidebar } from "../components/Sidebar/Sidebar";
import { ChatMessage, type Message } from "../components/ChatMessage/ChatMessage";
import { ChatInput } from "../components/ChatInput/ChatInput";
import { useState, useEffect } from "react";
import { processarEmail } from "../services/emailService";
import { LoadChats, SaveChats } from "../helpers/LoadChats";

type ChatSession = {
  id: number;
  title: string;
  messages: Message[];
};

export const ChatPage = () => {
  const [currentChatId, setCurrentChatId] = useState<number | null>(null);
  const [chats, setChats] = useState<ChatSession[]>(LoadChats);

  useEffect(() => {
    SaveChats(chats);
}, [chats]);

  const handleSendMessage = async (message: string, file?: File) => {
    if (currentChatId === null) return;

    const newMessage: Message = {
      id: Date.now(),
      email: message,
      file,
      result: null,
      status: "loading",
    };

    setChats((prev: ChatSession[]) =>
  prev.map((chat: ChatSession) =>
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
  const deleteChat = (id: number) => {
  setChats((prev) => {
    const filtered = prev.filter((chat) => chat.id !== id);
    if (id === currentChatId) {
      if (filtered.length > 0) {
        setCurrentChatId(filtered[0].id);
      } else {
        setCurrentChatId(null);
      }
    }

    return filtered;
  });
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
        onDeleteChat={deleteChat}
      />
      <main className="flex-1 flex flex-col bg-background-page items-center">
        <div className="w-full max-w-3xl flex flex-col  flex-1 overflow-auto p-6 space-y-4">
          {currentChat ? (
            currentChat.messages.map((msg) => (
              <ChatMessage key={msg.id} {...msg} />
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
