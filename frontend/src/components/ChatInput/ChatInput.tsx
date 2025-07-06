import { useForm } from "react-hook-form";
import { TiLocationArrowOutline } from "react-icons/ti";
import { AiOutlinePaperClip } from "react-icons/ai";
import brain from "../../assets/brain.png";
import { useState, useRef, useEffect } from "react";
import { FilePreview } from "../FilePreview/FilePreview";

type FormData = {
  message: string;
  file: File[];
};
type ChatInputProps = {
  onSendMessage: (message: string, file?: File) => void;
};

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const { register, handleSubmit, reset, watch, setValue, setFocus } = useForm<FormData>();
  const messageValue = watch("message", "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; 
      const newHeight = Math.min(textareaRef.current.scrollHeight, 150);
      textareaRef.current.style.height = newHeight + "px";
    }
  }, [messageValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); 
      handleSubmit(onSubmit)();
    }
  };



  const onSubmit = async (data: FormData) => {
    const file = data.file?.[0];
    const message = data.message.trim();

    if (!file && !message) {
      console.error("Selecione um arquivo ou digite o email.");
      return;
    }

    onSendMessage(message, file);
    reset();
    setSelectedFile(null);
    setTimeout(() => setFocus("message"), 0);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setSelectedFile(fileArray[0]);
      setValue("file", fileArray);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setValue("file", null as any);
  };

  return (
    <div className="flex items-center bg-background-page justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl w-full flex flex-col bg-background rounded-xl p-4 relative space-y-4"
      >
        {selectedFile && (
          <FilePreview file={selectedFile} onRemove={handleRemoveFile} />
        )}

        <div className="relative w-full">
          {messageValue === "" && (
            <div className="absolute left-3 top-3 flex items-center pointer-events-none text-muted space-x-2">
              <img src={brain} alt="Brain" />
              <span>What's e-mail?</span>
            </div>
          )}

          <textarea
            {...register("message")}
            ref={(e) => {
              register("message").ref(e);
              textareaRef.current = e;
            }}
            rows={1}
            onKeyDown={handleKeyDown}
            className="w-full resize-none overflow-auto max-h-[150px] bg-transparent outline-none text-text pl-10 rounded-xl py-2 px-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-background-page"
            placeholder=""
          />
        </div>

        <div className="flex items-center ml-4">
          <label className="cursor-pointer">
            <AiOutlinePaperClip className="text-primary w-6 h-6" />
            <input
              type="file"
              {...register("file")}
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-full ml-auto cursor-pointer"
          >
            <TiLocationArrowOutline />
          </button>
        </div>
      </form>
    </div>
  );
};
