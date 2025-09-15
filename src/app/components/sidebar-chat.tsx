'use client';

import { useSidebar } from '../context/sidebar-context';

export default function SidebarChat() {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  if (!isSidebarOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={closeSidebar}
    >
      <div
        className="relative h-full w-full md:w-1/2 bg-background shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <button onClick={closeSidebar} className="text-foreground">
            Close
          </button>
          <h2 className="text-lg font-bold mt-4">Chat</h2>
          {/* Add your chat UI here */}
        </div>
      </div>
    </div>
  );
}
