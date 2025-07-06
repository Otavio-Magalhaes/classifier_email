import { useForm } from "react-hook-form";
import { TiLocationArrowOutline } from "react-icons/ti";
import { AiOutlinePaperClip, } from "react-icons/ai";
import brain from "../../assets/brain.png";
import { useState } from "react";
import { FilePreview } from "../FilePreview/FilePreview";

type FormData = {
  message: string;
  file: File[];
};
type ChatInputProps = {
  onSendMessage: (message: string, file?: File) => void;
};

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const { register, handleSubmit, reset, watch, setValue } = useForm<FormData>();
  const messageValue = watch("message", "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onSubmit = async (data: FormData) => {
    const file = data.file?.[0];
    const message = data.message;

    if (!file && !message) {
      console.error("Selecione um arquivo ou digite o email.");
      return;
    }

    onSendMessage(message, file);  
    reset();
    setSelectedFile(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      console.log(fileArray)
      setSelectedFile(fileArray[0]);
      setValue("file", fileArray);
    }
  };


  const handleRemoveFile = () => {
    setSelectedFile(null);
    setValue("file", null as any);
  };

  return (
    <div className="min-h-screen flex items-center bg-background-page  justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl w-full flex flex-col  bg-background rounded-xl p-4 relative space-y-4"
      >

        {selectedFile && (
          <FilePreview file={selectedFile} onRemove={handleRemoveFile} />
        )}


        <div className="relative w-full">
          {messageValue === "" && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none text-muted space-x-2">
              <img src={brain} alt="Brain" />
              <span>What's e-mail?</span>
            </div>
          )}

          <input
            type="text"
            {...register("message")}
            className="w-full bg-transparent outline-none text-text pl-10  rounded-full py-2 px-4"
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
