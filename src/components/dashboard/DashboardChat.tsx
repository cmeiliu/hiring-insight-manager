import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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

  const generateContext = () => {
    return `Here is the current dashboard data:
    - Hiring Data: ${JSON.stringify(data.hiringData)}
    - Attrition Data: ${JSON.stringify(data.attritionData)}
    - LOA Data: ${JSON.stringify(data.loaData)}
    - Candidate Pool Data: ${JSON.stringify(data.candidatePoolData)}
    - Interview Data: ${JSON.stringify(data.interviewData)}
    - Candidate Profile Data: ${JSON.stringify(data.candidateProfileData)}
    
    Based on this data, please answer the following question: ${message}`;
  };

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
              content: generateContext()
            }
          ],
          temperature: 0.2,
          max_tokens: 1000,
        }),
      });

      const data = await response.json();
      setResponse(data.choices[0].message.content);
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
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Enter your Perplexity API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full"
        />
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Ask a question about the data..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
      {response && (
        <div className="bg-muted p-4 rounded-lg">
          <p className="text-sm">{response}</p>
        </div>
      )}
    </Card>
  );
}