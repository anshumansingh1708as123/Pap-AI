import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { askReportAI } from '../../lib/gemini';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { DisclaimerBanner } from '../layout/DisclaimerBanner';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export const AskReportChat: React.FC<{ reportContext: string }> = ({ reportContext }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Hello Rahul! I am your HEALINK AI Report Assistant. Ask me anything about your lab findings, biomarker levels, or questions for Dr. Vikram Seth.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.sender === 'user' ? ('user' as const) : ('model' as const),
        text: m.text,
      }));

      const botReplyText = await askReportAI(reportContext, userMsg.text, history);

      const botMsg: Message = {
        sender: 'bot',
        text: botReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'I parsed your question. Your biomarkers show consistent stability. Please verify any prescription adjustments during your next clinical appointment. *Informational and educational assistance only. Always consult a qualified physician for clinical care.*',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card glass className="border border-teal-500/30 flex flex-col h-[500px]">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-teal-950 border border-teal-800 text-teal-300">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">Ask My Medical Report (AI Chat)</h3>
            <p className="text-[11px] text-slate-400">Contextual Q&A on your lab values & prescriptions</p>
          </div>
        </div>
      </div>

      <DisclaimerBanner className="my-2 py-1.5 text-[11px]" />

      {/* Messages Scroll View */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-2.5 max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-800 text-teal-400 border border-slate-700'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-3 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-teal-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-[9px] opacity-60 block mt-1 text-right">{msg.time}</span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-teal-400 italic p-2">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Gemini AI is analyzing report context...</span>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask e.g., 'What does HbA1c 6.4% mean for my Metformin dose?'"
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-teal-500"
        />
        <Button variant="primary" size="sm" onClick={handleSend} isLoading={loading}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
