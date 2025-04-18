import React, { useState } from "react";
import { ReplyBox } from "@/components/replyComments/replyBox";
import { AnswerSection } from "@/components/replyComments/replySection";

interface Props {
	username: string;
	created_at: string;
	text: string;
	commentId: number;
	userid: number;
	
}

const CommentItem: React.FC<Props> = ({ username, created_at, text, commentId, userid}) => {
		
	const [showReplyBox, setShowReplyBox] = useState(false);
	const [showAnswers, setShowAnswers] = useState(false);

  // Datos estaticos de ejemplo
  const staticAnswers = [
    {
      id: "static-answer-1",
      content: "Esta es una respuesta estática de ejemplo.",
      created_at: new Date().toISOString(),
      profiles: {
        username: "UsuarioEjemplo",
      },
    },
    {
      id: "static-answer-2",
      content: "Otra respuesta de ejemplo.",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      profiles: {
        username: "OtroUsuario",
      },
    },
  ];

  const handleReplySubmit = (content: string) => {
   	setShowReplyBox(false);
  };

  return (
    <article className="text-base rounded-lg p-4 ">	
		<div className="rounded-lg bg-gray-50 mb-4">
			<div className="flex items-center mb-2">
				<div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full ml-4 mt-4">
					<span className="font-semibold text-gray-600">
						{username[0].toUpperCase()}
					</span>
				</div>

				<div className="ml-3 mt-4">
					<h3 className="text-sm font-medium text-gray-900 dark:text-white">
						{username}
					</h3>
					
					<div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
						<p className="font-light text-gray-600">
						{created_at
							? new Date(created_at).toLocaleDateString("es-ES", {
								day: "2-digit",
								month: "2-digit",
								year: "numeric",
							})
							: "Fecha desconocida"}
						</p>
					</div>
				</div>
			</div>
			<p className="text-gray-800 mt-2 dark:text-gray-400 ml-6 pb-3">{text}</p>
		</div>

		{/* render las respuestas y los botones de acccion */}
		{staticAnswers.length > 0 && (
			<AnswerSection
				answers={staticAnswers}
				showAnswers={showAnswers}
				onToggle={() => setShowAnswers(!showAnswers)}
				onReply={() => setShowReplyBox(!showReplyBox)} 
			/>
		)}

		{/*render del form para respuestas  */}
		{showReplyBox && (
			<ReplyBox
			onSubmit={handleReplySubmit}
			onCancel={() => setShowReplyBox(false)}
			/>
		)}

		{/* <div className="mt-4 border-b border-gray-200 dark:border-gray-700" /> */}
    </article>
  );
};

export default CommentItem;