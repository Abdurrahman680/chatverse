"use client";

import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>

      <style jsx>{`
        .dashboard-layout {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: var(--bg-color);
        }
        .main-content {
          flex: 1;
          position: relative;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}
