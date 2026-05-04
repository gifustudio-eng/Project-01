import { useState } from "react";
import './modal.css';

export default function AcceptedModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h1>Reply Approved!</h1>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}