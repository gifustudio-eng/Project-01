import { useState } from "react";
import './modals.css';

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

export function EditModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h1>Edit Reply</h1>
        <textarea className="w-full h-24 p-2 border rounded-md mb-4" placeholder="Enter new reply text..."></textarea>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}