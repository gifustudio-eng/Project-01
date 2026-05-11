import { useState } from "react";
import './modals.css';
import { useEdit } from "@/hooks/utilities";

export function AcceptedModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center dark:text-zinc-50">
        <h1>Reply Approved!</h1>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export function KeywordModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center dark:text-zinc-50">
        <h1>Keyword Inputted!</h1>
        <p>Please wait while we process your request...</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

type EditModalProps = {
  replyId: string;
  initialText?: string;
  onClose: () => void;
  onSave: (replyId: string, newText: string) => Promise<void>;
};

export function EditModal({
  replyId,
  initialText = "",
  onClose,
  onSave
}: EditModalProps) {

  const [text, setText] = useState(initialText);
  const handleSave = async () => {
    await onSave(replyId, text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-gray-800 dark:text-zinc-50 p-3 rounded-lg shadow-lg text-center w-[500px] h-[300px]">
        <h1 className="text-lg font-semibold">Edit Reply</h1>
        <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-[75%] p-2 border rounded-md mt-2" placeholder="Enter new reply text..."/>
        <div className="flex justify-end gap-3 ">
          <button onClick={onClose} className="px-4 py-2"> Close </button>
          <button onClick={handleSave} className="px-4 py-2"> Save Changes </button>
        </div>
      </div>
    </div>
  );
}