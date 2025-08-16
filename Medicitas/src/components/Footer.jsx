import React from "react";
export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white/80 text-gray-500 text-center py-4 shadow">
      © {new Date().getFullYear()} MediCitas SA.
    </footer>
  );
}
