const STORAGE_KEY = "email-chats";

export const LoadChats = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const SaveChats = (chats: any[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
};
