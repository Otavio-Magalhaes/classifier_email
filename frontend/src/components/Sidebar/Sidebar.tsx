import type { FC } from "react";

export const Sidebar: FC = () => {
  const title = "Autou E-mail   Classifier"
  return (
    <aside className="bg-background mt-5 mb-5 rounded-xl w-64 min-h-100% p-4 border-r border-border">
      <h2 className="text-lg font-semibold text-center text-text">{title}</h2>
      <button className="w-full bg-primary text-white py-2 rounded mb-4">
        + New chat
      </button>
      <div className="flex flex-col space-y-2">
        {/* lembrar que preciso criar a interacao, se vou fazer com persistencia no Banco ou em localstorage */}
        {["Email.1", "Email.2", "Email.1"].map((item) => (
          <button key={item} className="text-left text-text hover:bg-primary/10 rounded p-2 cursor-pointer">
            {item}
          </button>
        ))}
      </div>
    </aside>
  );
};
