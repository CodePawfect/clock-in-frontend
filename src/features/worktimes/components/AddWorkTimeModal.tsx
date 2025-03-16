import {FormEvent} from "react";

interface AddWorkTimeModalProps {
    setOpen: (open: boolean) => void;
    setNewWorkTimeDate: (date: string) => void;
    setNewWorkTimeHours: (hours: number) => void;
    setNewWorkTimeNote: (note: string) => void;
    createWorkTime: () => Promise<void>;
    onWorkTimeAdded: () => Promise<void>;
}

export const AddWorkTimeModal = ({
                                     setOpen,
                                     setNewWorkTimeDate,
                                     setNewWorkTimeHours,
                                     setNewWorkTimeNote,
                                     createWorkTime,
                                     onWorkTimeAdded
                                 }: AddWorkTimeModalProps) => {

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await createWorkTime();
        await onWorkTimeAdded();
        setOpen(false);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
            <div
                className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all border-b border-gray-500"
            >
                <div className="flex justify-between bg-indigo-900 items-center border-b border-gray-500 px-6 py-4">
                    <h2 className="text-xl font-bold text-white">Arbeitszeit hinzufügen</h2>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-4 ">
                    <div className="mb-4">
                        <label
                            htmlFor="datum"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Datum:
                        </label>
                        <input
                            type="date"
                            id="datum"
                            name="Datum"
                            onChange={(e) => setNewWorkTimeDate(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="stunden"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Stunden:
                        </label>
                        <input
                            type="number"
                            id="stunden"
                            name="stunden"
                            onChange={(e) => setNewWorkTimeHours(Number(e.target.value))}
                            required
                            min="0"
                            step="0.5"
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="note"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Notiz:
                        </label>
                        <input
                            type="text"
                            id="note"
                            name="Notiz"
                            onChange={(e) => setNewWorkTimeNote(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-2 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="px-4 py-2 bg-white text-indigo-900 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Abbrechen
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-900 text-white font-medium rounded-md hover:bg-indigo-600"
                        >
                            Speichern
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}