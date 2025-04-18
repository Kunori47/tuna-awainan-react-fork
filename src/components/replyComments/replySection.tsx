import React, { useState } from "react";

interface Answer {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    username: string;
  };
}

interface AnswerSectionProps {
  answers: Answer[];
  showAnswers: boolean;
  onToggle: () => void;
  onReply: () => void;
}

export const AnswerSection: React.FC<AnswerSectionProps> = ({
  answers,
  showAnswers,
  onToggle,
  onReply,
}) => {
  return (
    <div className="">
      {/* botones de accion */}
      <div className="flex gap-4 ml-4">
        <button
            //onClick={() => setShowReplyBox(!showReplyBox)}
            onClick={onReply}
            className="text-xs text-gray-500 hover:text-[#087b9b] transition-colors"
            >
              Responder
          </button> 

        <button
          onClick={onToggle}
          className="text-xs text-gray-500 hover:text-[#087b9b] transition-colors flex items-center gap-1">
            {showAnswers ? "Ocultar respuestas" : "Ver respuestas"} 
          <span className="text-xs text-gray-500 hover:text-[#087b9b] transition-colors">({answers.length})</span>
        </button> 
      </div> 
      
      {/* render las respuestas */}
      <div className="ml-8 border-l">
        {showAnswers && (
          <div className="ml-6 mt-4 space-y-4">
            {answers.map((answer) => (
              <div key={answer.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {answer.profiles.username[0].toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {answer.profiles.username}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(answer.created_at).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                </div>
                <p className="text-gray-800 text-sm">{answer.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};