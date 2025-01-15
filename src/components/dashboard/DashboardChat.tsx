import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ChatForm } from "./ChatForm";
import { ChatResponse } from "./ChatResponse";
import { generateChatContext } from "@/utils/chatContextUtils";
import { Download } from "lucide-react";

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

  const generateBasicStreamlitCode = () => {
    const code = `
import streamlit as st
import pandas as pd

# Create sample data
hiring_data = pd.DataFrame({
    'date': ['2024-01-01', '2024-02-01', '2024-03-01'],
    'segment': ['Sales', 'Engineering', 'Marketing'],
    'planned': [5, 8, 3],
    'actual': [4, 7, 2]
})

attrition_data = pd.DataFrame({
    'date': ['2024-01-01', '2024-02-01', '2024-03-01'],
    'segment': ['Sales', 'Engineering', 'Marketing'],
    'rate': [0.05, 0.08, 0.03]
})

# Dashboard title
st.title('HR Analytics Dashboard')

# Hiring metrics
st.header('Hiring Metrics')
st.line_chart(hiring_data.set_index('date')[['planned', 'actual']])

# Attrition metrics
st.header('Attrition Metrics')
st.line_chart(attrition_data.set_index('date')['rate'])

# Display raw data
st.header('Raw Data')
st.subheader('Hiring Data')
st.dataframe(hiring_data)
st.subheader('Attrition Data')
st.dataframe(attrition_data)
`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hr_dashboard_basic.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const generateAdvancedStreamlitCode = () => {
    const code = `
# Install required packages using Anaconda:
# conda create -n hr_dashboard python=3.9
# conda activate hr_dashboard
# conda install streamlit pandas plotly scikit-learn
# conda install -c conda-forge snowflake-connector-python

import streamlit as st
import pandas as pd
import plotly.express as px
from sklearn.preprocessing import StandardScaler
import snowflake.connector

# Create sample data
hiring_data = pd.DataFrame({
    'date': ['2024-01-01', '2024-02-01', '2024-03-01'],
    'segment': ['Sales', 'Engineering', 'Marketing'],
    'planned': [5, 8, 3],
    'actual': [4, 7, 2]
})

attrition_data = pd.DataFrame({
    'date': ['2024-01-01', '2024-02-01', '2024-03-01'],
    'segment': ['Sales', 'Engineering', 'Marketing'],
    'rate': [0.05, 0.08, 0.03]
})

# Page configuration
st.set_page_config(page_title="HR Analytics Dashboard", layout="wide")

# Custom CSS
st.markdown("""
    <style>
    .main {
        padding: 2rem;
    }
    .stPlotlyChart {
        background-color: white;
        border-radius: 5px;
        padding: 1rem;
    }
    </style>
""", unsafe_allow_html=True)

# Dashboard title
st.title('HR Analytics Dashboard')

# Create two columns
col1, col2 = st.columns(2)

with col1:
    # Hiring metrics with Plotly
    st.header('Hiring Metrics')
    fig_hiring = px.line(hiring_data, x='date', y=['planned', 'actual'],
                        title='Planned vs Actual Hiring',
                        labels={'value': 'Count', 'variable': 'Metric'})
    st.plotly_chart(fig_hiring, use_container_width=True)

with col2:
    # Attrition metrics with Plotly
    st.header('Attrition Metrics')
    fig_attrition = px.line(attrition_data, x='date', y='rate',
                           title='Attrition Rate by Segment',
                           labels={'rate': 'Attrition Rate'})
    st.plotly_chart(fig_attrition, use_container_width=True)

# Advanced analytics section
st.header('Advanced Analytics')

# Normalize the hiring data for comparison
scaler = StandardScaler()
hiring_data[['planned_scaled', 'actual_scaled']] = scaler.fit_transform(hiring_data[['planned', 'actual']])

# Display correlation heatmap
correlation = hiring_data[['planned', 'actual']].corr()
fig_corr = px.imshow(correlation,
                     title='Correlation Heatmap',
                     labels=dict(color="Correlation"))
st.plotly_chart(fig_corr, use_container_width=True)

# Raw data with download buttons
st.header('Raw Data')
col3, col4 = st.columns(2)

with col3:
    st.subheader('Hiring Data')
    st.dataframe(hiring_data)
    
with col4:
    st.subheader('Attrition Data')
    st.dataframe(attrition_data)

# Add download buttons for CSV
if st.button('Download Hiring Data CSV'):
    hiring_data.to_csv('hiring_data.csv', index=False)
    st.success('Hiring data downloaded!')

if st.button('Download Attrition Data CSV'):
    attrition_data.to_csv('attrition_data.csv', index=False)
    st.success('Attrition data downloaded!')
`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hr_dashboard_advanced.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Ask about the dashboard</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateBasicStreamlitCode}>
            <Download className="mr-2 h-4 w-4" />
            Basic Streamlit Code
          </Button>
          <Button variant="outline" onClick={generateAdvancedStreamlitCode}>
            <Download className="mr-2 h-4 w-4" />
            Advanced Streamlit Code
          </Button>
        </div>
      </div>
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