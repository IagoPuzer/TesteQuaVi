"use client";

import { useState, useEffect } from "react";
import NoteCard from "./components/card/NoteCard";
import CreateNoteButton from "./components/buttons/CreateNoteButton";
import CreateNoteModal from "./components/modals/CreateNoteModal";
import CreateNoteForm, { NoteData } from "./components/forms/CreateNoteForm";

interface Note {
  id: number;
  title: string;
  description: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchAllNotes = async () => {
    try {
      const response = await fetch("./api/notes");
      if (response.ok) {
        const data: Note[] = await response.json();
        setNotes(data);
      } else {
        console.error("Failed to fetch notes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const createNewNote = async (newNoteData: NoteData) => {
    try {
      const response = await fetch("./api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNoteData),
      });
      if (response.ok) {
        const newNote = await response.json();
        setNotes([...notes, newNote]);
        setIsModalOpen(false);
      } else {
        console.error("Falha ao criar nova nota");
      }
    } catch (error) {
      console.error("erro ao criar nota:", error);
    }
  };

  const handleDeleteNote = async (noteId: Note["id"]) => {
    try {
      await fetch(`./api/notes/${noteId}`, {
        method: "DELETE",
      });
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleCreateNote = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-100">Notas</h1>
          <div className="flex gap-6">
            <CreateNoteButton onCreate={handleCreateNote} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} />
          ))}
        </div>
      </div>
      <CreateNoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formComponent={
          <CreateNoteForm onSubmit={createNewNote} onClose={handleCloseModal} />
        }
      />
    </div>
  );
}
