'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';

export default function ChatPage() {
  const [input, setInput] = useState('');
  
  // Destructure useChat properties supported in current AI SDK
  const chatHelpers = (useChat as any)({
    api: '/api/chat',
  });

  const { messages, handleSubmit: originalHandleSubmit, handleInputChange: originalHandleChange, status, error } = chatHelpers;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (originalHandleChange) originalHandleChange(e);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (originalHandleSubmit) {
      originalHandleSubmit(e);
    } else if (chatHelpers.append) {
      chatHelpers.append({ role: 'user', content: input });
    }
    setInput('');
  };

  const isLoading = status === 'streaming' || status === 'submitted';

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 text-white">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
        <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            WeatherPulse AI Assistant
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-normal">
              Streaming Active
            </span>
          </h1>
          <p className="text-xs text-gray-400">Real-time meteorology insights & climate chat</p>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto py-6 space-y-4">
        {messages && messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-4">
            <svg className="w-10 h-10 text-blue-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <p>Ask anything about weather patterns, trip forecasts, or climate data.</p>
          </div>
        ) : (
          messages?.map((m: any) => (
            <div
              key={m.id || Math.random()}
              className={`flex items-start gap-3 ${
                m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`p-2 rounded-lg text-sm ${
                  m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200'
                }`}
              >
                {m.role === 'user' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div
                className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  m.role === 'user'
                    ? 'bg-blue-600/90 text-white'
                    : 'bg-gray-900 border border-gray-800 text-gray-100'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-gray-400 text-xs italic">
            Thinking...
          </div>
        )}

        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-950/30 border border-red-800 rounded-lg">
            Error: {error.message || 'Failed to generate response'}
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative mt-auto">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask WeatherPulse AI..."
          className="w-full bg-slate-900 border border-gray-800 rounded-xl py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 text-white rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  );
}