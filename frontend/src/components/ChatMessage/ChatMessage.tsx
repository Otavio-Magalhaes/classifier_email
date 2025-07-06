import type { FC } from "react";

type MessageResult = {
  classificacao: string;
  resposta: any;  
};

type ChatMessageProps = {
  message: {
    email: string;
    file?: File | null;
    result?: MessageResult | null;
    status: "loading" | "done" | "error";
  };
};

export const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  const { email, file, result, status } = message;

  const displayText = file ? file.name : email;

  const getClassificacaoClass = (classificacao: string) =>
    classificacao === "Produtivo" ? "text-green-500" : "text-red-500";

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="bg-blue-500 text-end text-white p-3 rounded-lg ">
          <p className="text-sm">
            <strong>Você:</strong> {displayText}
          </p>
        </div>
      </div>

      <div className="flex justify-start">
        <div className="bg-gray-200 text-gray-800 p-3 rounded-lg w-full">
          {status === "loading" && (
            <p className="text-yellow-500 animate-pulse">Aguardando resposta...</p>
          )}
          {status === "done" && result && (
            <>
              <p className={getClassificacaoClass(result.classificacao)}>
                <strong>Classificação:</strong> {result.classificacao}
              </p>
              <p className="mt-2">
                <strong>Resposta Sugerida:</strong>{" "}
                {result.classificacao === "Produtivo"
                  ? result.resposta?.content || result.resposta
                  : result.resposta}
              </p>
            </>
          )}
          {status === "error" && (
            <p className="text-red-500">Erro ao processar o email.</p>
          )}
        </div>
      </div>
    </div>
  );
};
