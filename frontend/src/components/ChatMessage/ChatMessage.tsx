import type { FC } from "react";

type MessageResult = {
  classificacao: string;
  resposta: any;  
};

export type Message = {
    id: number; 
    email: string;
    file?: File | null;
    result?: MessageResult | null;
    status: "loading" | "done" | "error";
};

export const ChatMessage: FC<Message> = ({ email, file, result, status }) => {
  const displayText = file ? file.name : email;

  const isProductive = (classificacao: string) =>
    classificacao === "Produtivo" || classificacao === "Productive";

  const getClassificacaoClass = (classificacao: string) =>
    isProductive(classificacao) ? "text-green-500" : "text-red-500";

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="bg-blue-500 text-end text-white max-w-sm p-3 rounded-lg">
          <p className="text-sm whitespace-pre-wrap">
            {displayText}
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
              <div className={getClassificacaoClass(result.classificacao)}>
                <strong>Classificação:</strong> {result.classificacao}
              </div>
              <div className="mt-2 whitespace-pre-wrap">
                <strong>Resposta Sugerida:</strong>{" "}
                {isProductive(result.classificacao)
                  ? result.resposta?.content || result.resposta
                  : result.resposta}
              </div>
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
