"use client";

import React, { useRef, useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Send, Square, ArrowDown, Bot, User, Sparkles } from "lucide-react";

export default function ChatPage() {
  const [inputVal, setInputVal] = useState("");

  const chat = useChat({
    api: "/api/chat",
  } as any);

  const messages = (chat as any).messages || [];
  const isLoading = (chat as any).isLoading || (chat as any).status === "streaming";
  const stop = (chat as any).stop || (() => {});

  const scrollRef = useRef<HTMLDivElement>(null);
  const [userHasScrolledUp, setUserHasScrolledUp] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 80;
    setUserHasScrolledUp(!isAtBottom);
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
      setUserHasScrolledUp(false);
    }
  };

  useEffect(() => {
    if (!userHasScrolledUp) {
      scrollToBottom();
    }
  }, [messages, isLoading, userHasScrolledUp]);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentInput = (chat as any).input !== undefined ? (chat as any).input : inputVal;
    if (!currentInput?.trim()) return;

    if ((chat as any).handleSubmit) {
      (chat as any).handleSubmit(e);
    } else if ((chat as any).append) {
      (chat as any).append({ role: "user", content: inputVal });
      setInputVal("");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#38bdf8]/10 rounded-lg text-[#38bdf8]">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              WeatherPulse AI Assistant
              <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
                Streaming Active
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Real-time meteorology insights & climate chat
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto space-y-4 pr-2 relative scrollbar-thin"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-3 text-slate-500">
            <Sparkles className="w-10 h-10 text-[#38bdf8] animate-pulse" />
            <p className="text-sm font-medium text-slate-300">
              Ask anything about weather patterns, trip forecasts, or climate data.
            </p>
            <div className="flex flex-wrap gap-2 justify-center pt-2">
              {[
                "What's the best time to visit Tokyo?",
                "Explain atmospheric pressure simply",
                "Will it rain in London this week?",
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if ((chat as any).setInput) {
                      (chat as any).setInput(suggestion);
                    } else {
                      setInputVal(suggestion);
                    }
                  }}
                  className="text-xs px-3 py-1.5 bg-[#1e293b] text-slate-300 rounded-full border border-slate-700 hover:border-[#38bdf8] transition"
                >
                  "{suggestion}"
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m: any, idx: number) => (
          <div
            key={m.id || idx}
            className={`flex gap-3 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {m.role !== "user" && (
              <div className="w-8 h-8 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] flex items-center justify-center shrink-0 border border-[#38bdf8]/30">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-[#38bdf8] text-slate-950 font-medium rounded-tr-none"
                  : "bg-[#1e293b] text-slate-100 border border-slate-700/60 rounded-tl-none whitespace-pre-wrap"
              }`}
            >
              {m.content}
            </div>

            {m.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-200 flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {/* Thinking Indicator */}
        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-8 h-8 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] flex items-center justify-center shrink-0 border border-[#38bdf8]/30 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[#1e293b] text-slate-400 border border-slate-700 px-4 py-2.5 rounded-2xl rounded-tl-none text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
              WeatherPulse AI is thinking...
            </div>
          </div>
        )}
      </div>

      {/* Jump to bottom button */}
      {userHasScrolledUp && (
        <div className="flex justify-center -mt-10 mb-2 z-10">
          <button
            type="button"
            onClick={scrollToBottom}
            className="flex items-center gap-1.5 text-xs bg-[#38bdf8] text-slate-950 font-semibold px-3 py-1.5 rounded-full shadow-lg hover:bg-sky-400 transition"
          >
            <ArrowDown className="w-3.5 h-3.5" /> Jump to latest
          </button>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={onFormSubmit}
        className="pt-3 border-t border-slate-800 flex items-center gap-2"
      >
        <input
          value={(chat as any).input !== undefined ? (chat as any).input : inputVal}
          onChange={(e) => {
            if ((chat as any).handleInputChange) {
              (chat as any).handleInputChange(e);
            } else {
              setInputVal(e.target.value);
            }
          }}
          placeholder="Ask WeatherPulse AI..."
          className="flex-1 bg-[#1e293b] border border-slate-700/80 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#38bdf8] transition"
        />

        {isLoading ? (
          <button
            type="button"
            onClick={() => stop && stop()}
            className="p-3 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl hover:bg-rose-500/30 transition flex items-center gap-1 text-xs font-semibold"
            title="Stop generating"
          >
            <Square className="w-4 h-4 fill-current" /> Stop
          </button>
        ) : (
          <button
            type="submit"
            className="p-3 bg-[#38bdf8] text-slate-950 rounded-xl hover:bg-sky-400 transition font-bold"
          >
            <Send className="w-4 h-4" />
          </button>
        )}
      </form>
    </div>
  );
}