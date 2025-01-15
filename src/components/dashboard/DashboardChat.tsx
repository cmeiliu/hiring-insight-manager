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
import datetime

# Create sample data
hiring_data = pd.DataFrame({
    'date': pd.date_range(start='2024-01-01', periods=12, freq='M'),
    'segment': ['Sales', 'Engineering', 'Marketing', 'Sales', 'Engineering', 'Marketing', 'Sales', 'Engineering', 'Marketing', 'Sales', 'Engineering', 'Marketing'],
    'planned': [5, 8, 3, 6, 9, 4, 7, 10, 5, 8, 11, 6],
    'actual': [4, 7, 2, 5, 8, 3, 6, 9, 4, 7, 10, 5]
})

attrition_data = pd.DataFrame({
    'date': pd.date_range(start='2024-01-01', periods=12, freq='M'),
    'segment': ['Sales', 'Engineering', 'Marketing', 'Sales', 'Engineering', 'Marketing', 'Sales', 'Engineering', 'Marketing', 'Sales', 'Engineering', 'Marketing'],
    'rate': [0.05, 0.08, 0.03, 0.06, 0.09, 0.04, 0.07, 0.10, 0.05, 0.08, 0.11, 0.06]
})

candidate_pool = pd.DataFrame({
    'segment': ['Sales', 'Engineering', 'Marketing'],
    'role': ['Senior', 'Lead', 'Manager'],
    'pool_size': [50, 30, 20]
})

interview_data = pd.DataFrame({
    'segment': ['Sales', 'Engineering', 'Marketing', 'Sales', 'Engineering'],
    'status': ['Completed', 'Scheduled', 'Completed', 'Scheduled', 'Completed'],
    'count': [25, 15, 20, 30, 18]
})

# Dashboard configuration
st.set_page_config(page_title="HR Analytics Dashboard", layout="wide")

# Title and description
st.title('HR Analytics Dashboard')
st.write('A comprehensive view of hiring metrics, attrition, and candidate pipeline')

# Create three columns for key metrics
col1, col2, col3 = st.columns(3)

with col1:
    total_hired = hiring_data['actual'].sum()
    st.metric("Total Hires YTD", total_hired)

with col2:
    avg_attrition = attrition_data['rate'].mean() * 100
    st.metric("Average Attrition Rate", f"{avg_attrition:.1f}%")

with col3:
    total_candidates = candidate_pool['pool_size'].sum()
    st.metric("Total Candidates", total_candidates)

# Hiring metrics
st.header('Hiring Metrics')
st.line_chart(hiring_data.set_index('date')[['planned', 'actual']])

# Attrition metrics
st.header('Attrition Metrics')
st.line_chart(attrition_data.set_index('date')['rate'])

# Candidate Pool Analysis
st.header('Candidate Pool by Segment')
st.bar_chart(candidate_pool.set_index('segment')['pool_size'])

# Interview Pipeline
st.header('Interview Pipeline')
interview_pivot = pd.pivot_table(
    interview_data,
    values='count',
    index='segment',
    columns='status',
    aggfunc='sum'
).fillna(0)
st.bar_chart(interview_pivot)

# Raw Data Tables
st.header('Raw Data')
tab1, tab2, tab3, tab4 = st.tabs(['Hiring', 'Attrition', 'Candidate Pool', 'Interviews'])

with tab1:
    st.dataframe(hiring_data)
with tab2:
    st.dataframe(attrition_data)
with tab3:
    st.dataframe(candidate_pool)
with tab4:
    st.dataframe(interview_data)

# Add download functionality
if st.button('Download All Data'):
    def convert_df_to_csv(df):
        return df.to_csv().encode('utf-8')
    
    st.download_button(
        label="Download Hiring Data",
        data=convert_df_to_csv(hiring_data),
        file_name='hiring_data.csv',
        mime='text/csv',
    )
`;
  };

  const generateAdvancedStreamlitCode = () => {
    const code = `
# Install required packages using Anaconda:
# conda create -n hr_dashboard python=3.9
# conda activate hr_dashboard
# conda install streamlit pandas plotly scikit-learn
# conda install -c conda-forge snowflake-connector-python
# conda install -c conda-forge prophet

import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
from sklearn.preprocessing import StandardScaler
from prophet import Prophet
import snowflake.connector
from datetime import datetime, timedelta

