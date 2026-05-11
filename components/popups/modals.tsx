import { useState } from "react";
import './modals.css';
import { useEdit } from "@/hooks/utilities";

export function AcceptedModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h1>Reply Approved!</h1>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

type EditModalProps = {
  replyId: string;
  initialText?: string;
  onClose: () => void;
};

export function EditModal({
  replyId,
  initialText = "",
  onClose,
}: EditModalProps) {

  const [text, setText] = useState(initialText);

  const { updateText } = useEdit();

  const handleSave = async () => {
    await updateText(replyId, text);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center w-[500px] h-[300px]">

        <h1 className="text-lg font-semibold">Edit Reply</h1>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[75%] p-2 border rounded-md mt-2"
          placeholder="Enter new reply text..."
        />

        <div className="flex justify-end gap-3 mt-4">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300"
          >
            Close
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-500 text-white"
          >
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}