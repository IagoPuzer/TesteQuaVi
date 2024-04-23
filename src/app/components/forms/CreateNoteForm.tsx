"use client";
import { useState } from "react";

interface Props {
  onSubmit: (data: NoteData) => void;
  onClose: () => void;
}

export interface NoteData {
  title: string;
  description: string;
}

export default function CreateNoteForm({
  onSubmit,
  onClose,
}: Props): JSX.Element {
  const [newNoteData, setNewNoteData] = useState<NoteData>({
    title: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewNoteData({ ...newNoteData, [name]: value });
  };

  const createNewNote = () => {
    onSubmit(newNoteData);
    setNewNoteData({ title: "", description: "" });
    onClose();
  };

  return (
    <form className="bg-gray-100 p-4 rounded mb-8">
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="block w-full border border-gray-300 rounded mb-2 p-2 text-black bg-white focus:outline-none"
        value={newNoteData.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        className="text-black block w-full border border-gray-300 rounded mb-2 p-2 bg-white focus:outline-none"
        value={newNoteData.description}
        onChange={handleChange}
      />
      <div className="flex gap-4">
        <button
          onClick={createNewNote}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Criar
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
        >
          Fechar
        </button>
      </div>
    </form>
  );
}
