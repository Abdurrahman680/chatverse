"use client";

import { useState, useEffect } from "react";
import { Plus, MessageSquare, Trash2, LogOut, PanelLeftClose, PanelLeftOpen, Sun, Moon } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { signOut } from "next-auth/react";

interface Chat {
  id: string;
  title: string;
}

export default function Sidebar() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const router = useRouter();
  const params = useParams();
  const chatId = params.chatId as string;

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    const res = await fetch("/api/chats");
    if (res.ok) {
      const data = await res.json();
      setChats(data);
    }
  };

  const createNewChat = async () => {
    const res = await fetch("/api/chats", {
      method: "POST",
      body: JSON.stringify({ title: "New Chat" }),
    });
    if (res.ok) {
      const chat = await res.json();
      setChats([chat, ...chats]);
      router.push(`/dashboard/${chat.id}`);
    }
  };

  const deleteChat = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const res = await fetch(`/api/chats/${id}`, { method: "DELETE" });
    if (res.ok) {
      setChats(chats.filter((c) => c.id !== id));
      if (chatId === id) router.push("/dashboard");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2 className="neon-text">ChatVerse</h2>
          <div className="header-actions">
            <button onClick={toggleTheme} className="icon-btn">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="icon-btn">
              <PanelLeftClose size={20} />
            </button>
          </div>
        </div>

        <button className="new-chat-btn neon-border" onClick={createNewChat}>
          <Plus size={20} />
          <span>New Chat</span>
        </button>

        <div className="chat-history">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${chatId === chat.id ? "active" : ""}`}
              onClick={() => router.push(`/dashboard/${chat.id}`)}
            >
              <MessageSquare size={18} />
              <span className="chat-title">{chat.title}</span>
              <button className="delete-btn" onClick={(e) => deleteChat(chat.id, e)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <button onClick={() => signOut()} className="logout-btn">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="floating-toggle">
          <PanelLeftOpen size={24} />
        </button>
      )}

      <style jsx>{`
        .sidebar {
          width: var(--sidebar-width);
          height: 100vh;
          background: var(--surface-color);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 50;
        }

        .sidebar.closed {
          transform: translateX(-100%);
          position: absolute;
        }

        .sidebar-header {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-actions {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .icon-btn {
          color: var(--text-secondary);
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-btn:hover {
          color: var(--text-primary);
        }

        .new-chat-btn {
          margin: 0 1rem 1rem;
          padding: 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-radius: 8px;
          background: transparent;
          color: var(--accent-lime);
          font-weight: 600;
        }

        .new-chat-btn:hover {
          background: rgba(190, 242, 100, 0.1);
        }

        .chat-history {
          flex: 1;
          overflow-y: auto;
          padding: 0 0.5rem;
        }

        .chat-item {
          padding: 0.75rem 1rem;
          margin-bottom: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-radius: 8px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }

        .chat-item:hover, .chat-item.active {
          background: var(--surface-hover);
          color: var(--text-primary);
        }

        .chat-item.active {
          border-left: 3px solid var(--accent-lime);
        }

        .chat-title {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.9rem;
        }

        .delete-btn {
          opacity: 0;
          color: #ef4444;
          transition: opacity 0.2s;
        }

        .chat-item:hover .delete-btn {
          opacity: 1;
        }

        .sidebar-footer {
          padding: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          color: var(--text-secondary);
          border-radius: 8px;
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .floating-toggle {
          position: fixed;
          top: 1.5rem;
          left: 1.5rem;
          z-index: 40;
          color: var(--text-secondary);
          background: var(--surface-color);
          padding: 0.5rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }
      `}</style>
    </>
  );
}
