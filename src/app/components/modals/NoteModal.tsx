interface Note {
  id: number;
  title: string;
  description: string;
}

interface Props {
  isOpen: boolean;
  formComponent: React.ReactNode;
  note?: Note;
}

export default function NoteModal({
  isOpen,
  note,
  formComponent,
}: Props): JSX.Element {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-8 rounded-lg shadow-lg z-10 w-1/2">
            <h2 className="text-xl font-bold mb-4">
              {note ? "Editar nota" : "Criar nota"}
            </h2>
            {formComponent}
          </div>
        </div>
      )}
    </>
  );
}
