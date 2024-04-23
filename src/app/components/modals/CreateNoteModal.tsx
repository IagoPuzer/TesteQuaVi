interface Props {
  isOpen: boolean;
  onClose: () => void;
  formComponent: React.ReactNode;
}

export default function CreateNoteModal({
  isOpen,
  onClose,
  formComponent,
}: Props): JSX.Element {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 opacity-50"></div>
          <div className="bg-white p-8 rounded-lg shadow-lg z-10">
            <div className="flex justify-end">
              <button
                className="text-gray-700 hover:text-gray-900"
                onClick={onClose}
              >
                Fechar
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4">Criar Nova Nota</h2>
            {formComponent}
          </div>
        </div>
      )}
    </>
  );
}
