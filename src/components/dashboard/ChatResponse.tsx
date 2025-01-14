import React from "react";

interface ChatResponseProps {
  response: string;
}

export function ChatResponse({ response }: ChatResponseProps) {
  return (
    <div className="bg-muted p-4 rounded-lg overflow-auto max-h-[500px]">
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <div
          dangerouslySetInnerHTML={{
            __html: response
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\n\n/g, '</p><p>')
              .replace(/\n/g, '<br/>')
              .replace(/^/, '<p>')
              .replace(/$/, '</p>')
          }}
        />
      </div>
    </div>
  );
}