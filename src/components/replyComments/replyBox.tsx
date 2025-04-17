import React from "react";
import { Button } from "@/components/ui/button";


interface ReplyBoxProps {
  parentId: string;
  onSubmit: (content: string) => void;
  onCancel: () => void;
}

export const ReplyBox: React.FC<ReplyBoxProps> = ({ onSubmit, onCancel }) => {
  const [content, setContent] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <form className="ml-8 mt-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="w-full p-2 text-sm border rounded-lg focus:border-none bg-white"
          placeholder="Escribe tu respuesta..."
        />
        <div className="flex gap-2 justify-end ">
          <Button
            type="button"
            onClick={onCancel}
            variant="ghost"
            className="text-gray-500 hover:text-gray-700 text-xs"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="bg-[#0cc0df] hover:bg-[#087b9b] text-white text-xs" 
          >
            Publicar respuesta
          </Button>
        </div>
      </div>
    </form>
  );
};