# Create sample data with more features
hiring_data = pd.DataFrame({
    'date': pd.date_range(start='2024-01-01', periods=12, freq='M'),
    'segment': ['Sales', 'Engineering', 'Marketing', 'Sales', 'Engineering', 'Marketing', 'Sales', 'Engineering', 'Marketing', 'Sales', 'Engineering', 'Marketing'],
    'planned': [5, 8, 3, 6, 9, 4, 7, 10, 5, 8, 11, 6],
    'actual': [4, 7, 2, 5, 8, 3, 6, 9, 4, 7, 10, 5],
    'time_to_fill': [45, 60, 30, 50, 65, 35, 48, 62, 33, 52, 68, 38],
    'cost_per_hire': [5000, 8000, 4000, 5500, 8500, 4500, 5200, 8200, 4200, 5800, 8800, 4800]
})

attrition_data = pd.DataFrame({
    'date': pd.date_range(start='2024-01-01', periods=12, freq='M'),
    'segment': ['Sales', 'Engineering', 'Marketing', 'Sales', 'Engineering', 'Marketing', 'Sales', 'Engineering', 'Marketing', 'Sales', 'Engineering', 'Marketing'],
    'rate': [0.05, 0.08, 0.03, 0.06, 0.09, 0.04, 0.07, 0.10, 0.05, 0.08, 0.11, 0.06],
    'voluntary': [3, 5, 2, 4, 6, 3, 5, 7, 4, 6, 8, 5],
    'involuntary': [1, 2, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1]
})

