interface Note {
  id: number;
  title: string;
  description: string;
}

interface Props {
  note: Note;
  onDelete: (noteId: number) => void;
}

export default function NoteCard({ note, onDelete }: Props) {
  const handleDeleteClick = () => {
    onDelete(note.id);
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
              Deletar post
            </button>
            <button className="bg-sky-100 p-2 rounded-md text-black">
              Editar post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
