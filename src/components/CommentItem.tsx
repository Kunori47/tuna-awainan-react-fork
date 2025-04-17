import React, { useState } from "react";
import { ReplyBox } from "@/components/replyComments/replyBox";

interface Props {
	username: string;
	created_at: string;
	text: string;
	commentId: string;
	onReply: (content: string, parentId: string) => void;	
}

const CommentItem: React.FC<Props> = ({ username, created_at, text, commentId,onReply }) => {
		
	const [showReplyBox, setShowReplyBox] = useState(false);

	const handleReplySubmit = (content: string) => {
	onReply(content, commentId);
	setShowReplyBox(false);
	};

	return (
		<article className="text-base rounded-lg bg-gray-100 p-4 mb-4">
			<footer className="flex items-center mb-2">
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
								: "Unknown Date"}
						</p>
					</div>
				</div>
			</footer>

			<p className="text-gray-800 mt-2 dark:text-gray-400 ml-5">{text}</p>

			<div className="my-4 border-b border-gray-200 dark:border-gray-700" />

			<div className="ml-3 flex items-center gap-4">
				<button
					onClick={() => setShowReplyBox(!showReplyBox)}
					className="text-xs text-gray-500 hover:text-[#087b9b] transition-colors"
					>
					Responder
				</button>
				<a href="" className="text-xs text-gray-500 hover:text-[#087b9b]">
					Ver respuestas
				</a>
			</div>

			{showReplyBox && (
				<ReplyBox
				parentId={commentId}
				onSubmit={handleReplySubmit}
				onCancel={() => setShowReplyBox(false)}
				/>
			)}

		</article>
	);
};

export default CommentItem;
