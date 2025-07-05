import { AiOutlineClose } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";

type FilePreviewProps = {
  file: File;
  onRemove: () => void;
};

export const FilePreview = ({ file, onRemove }: FilePreviewProps) => (
  <div className="flex items-start max-w-70 bg-secondary p-3 rounded-lg border border-border text-sm text-text space-x-3 ">
    <div className="flex-shrink-0">
      <div className="bg-primary/10 text-primary p-2 rounded-md">
        <IoDocumentTextOutline className="w-5 h-5" />
      </div>
    </div>
    <div className="flex-1 max-w-40"> 
      <span className="block font-medium truncate">{file.name}</span>
      <span className="text-xs text-muted">Documento</span>
    </div>
    <button
      type="button"
      onClick={onRemove}
      className="ml-2 text-muted hover:text-primary cursor-pointer"
    >
      <AiOutlineClose />
    </button>
  </div>
);