# Page configuration
st.set_page_config(page_title="Advanced HR Analytics Dashboard", layout="wide")

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
    .metric-card {
        background-color: #f8f9fa;
        padding: 1rem;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    </style>
""", unsafe_allow_html=True)

# Dashboard title
st.title('Advanced HR Analytics Dashboard')
st.markdown('### Powered by Machine Learning and Advanced Analytics')

# Filters
col1, col2 = st.columns(2)
with col1:
    selected_segment = st.multiselect('Select Segments', hiring_data['segment'].unique(), default=hiring_data['segment'].unique())
with col2:
    date_range = st.date_input('Select Date Range', 
                              [hiring_data['date'].min(), hiring_data['date'].max()],
                              min_value=hiring_data['date'].min(),
                              max_value=hiring_data['date'].max())

# Filter data based on selection
mask = (hiring_data['segment'].isin(selected_segment)) & \\
       (hiring_data['date'] >= pd.Timestamp(date_range[0])) & \\
       (hiring_data['date'] <= pd.Timestamp(date_range[1]))
filtered_hiring = hiring_data[mask]

# Key Metrics with Trends
col1, col2, col3, col4 = st.columns(4)
with col1:
    total_hires = filtered_hiring['actual'].sum()
    prev_hires = filtered_hiring['actual'].iloc[:-1].sum() if len(filtered_hiring) > 1 else 0
    hire_trend = ((total_hires - prev_hires) / prev_hires * 100) if prev_hires > 0 else 0
    st.metric("Total Hires", total_hires, f"{hire_trend:.1f}%")

with col2:
    avg_time = filtered_hiring['time_to_fill'].mean()
    st.metric("Avg Time to Fill", f"{avg_time:.0f} days")

with col3:
    avg_cost = filtered_hiring['cost_per_hire'].mean()
    st.metric("Avg Cost per Hire", f"${avg_cost:,.0f}")

with col4:
    efficiency = (filtered_hiring['actual'] / filtered_hiring['planned']).mean() * 100
    st.metric("Hiring Efficiency", f"{efficiency:.1f}%")

# Advanced Visualizations
st.header('Hiring Performance Analysis')

# Create subplot with shared x-axis
fig = make_subplots(rows=2, cols=1, shared_xaxes=True, vertical_spacing=0.1,
                    subplot_titles=('Hiring Trends', 'Time to Fill vs Cost per Hire'))

# Add hiring trends
fig.add_trace(
    go.Scatter(x=filtered_hiring['date'], y=filtered_hiring['planned'],
               name='Planned', line=dict(color='#2563eb')),
    row=1, col=1
)
fig.add_trace(
    go.Scatter(x=filtered_hiring['date'], y=filtered_hiring['actual'],
               name='Actual', line=dict(color='#16a34a')),
    row=1, col=1
)

# Add time to fill vs cost scatter plot
fig.add_trace(
    go.Scatter(x=filtered_hiring['time_to_fill'], y=filtered_hiring['cost_per_hire'],
               mode='markers', name='Cost vs Time',
               marker=dict(size=10, color=filtered_hiring['actual'],
                          colorscale='Viridis', showscale=True)),
    row=2, col=1
)

fig.update_layout(height=800, showlegend=True)
st.plotly_chart(fig, use_container_width=True)

# Attrition Analysis
st.header('Attrition Analysis')

# Calculate attrition metrics
attrition_metrics = pd.DataFrame({
    'date': attrition_data['date'],
    'Total Rate': attrition_data['rate'],
    'Voluntary Rate': attrition_data['voluntary'] / (attrition_data['voluntary'] + attrition_data['involuntary']),
    'Involuntary Rate': attrition_data['involuntary'] / (attrition_data['voluntary'] + attrition_data['involuntary'])
})

# Create attrition visualization
fig_attrition = px.area(attrition_metrics, x='date', 
                        y=['Total Rate', 'Voluntary Rate', 'Involuntary Rate'],
                        title='Attrition Trends Analysis')
st.plotly_chart(fig_attrition, use_container_width=True)

# Predictive Analytics
st.header('Hiring Forecast (Next 6 Months)')

# Prepare data for Prophet
prophet_data = hiring_data[['date', 'actual']].rename(columns={'date': 'ds', 'actual': 'y'})
model = Prophet(yearly_seasonality=True, weekly_seasonality=False, daily_seasonality=False)
model.fit(prophet_data)

# Make future predictions
future_dates = model.make_future_dataframe(periods=6, freq='M')
forecast = model.predict(future_dates)

# Plot forecast
fig_forecast = go.Figure()
fig_forecast.add_trace(go.Scatter(x=prophet_data['ds'], y=prophet_data['y'],
                                 name='Historical', line=dict(color='#2563eb')))
fig_forecast.add_trace(go.Scatter(x=forecast['ds'], y=forecast['yhat'],
                                 name='Forecast', line=dict(color='#16a34a')))
fig_forecast.add_trace(go.Scatter(x=forecast['ds'], y=forecast['yhat_upper'],
                                 fill=None, mode='lines', line_color='rgba(0,100,80,0.2)',
                                 name='Upper Bound'))
fig_forecast.add_trace(go.Scatter(x=forecast['ds'], y=forecast['yhat_lower'],
                                 fill='tonexty', mode='lines', line_color='rgba(0,100,80,0.2)',
                                 name='Lower Bound'))
fig_forecast.update_layout(title='Hiring Forecast with Confidence Intervals')
st.plotly_chart(fig_forecast, use_container_width=True)

# Data Tables with Download Options
st.header('Raw Data Analysis')
tabs = st.tabs(['Hiring Data', 'Attrition Data', 'Forecast Data'])

with tabs[0]:
    st.dataframe(hiring_data)
    csv = hiring_data.to_csv(index=False).encode('utf-8')
    st.download_button("Download Hiring Data", csv, "hiring_data.csv", "text/csv")

with tabs[1]:
    st.dataframe(attrition_data)
    csv = attrition_data.to_csv(index=False).encode('utf-8')
    st.download_button("Download Attrition Data", csv, "attrition_data.csv", "text/csv")

with tabs[2]:
    st.dataframe(forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']])
    csv = forecast.to_csv(index=False).encode('utf-8')
    st.download_button("Download Forecast Data", csv, "forecast_data.csv", "text/csv")

# Add Snowflake connection template (commented out)
"""
# Snowflake connection template
def init_snowflake_connection():
    return snowflake.connector.connect(
        user='your_username',
        password='your_password',
        account='your_account',
        warehouse='your_warehouse',
        database='your_database',
        schema='your_schema'
    )

# Example query template
def get_hiring_data():
    conn = init_snowflake_connection()
    cur = conn.cursor()
    try:
        cur.execute('''
            SELECT date, segment, planned, actual, time_to_fill, cost_per_hire
            FROM hiring_metrics
            ORDER BY date DESC
        ''')
        return cur.fetch_pandas_all()
    finally:
        cur.close()
        conn.close()
"""`;
    
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
