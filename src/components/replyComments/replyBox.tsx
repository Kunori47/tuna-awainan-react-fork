import React from "react";
import { Button } from "@/components/ui/button";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReplyComment } from "@/services/comments";


interface ReplyBoxProps {
  onSubmit: (content: string) => void;
  onCancel: () => void;
  commentId: number;
	userid: number;
}

export const ReplyBox: React.FC<ReplyBoxProps> = ({ onSubmit, onCancel, commentId, userid }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (content: string) => {
      await ReplyComment(commentId, content, userid);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["answers", commentId] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get("content");
    if (typeof content === "string") {
      mutation.mutate(content);
      e.currentTarget.reset();
    }
  };

  return (
    <form className="ml-3 mt-6" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <textarea
          name="content"
          id="content"
          rows={3}
          className="w-full p-2 text-sm border rounded-lg focus:border-none bg-white"
          placeholder="Escribe tu respuesta..."
          required
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
            className="bg-[#047A8F] hover:bg-[#047A8F] text-white text-xs" 
          >
            Publicar respuesta
          </Button>
        </div>
      </div>
    </form>
  );
};