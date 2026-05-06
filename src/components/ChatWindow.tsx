"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

export default function ChatWindow({ chatId }: { chatId?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatId) {
      fetchMessages();
    } else {
      setMessages([]);
    }
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const fetchMessages = async () => {
    const res = await fetch(`/api/chats/${chatId}/messages`);
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !chatId || isLoading) return;

    const userContent = input;
    setInput("");
    
    // Optimistic update
    const tempUserMsg: Message = { id: Date.now().toString(), content: userContent, role: "user" };
    setMessages(prev => [...prev, tempUserMsg]);
    
    setIsLoading(true);

    try {
      const res = await fetch(`/api/chats/${chatId}/messages`, {
        method: "POST",
        body: JSON.stringify({ content: userContent }),
      });

      if (res.ok) {
        const aiMsg = await res.json();
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!chatId) {
    return (
      <div className="empty-state">
        <div className="welcome-card neon-border">
          <Bot size={48} className="neon-text" />
          <h1 className="neon-text">Welcome to ChatVerse</h1>
          <p>Select a chat from the sidebar or create a new one to begin your journey into the AI dimension.</p>
        </div>
        <style jsx>{`
          .empty-state {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }
          .welcome-card {
            max-width: 500px;
            padding: 3rem;
            text-align: center;
            background: var(--surface-color);
            border-radius: 16px;
          }
          .welcome-card h1 { margin: 1.5rem 0 1rem; font-size: 2rem; }
          .welcome-card p { color: var(--text-secondary); line-height: 1.6; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="chat-window">
      <div className="messages-container" ref={scrollRef}>
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`message-wrapper ${msg.role}`}
            >
              <div className="avatar">
                {msg.role === "assistant" ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className="message-bubble glass">
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="message-wrapper assistant"
            >
              <div className="avatar">
                <Bot size={20} />
              </div>
              <div className="message-bubble glass typing">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form className="input-area" onSubmit={sendMessage}>
        <div className="input-wrapper glass">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <button type="submit" disabled={!input.trim() || isLoading} className="send-btn">
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </div>
      </form>

      <style jsx>{`
        .chat-window {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: relative;
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .message-wrapper {
          display: flex;
          gap: 1rem;
          max-width: 80%;
        }

        .message-wrapper.user {
          flex-direction: row-reverse;
          align-self: flex-end;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--surface-hover);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          flex-shrink: 0;
          border: 1px solid var(--border-color);
        }

        .assistant .avatar {
          background: rgba(190, 242, 100, 0.1);
          color: var(--accent-lime);
          border-color: var(--accent-lime);
        }

        .message-bubble {
          padding: 1rem;
          border-radius: 12px;
          line-height: 1.5;
          font-size: 0.95rem;
          word-break: break-word;
        }

        .user .message-bubble {
          background: var(--accent-lime);
          color: #000;
          border-bottom-right-radius: 2px;
        }

        .assistant .message-bubble {
          border-bottom-left-radius: 2px;
        }

        .input-area {
          padding: 1.5rem 2rem 2.5rem;
        }

        .input-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 16px;
        }

        textarea {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-primary);
          resize: none;
          padding: 0.5rem 0;
          max-height: 150px;
          font-size: 0.95rem;
        }

        .send-btn {
          padding: 0.75rem;
          border-radius: 12px;
          background: var(--accent-lime);
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: var(--surface-hover);
          color: var(--text-secondary);
        }

        /* Typing Animation */
        .typing {
          display: flex;
          gap: 4px;
          padding: 1rem 1.5rem;
        }
        .dot {
          width: 6px;
          height: 6px;
          background: var(--text-secondary);
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}
