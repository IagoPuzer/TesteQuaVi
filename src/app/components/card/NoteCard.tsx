import { useState } from "react";
import NoteModal from "../modals/NoteModal";
import UpdateNoteForm, { NoteData } from "../forms/UpdateNoteForm";
import { toast } from "sonner";

interface Note {
  id: number;
  title: string;
  description: string;
}

interface Props {
  note: Note;
  onDelete: (noteId: number) => void;
  onUpdate: (updatedNoteData: NoteData) => void;
}

export default function NoteCard({ note, onDelete, onUpdate }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleDeleteClick = () => {
    onDelete(note.id);
    toast.error("Nota excluida");
  };

  const handleUpdateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
        <div className="p-6">
          <div className="flex flex-col">
            <h3 className="mb-4 text-xl font-medium text-slate-700">
              {note.title}
            </h3>
          </div>
          <p className="truncate">{note.description}</p>
          <div className="flex justify-end gap-4 mt-6">
            <button
              className="bg-red-200 p-2 rounded-md text-black"
              onClick={handleDeleteClick}
            >
              Deletar nota
            </button>
            <button
              className="bg-sky-100 p-2 rounded-md text-black"
              onClick={handleUpdateClick}
            >
              Editar nota
            </button>
          </div>
        </div>
      </div>
      <NoteModal
        isOpen={isModalOpen}
        note={note}
        formComponent={
          <UpdateNoteForm
            initialData={note}
            onSubmit={onUpdate}
            onClose={handleCloseModal}
          />
        }
      />
    </>
  );
}
