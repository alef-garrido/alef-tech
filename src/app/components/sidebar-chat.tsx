'use client';

import { useSidebar } from '../context/sidebar-context';

export default function SidebarChat() {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-background shadow-lg transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4">
        <button onClick={closeSidebar} className="text-foreground">
          Close
        </button>
        <h2 className="text-lg font-bold mt-4">Chat</h2>
        {/* Add your chat UI here */}
      </div>
    </div>
  );
}
