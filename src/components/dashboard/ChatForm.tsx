import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface ChatFormProps {
  apiKey: string;
  message: string;
  isLoading: boolean;
  onApiKeyChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ChatForm({
  apiKey,
  message,
  isLoading,
  onApiKeyChange,
  onMessageChange,
  onSubmit
}: ChatFormProps) {
  return (
    <div className="space-y-2">
      <Input
        type="password"
        placeholder="Enter your Perplexity API key"
        value={apiKey}
        onChange={(e) => onApiKeyChange(e.target.value)}
        className="w-full"
      />
      <form onSubmit={onSubmit} className="flex gap-2">
        <Input
          placeholder="Ask a question about the data..."
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}