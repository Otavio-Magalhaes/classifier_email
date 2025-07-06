import type { FC } from "react";
import { useState } from "react";
import logo from "../../assets/logo.png"
type SidebarProps = {
  chats: { id: number; title: string }[];
  currentChatId: number | null;
  onNewChat: () => void;
  onSelectChat: (id: number) => void;
  onRenameChat: (id: number, newTitle: string) => void;
};

export const Sidebar: FC<SidebarProps> = ({
  chats,
  currentChatId,
  onNewChat,
  onSelectChat,
  onRenameChat,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (id: number, currentTitle: string) => {
    setEditingId(id);
    setEditValue(currentTitle);
  };

  const handleRename = (id: number) => {
    if (editValue.trim()) {
      onRenameChat(id, editValue.trim());
    }
    setEditingId(null);
  };

  return (
    <aside className="bg-background w-64 p-5 border-r border-border rounded-3xl flex flex-col h-screen">
      {/* Cabeçalho e botão fixos */}
      <div className="flex-shrink-0">
        <div className="flex items-center space-x-2 mb-4">
          <img src={logo} className="w-10 h-10 rounded-full" />
          <span>E-mail Classifier</span>
        </div>

        <button
          onClick={onNewChat}
          className="w-full bg-primary text-white py-2 rounded mb-4 cursor-pointer"
        >
          + Novo chat
        </button>
      </div>

      {/* Lista de chats com rolagem */}
      <div className="flex-1 overflow-y-auto space-y-2">
        {chats.map((item) => (
          <div
            key={item.id}
            className={`group rounded p-2 ${currentChatId === item.id ? "bg-primary/20" : "hover:bg-primary/10"
              }`}
            onDoubleClick={() => handleEdit(item.id, item.title)}
            onContextMenu={(e) => {
              e.preventDefault();
              handleEdit(item.id, item.title);
            }}
          >
            {editingId === item.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRename(item.id);
                }}
              >
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleRename(item.id)}
                  autoFocus
                  className="w-full bg-background border border-border rounded p-1 text-text"
                />
              </form>
            ) : (
              <button
                onClick={() => onSelectChat(item.id)}
                className="text-left text-text w-full"
              >
                {item.title}
              </button>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};
