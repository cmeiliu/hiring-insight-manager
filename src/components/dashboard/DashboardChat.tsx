import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ChatForm } from "./ChatForm";
import { ChatResponse } from "./ChatResponse";
import { generateChatContext } from "@/utils/chatContextUtils";

interface DashboardChatProps {
  data: {
    hiringData: any[];
    attritionData: any[];
    loaData: any[];
    candidatePoolData: any[];
    interviewData: any[];
    candidateProfileData: any[];
  };
}

export function DashboardChat({ data }: DashboardChatProps) {
  const [message, setMessage] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Perplexity API key to use the chat feature.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful HR analytics assistant. Analyze the data and provide clear, concise answers.'
            },
            {
              role: 'user',
              content: generateChatContext(data, message)
            }
          ],
          temperature: 0.2,
          max_tokens: 1000,
        }),
      });

      const responseData = await response.json();
      setResponse(responseData.choices[0].message.content);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get a response. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Ask about the dashboard</h2>
      <ChatForm
        apiKey={apiKey}
        message={message}
        isLoading={isLoading}
        onApiKeyChange={setApiKey}
        onMessageChange={setMessage}
        onSubmit={handleSubmit}
      />
      {response && <ChatResponse response={response} />}
    </Card>
  );
}